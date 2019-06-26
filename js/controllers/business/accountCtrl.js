angular.module('controllers',[]).controller('accountCtrl',
    ['$scope','$rootScope','$stateParams','$state','BusinessUtil','GetUserAccountInfo',
        function ($scope,$rootScope,$stateParams,$state,BusinessUtil,GetUserAccountInfo) {

        $rootScope.title = "个人资产";

        $scope.param = {
            accountInfo:{},
            presented : 0.00
        }

        $scope.$on('$ionicView.enter', function(){
            GetUserAccountInfo.get(function(data){
                BusinessUtil.checkResponseData(data,"account");
                $scope.param.accountInfo = data.responseData;
                $scope.param.presented=($scope.param.accountInfo.balance-$scope.param.accountInfo.balanceDeny).toFixed(2);
            })
        })

        $scope.goTransactionList = function(){
            $state.go("transactionList");
        }

}])