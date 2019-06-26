/**
 * Created by Administrator on 2018/3/5.
 */
angular.module('controllers',[]).controller('drawDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $scope.param = {
                status:$stateParams.status,
                withDrawAmount:$stateParams.withDrawAmount
            }

        }])