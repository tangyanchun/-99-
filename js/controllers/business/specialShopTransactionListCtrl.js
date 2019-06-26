angular.module('controllers',[]).controller('specialShopTransactionListCtrl',
    ['$scope','$rootScope','$stateParams','$state','FindShopKeeperOrderS','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,FindShopKeeperOrderS,BusinessUtil) {

            $rootScope.title = "交易列表"

            $scope.param = {
                transactionList:{},
                pageNo:1,
                pageSize:5
            }

            $scope.$on('$ionicView.enter', function(){
                FindShopKeeperOrderS.save({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize},function(data){
                    BusinessUtil.checkResponseData(data,"transactionList");
                    $scope.param.transactionList = data.responseData;
                })
            });

            $scope.getMoreTransactionList = function(){
                $scope.param.pageSize = $scope.param.pageSize + 5;
                FindShopKeeperOrderS.save({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize},function(data){
                    BusinessUtil.checkResponseData(data,"transactionList");
                    $scope.param.transactionList = data.responseData;
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }

        }])