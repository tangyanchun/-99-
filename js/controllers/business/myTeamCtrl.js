/**
 * Created by Administrator on 2018/3/5.
 */
angular.module('controllers',[]).controller('myTeamCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserNextLevelStruct','Global','GetUserInfo','$ionicPopup',
        function ($scope,$rootScope,$stateParams,$state,GetUserNextLevelStruct,Global,GetUserInfo,$ionicPopup) {

            $rootScope.title = "我的团队";

            $scope.param = {
                userName : "",
                LowerGrade:"",
                userNextLevelStruct :[]
            };

            GetUserInfo.get(function(data){
                console.log(data);
                if(data.responseData.userType.indexOf("B-1")>-1)
                {
                    $scope.param.userName = "9小主";
                }
                else if(data.responseData.userType.indexOf("A-1")>-1)
                {
                    $scope.param.userName = "大当家";
                }
                else
                {
                    $scope.param.userName = "普通会员";
                    var alertPopup = $ionicPopup.alert({
                        template: '<span style="font-size: 0.3rem;color: #333333;"> 您还不是店主，无法获得家人的消费返利，立做美享店主，可坐拥75%返利</span>',
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
            });

            GetUserNextLevelStruct.get(function(data){
                if(data.result==Global.SUCCESS){
                    $scope.param.userNextLevelStruct = data.responseData;
                    console.log($scope.param.userNextLevelStruct);
                 }
            })

        }])