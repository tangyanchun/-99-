/**
 * Created by Administrator on 2018/3/5.
 */
angular.module('controllers',[]).controller('trainingHomeCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "MX99微课堂";

            $scope.free = function(){
                $state.go("experience");
            }

            $scope.learn = function(){
                $state.go("trainingProductList");
            }

        }])
