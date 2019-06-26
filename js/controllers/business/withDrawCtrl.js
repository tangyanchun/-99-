angular.module('controllers',[]).controller('withDrawCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserAccountInfo','Global','BusinessUtil','GetUserInfo',
        'WithDrawMoneyFromAccount','$ionicPopup','$interval','GetUserValidateCode','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetUserAccountInfo,Global,BusinessUtil,GetUserInfo,
                  WithDrawMoneyFromAccount,$ionicPopup,$interval,GetUserValidateCode,$ionicLoading) {

            $rootScope.title = "提现";

            $scope.$on('$ionicView.enter', function(){
                $scope.param = {
                    accountInfo:{},
                    withDrawAmount:"",
                    userName:"",
                    userIdentifyNumber:"",
                    withDrawSwitch:"off",
                    validateCode:"",
                    validateCodeButtonStatus:true
                }

                GetUserAccountInfo.get(function(data){
                    BusinessUtil.checkResponseData(data,'withDraw');
                    $scope.param.accountInfo = data.responseData;
                    if($scope.param.accountInfo.identifyNumber!=undefined)
                    {
                        $scope.param.userIdentifyNumber = $scope.param.accountInfo.identifyNumber;
                    }
                })

                GetUserInfo.get(function (data) {
                    console.log(data);
                    $scope.param.userIdentifyNumber = data.responseData.identifyNumber;
                })
            });

            $scope.withDrawAll = function(){
                $scope.param.withDrawAmount = ($scope.param.accountInfo.balance - $scope.param.accountInfo.balanceDeny).toFixed(0)-1;
            }

            $scope.getValidateCode = function(){

                var phone = $scope.param.userPhone;
                if(!angular.isUndefined(phone)){

                    $scope.param.validateCodeButtonStatus = false;
                    $scope.param.timeCount = 60;
                    //每隔一秒执行
                    var timer= $interval(function(){
                        $scope.param.timeCount--;
                        if($scope.param.timeCount<0){
                            $interval.cancel(timer);
                            $scope.param.validateCodeButtonStatus = true;
                        }
                    },1000);

                    GetUserValidateCode.get({mobile:phone},function(data){
                        if(data.result == Global.FAILURE)
                        {
                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">验证码获取失败</span>',
                                okText:'确定'
                            });
                        }
                    })
                }else{
                    alert("手机号不能为空");
                }

            }

            $scope.confirmWithDraw = function(){

            /*userPhone validateCode*/
                if($scope.param.userPhone == ""){
                    alert("请输入手机号")
                    return
                }
                if($scope.param.validateCode == ""){
                    alert("请输入手机验证码")
                    return
                 }

                if($scope.param.withDrawSwitch=='off')
                {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    $scope.param.withDrawSwitch='on';
                    if($scope.param.userIdentifyNumber!='')
                    {
                        if($scope.param.withDrawAmount<=0)
                        {
                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">提现金额不能小于或者为0</span>',
                                okText:'确定'
                            })
                            $ionicLoading.hide();
                            $scope.param.withDrawSwitch='off';
                        }
                        else if($scope.param.withDrawAmount>$scope.param.accountInfo.balance - $scope.param.accountInfo.balanceDeny)
                        {
                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">提现金额不能大于最大提现额度</span>',
                                okText:'确定'
                            });
                            $ionicLoading.hide();
                            $scope.param.withDrawSwitch='off';
                        }
                        else if($scope.param.userIdentifyNumber==""
                            ||$scope.param.userName==""||$scope.param.bankAddress==""||$scope.param.bankCardNumber=="")
                        {
                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem;padding: 0px">请完整的输入用户姓名、身份证、手机号、验证码</span>',
                                okText:'确定'
                            });
                            $ionicLoading.hide();
                            $scope.param.withDrawSwitch='off';
                        }
                        else
                        {
                            WithDrawMoneyFromAccount.save({moneyAmount:$scope.param.withDrawAmount,
                                identifyNumber:$scope.param.userIdentifyNumber,
                                mobile:$scope.param.userPhone,
                                userName:$scope.param.userName,
                                validCode:$scope.param.validateCode},function(data){
                                BusinessUtil.checkResponseData(data,'withDraw');
                                if(data.result==Global.SUCCESS)
                                {
                                    $ionicLoading.hide();
                                    if(data.errorInfo=="CHECK_WITHDRAW_AMOUNT")
                                    {
                                        $state.go("drawDetails",{"status":"check","withDrawAmount":$scope.param.withDrawAmount});
                                    }
                                    else
                                    {
                                        $state.go("drawDetails",{"status":"noCheck","withDrawAmount":$scope.param.withDrawAmount});
                                    }
                                }
                                else
                                {
                                    $ionicLoading.hide();
                                    $scope.param.withDrawSwitch='off';
                                    alert(data.errorInfo);
                                }
                            })
                        }
                    }
                }
            }
        }])