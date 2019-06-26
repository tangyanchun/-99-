angular.module('controllers',[]).controller('shareHomeCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserInfoByOpenId','Global','$ionicPopup','IsLogin',
        function ($scope,$rootScope,$stateParams,$state,GetUserInfoByOpenId,Global,$ionicPopup,IsLogin) {

            $rootScope.title = "分享赚钱";

            $scope.goSharePage = function()
            {
                GetUserInfoByOpenId.get(function(data){
                    if(data.result==Global.SUCCESS)
                    {
                        if(data.responseData.userType=="business-A-1"||data.responseData.userType=="business-B-1"
                            ||data.responseData.userType=="business-C-1"){
                            $state.go("sharePage",{reload:true,userPhone:data.responseData.mobile});
                        }else
                        {
                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;"> 立做美享店主，坐拥75%返利</span>',
                                buttons: [
                                    {
                                        text: '不用啦'
                                    },
                                    {
                                        onTap: function() {
                                            $state.go("shopHome")
                                        },
                                        text: '成为店主',
                                        type: 'button-calm'
                                    }
                                ]

                            });
                        }
                    }
                    else{
                        var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;">立做美享店主，坐拥75%返利</span>',
                            buttons: [
                                {
                                    text: '不用啦'
                                },
                                {
                                    onTap: function() {
                                        $state.go("shopHome")
                                    },
                                    text: '成为店主',
                                    type: 'button-calm'
                                }
                            ]

                        });

                    }
                })
            }
}])