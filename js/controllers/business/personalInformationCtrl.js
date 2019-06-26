angular.module('controllers',[]).controller('personalInformationCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserInfo','UserLoginOut','Global','BusinessUtil','$ionicLoading','$ionicPopup',
        function ($scope,$rootScope,$stateParams,$state,GetUserInfo,UserLoginOut,Global,BusinessUtil,$ionicLoading,$ionicPopup) {
            $rootScope.title = "个人设置";
            $scope.param={
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
                    $ionicLoading.hide();
                    BusinessUtil.checkResponseData(data,'myselfCenter');
                    $scope.param.userInfo = data.responseData;
                })
            });

            // 退出登录
            $scope.exit=function () {
                $ionicPopup.confirm({
                    template:"<div style='text-align:center;font-size: 0.3rem;color: #333333;'>确定要退出当前账号？</div>",
                    buttons: [
                        { text: "<div class='myPopup'>取消</div>",
                            onTap:function(e){
                                return
                            }
                        },
                        {text: '<div class="myPopup" style="background: #FF6666!important;color: #ffffff!important;">确定</div>',
                            onTap:function(e){
                                UserLoginOut.get(function(data){
                                    if(data.result==Global.SUCCESS)
                                    {
                                        var alertPopup = $ionicPopup.alert({
                                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">退出登录成功</span>',
                                            okText:'确定'
                                        });
                                        $state.go("myselfCenter");
                                    }else{
                                        var alertPopup = $ionicPopup.alert({
                                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">退出登录失败</span>',
                                            okText:'确定'
                                        });
                                    }
                                })
                            }
                        }]
                });
            }
}]);