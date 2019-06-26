/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('aboutMineCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $scope.goProtocol=function () {
                $state.go("protocol")
            }
        }])