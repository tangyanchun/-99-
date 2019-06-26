angular.module('controllers',[]).controller('myselfCenterCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserAccountInfo','Global','$ionicLoading','GetSpecialBossCondition','GetUserIsBoss','GetUserInfoByOpenId',
        function ($scope,$rootScope,$stateParams,$state,GetUserAccountInfo,Global,$ionicLoading,GetSpecialBossCondition,GetUserIsBoss,GetUserInfoByOpenId) {
            $rootScope.title = "个人中心";

            $scope.param = {
                userLogin : false,
                accountInfo:{},
                specialShopOwner : false,
                specialShopInfo : {},
                isShopKeeper : ''
            };

            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                GetUserAccountInfo.get(function(data){
                    $ionicLoading.hide();
                    if(data.result==Global.FAILURE)
                    {
                        $scope.param.userLogin = false;
                        $(".smallBox").hide()
                    }
                    else if(data.result==Global.SUCCESS)
                    {
                        $scope.param.userLogin = true;
                        $scope.param.accountInfo = data.responseData;
                        $scope.param.accountInfo.balance  = returnFloat($scope.param.accountInfo.balance);
                        $scope.param.accountInfo.todayIncome = returnFloat($scope.param.accountInfo.todayIncome);
                        $(".smallBox").show();
                        console.log($scope.param.accountInfo);
                    }
                })

               GetUserIsBoss.get(function(data){

                    if(data.result == Global.SUCCESS){
                        if(data.responseData > 0){
                             $scope.param.isShopKeeper = true;
                        }else{
                             $scope.param.isShopKeeper = false;
                        }
                    }

                  })

                GetSpecialBossCondition.get(function(data){
                    if(data.result==Global.SUCCESS)
                    {
                        $scope.param.specialShopInfo = data.responseData;
                        $scope.param.specialShopOwner = true;
                    }
                    else
                    {
                        $scope.param.specialShopOwner = false;
                    }
                })

            });

            $scope.mySpecialShopDetail = function(){
                $state.go("specialShopTransactionList",{"specialShopId":$scope.param.specialShopInfo.shopId})
            }

            $scope.goMyselfSetting = function(){
              $state.go("personalInformation")
            }

            $scope.goSuggestion = function(){
                $state.go("suggestion")
            };

            $scope.goAboutUs = function(){
                $state.go("aboutMine")
            };
            $scope.goOrderManagement = function(type){
                $state.go("orderManagement",{"type":type});
            };

            $scope.myselfLogin = function(){
                $state.go("login",{redirectUrl:"myselfCenter"})
            };

            $scope.goRechargeAccount = function(){
                $state.go("recharge");
            }

            $scope.goSelfAccount = function () {
                $state.go("account");
            };
            $scope.goShare = function () {
                $state.go("shareHome");
            };
            $scope.goBeans = function () {
                $state.go("beans");
            };

            $scope.goTeam = function () {
                if($scope.param.userLogin){
                    $state.go("myTeam");
                }else{
                    $state.go("login",{redirectUrl:"myTeam"})
                }
            };

            /*点击售后电话跳转到一个新的页面*/
            $scope.goAfterSale=function () {
                $state.go("afterSale")
            };
            $scope.bool=false;
            $scope.checkOpen=function ($event) {
                $scope.bool=!$scope.bool;
                if($scope.bool){
                    $(".open").attr("src","images/myselfCenter/close.png");
                    $(".money").html("****")
                }else{
                    $(".open").attr("src","images/myselfCenter/open.png");
                    $(".money").html($scope.param.accountInfo.balance);
                }
                $event.stopPropagation();
            };

            function returnFloat(value){
                var value=Math.round(parseFloat(value)*100)/100;
                var xsd=value.toString().split(".");
                if(xsd.length==1){
                    value=value.toString();
                    return value;
                }
                if(xsd.length>1){
                    if(xsd[1].length<2){
                        value=value.toString();
                    }
                    return value;
                }
            }
        }])