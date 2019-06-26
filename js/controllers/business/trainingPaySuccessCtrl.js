/**
 * Created by Administrator on 2019/6/20.
 */
angular.module('controllers',[]).controller('trainingPaySuccessCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {
         /* 点击  去邀请*/
          $scope.goShare=function () {
             $state.go("inviteClass")
          }
        }]);