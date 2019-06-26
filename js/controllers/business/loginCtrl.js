angular.module('controllers',[]).controller('loginCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserValidateCode','$interval','Global','UserLogin','$ionicPopup','LoginGlobal','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,GetUserValidateCode,$interval,Global,UserLogin,$ionicPopup,LoginGlobal,BusinessUtil) {

            $rootScope.title = "美享登录";

            //手机号码格式验证
            //var phoneReg=/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|5|6|7|8|9]|147|177)\d{8}$/;

            $scope.param = {
                userPhone:'',
                validateCode:'',
                validateCodeButtonStatus:true,
                timeCount: 60,
                buttondis : false
            }

            $scope.getValidateCode = function(){
                var phone = $scope.param.userPhone;
                if(phone !=""){
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
                    alert("手机号不能为空！");
                }
          }

            $scope.userLogin = function(){
                var phone = $scope.param.userPhone;
                if(phone !=""){
                     BusinessUtil.buriedPoint(LoginGlobal.MX_DL_SCDL);
                    if($scope.param.validateCode=='')
                    {
                        var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">请输入验证码</span>',
                            okText:'确定'
                        });
                    }
                    else
                    {
                        UserLogin.save({userPhone:$scope.param.userPhone,code:$scope.param.validateCode},function(data){
                            if(data.result==Global.FAILURE)
                            {
                                alert(data.errorInfo);
                            }
                            else
                            {
                                window.localStorage.removeItem("logintoken");
                                window.localStorage.setItem("logintoken",data.responseData);

                                sessionStorage.removeItem("logintoken");
                                sessionStorage.setItem("logintoken", data.responseData);

                                BusinessUtil.delCookie("logintoken");
                                BusinessUtil.setCookie("logintoken", data.responseData);

                                if($stateParams.redirectUrl=='')
                                {
                                    window.location.href = "";
                                }
                                else
                                {
                                    if($stateParams.redirectUrl.indexOf("businessOrderPay")==0){
                                        $state.go("buyCart");
                                    } else if($stateParams.redirectUrl.indexOf("classPay")==0){
                                        window.location.href = "orderPay.do?productType=class";
                                    }
                                    else
                                    {
                                        window.location.href = "#/" + $stateParams.redirectUrl.replace("&","/");
                                    }
                                }
                            }
                        })
                    }
                }else{
                    alert("手机号不能为空");
                }

            }

        }])