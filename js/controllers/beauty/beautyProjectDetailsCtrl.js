/**
 * Created by Administrator on 2018/7/18.
 */
angular.module('controllers',[]).controller('beautyProjectDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','ProjectInfo','$ionicSlideBoxDelegate','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,ProjectInfo,$ionicSlideBoxDelegate,$ionicLoading) {

            $rootScope.title = "项目详情";
            $scope.param={
                imageList:[]
            };
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            ProjectInfo.get({id:$stateParams.projectId},function (data) {
                $ionicLoading.hide();
                $scope.projectInfo=data.responseData;
                $scope.param.imageList=data.responseData.imageList;
                $ionicSlideBoxDelegate.update();
                $ionicSlideBoxDelegate.loop(true);
                console.log($scope.projectInfo.status);
                if($scope.projectInfo.cardType=='0'){
                    $scope.projectInfo.cardType="次卡"
                }
                if($scope.projectInfo.cardType=='1'){
                    $scope.projectInfo.cardType="月卡"
                }
                if($scope.projectInfo.cardType=='2'){
                    $scope.projectInfo.cardType="季卡"
                }
                if($scope.projectInfo.cardType=='3'){
                    $scope.projectInfo.cardType="半年卡"
                }
                if($scope.projectInfo.cardType=='4'){
                    $scope.projectInfo.cardType="年卡"
                }

                console.log(data)
            })
            });
        }]);