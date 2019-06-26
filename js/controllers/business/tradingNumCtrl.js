angular.module('controllers',[]).controller('tradingNumCtrl',
    ['$scope','$interval','$http','$rootScope','$stateParams','$state','Global',
        function ($scope,$interval,$http,$rootScope,$stateParams,$state,Globall) {
            $scope.param = {
                tradingNum:''
            }
            $scope.clearSearch = function(){
                $scope.param.tradingNum = ''
            }
            $scope.search = function(){
                console.log($scope.param.tradingNum)
                if ($scope.param.tradingNum!=''){

                    $state.go('afterSales',{tradingNum:$scope.param.tradingNum})
                }
            }
  }])