/**
 * Created by Administrator on 2018/9/5.
 */
angular.module('controllers',[]).controller('specialMineCtrl',
    ['$scope','$rootScope','$stateParams','$state','SpecialBusinessOrderNum','Global','$ionicLoading','GetSpecialBossCondition','GetUserIsBoss','GetUserInfo',
        function ($scope,$rootScope,$stateParams,$state,SpecialBusinessOrderNum,Global,$ionicLoading,GetSpecialBossCondition,GetUserIsBoss,GetUserInfo) {
            $rootScope.title = "个人中心";

            $scope.d=0;
            $scope.y=0;
            $scope.dp=0;
            $scope.param = {
                userLogin : false,
                accountInfo:[],
                specialShopOwner : false,
                specialShopInfo : {},
                isShopKeeper : '',
                userInfo:{}
            };

            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetUserInfo.get(function (data) {
                    $scope.param.userInfo=data.responseData;
                    console.log(data)
                });
                SpecialBusinessOrderNum.get(function(data){
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
                        $scope.dp = $scope.param.accountInfo[0];
                        $scope.d =  $scope.param.accountInfo[1];
                        $scope.y =  $scope.param.accountInfo[2];
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
                $state.go("specialInformation")
            }

            $scope.goOrderManagement = function(type){
                $state.go("specialManagement",{"type":type});
            };

            $scope.myselfLogin = function(){
                $state.go("login",{redirectUrl:"specialMine"})

            };

            /*点击售后电话跳转到一个新的页面*/
            $scope.goAfterSale=function () {
                $state.go("afterSale")
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