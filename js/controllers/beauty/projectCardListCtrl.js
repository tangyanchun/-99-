/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('projectCardListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserRechargeCardList','GetUserCourseProjectList','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetUserRechargeCardList,GetUserCourseProjectList,Global,$ionicLoading) {
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param = {
                    projectCardList: [],
                    expenseCardDetailData: 'true'
                };

                GetUserCourseProjectList.get({
                    sysUserId: $rootScope.shopAppointInfo.shopUserInfo.id,
                    cardStyle: '1'
                }, function (data) {
                    $ionicLoading.hide();
                    if (data.result == Global.SUCCESS) {
                        if (data.responseData != null) {
                            $scope.param.projectCardList = data.responseData;
                        }
                        else {
                            $scope.param.expenseCardDetailData = "false";
                        }
                    }
                });
            })
                $scope.chooseProjectCard = function (projectId) {
                    $state.go("projectCardDetail", {projectId: projectId})
                }


}]);