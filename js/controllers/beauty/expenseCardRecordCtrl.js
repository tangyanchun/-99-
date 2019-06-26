/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('expenseCardRecordCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetProjectConsumes','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetProjectConsumes,Global,$ionicLoading) {
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param = {
                    pageSize: 5000,
                    projectConsumes: [],
                    expenseCardDetailData: 'true'
                };

                GetProjectConsumes.save({
                    consumeType: '1', goodsType: '5',
                    pageSize: $scope.param.pageSize, sysUserId: $rootScope.shopAppointInfo.shopUserInfo.id
                }, function (data) {
                    $ionicLoading.hide();
                    if (data.result == Global.SUCCESS) {
                        if (data.responseData != null) {
                            $scope.param.projectConsumes = data.responseData;
                        }
                        else {
                            $scope.param.expenseCardDetailData = "false";
                        }
                    }
                })
            })

}]);