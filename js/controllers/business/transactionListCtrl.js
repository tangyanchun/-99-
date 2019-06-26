angular.module('controllers',[]).controller('transactionListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetTransactionList','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,GetTransactionList,BusinessUtil) {

            $rootScope.title = "交易列表";

            $scope.param = {
                transactionList:{},
                pageNo:0,
                pageSize:5
            };

            $scope.$on('$ionicView.enter', function(){
                GetTransactionList.save({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize},function(data){
                    BusinessUtil.checkResponseData(data,"transactionList");
                    $scope.param.transactionList = data.responseData;

                })
            });

            $scope.getMoreTransactionList = function(){
                $scope.param.pageSize = $scope.param.pageSize + 5;
                GetTransactionList.save({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize},function(data){
                    BusinessUtil.checkResponseData(data,"transactionList");
                    $scope.param.transactionList = data.responseData;
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }

        }])