angular.module('controllers',[]).controller('specialTransactionDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserTransactionDetail','GetUserAccountInfo','BusinessUtil','FindOrderByTransactionId',
        function ($scope,$rootScope,$stateParams,$state,GetUserTransactionDetail,GetUserAccountInfo,BusinessUtil,FindOrderByTransactionId) {

            $rootScope.title = "交易明细";

            $scope.param = {
                orderId:$stateParams.orderId,
                transactionDetailData:{},
                accountInfo:{}
            }


            $scope.$on('$ionicView.enter', function(){
                FindOrderByTransactionId.get({orderId:$scope.param.orderId},function(data){

                    BusinessUtil.checkResponseData(data,"transactionDetail&"+$stateParams.orderId);
                    $scope.param.transactionDetailData = data.responseData;


                })
            });
}])