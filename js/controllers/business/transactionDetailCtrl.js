angular.module('controllers',[]).controller('transactionDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserTransactionDetail','GetUserAccountInfo','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,GetUserTransactionDetail,GetUserAccountInfo,BusinessUtil) {

            $rootScope.title = "交易明细";

            $scope.param = {
                transactionType:$stateParams.type,
                transactionId:$stateParams.transactionId,
                transactionDetailData:{},
                accountInfo:{}
            }

            $scope.$on('$ionicView.enter', function(){
                GetUserTransactionDetail.get({"transactionId":$scope.param.transactionId,"transactionType":$scope.param.transactionType},function(data){
                    BusinessUtil.checkResponseData(data,"transactionDetail&"+$stateParams.transactionId+","+$stateParams.type);
                    $scope.param.transactionDetailData = data.responseData;
                    GetUserAccountInfo.get(function(data){
                        $scope.param.accountInfo = data.responseData;
                    })
                })
            });
}])