angular.module('controllers',[]).controller('rechargeAccountRecordListCtrl',
    ['$scope','$rootScope','$stateParams','$state','FindRechargeAccountRecordList','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,FindRechargeAccountRecordList,BusinessUtil) {

            $rootScope.title = "储值账户收支明细列表"

            $scope.param = {
                rechargeAccountRecordList:[],
                pageNo:1,
                pageSize:10
            }

            $scope.requestData={
                rechargeAccountId:''
            }
            $scope.requestData.rechargeAccountId = $stateParams.rechargeAccountId

            $scope.$on('$ionicView.enter', function(){
                FindRechargeAccountRecordList.save({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize,requestData:$scope.requestData},function(data){
                    BusinessUtil.checkResponseData(data,"rechargeAccountRecordList");
                    $scope.param.rechargeAccountRecordList = data.responseData.responseData;

                })
            });

            $scope.getMoreRechargeAccountRecordList = function(){
                $scope.param.pageSize = $scope.param.pageSize + 10;
                FindRechargeAccountRecordList.save({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize,requestData:$scope.requestData},function(data){
                    BusinessUtil.checkResponseData(data,"rechargeAccountRecordList");
                    $scope.param.rechargeAccountRecordList = data.responseData.responseData;
                    $scope.$broadcast('scroll.refreshComplete');
                })
            }

        }])