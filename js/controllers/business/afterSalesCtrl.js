angular.module('controllers',[]).controller('afterSalesCtrl',
    ['$scope','$rootScope','$stateParams','$state','BusinessUtil','Global','OrderRefundApply','RefundOrderDetail',
        function ($scope,$rootScope,$stateParams,$state,BusinessUtil,Global,OrderRefundApply,RefundOrderDetail) {
            $scope.param ={
                status:1,
                desc:'',
                orderDetailInfo:'',
                transactionId:$stateParams.transactionId
            };
            //根据orderId，获取此订单的详情信息
            RefundOrderDetail.get({transactionId:$scope.param.transactionId},function(data){
                if(data.result==Global.SUCCESS) {
                    $scope.param.orderDetailInfo = data.responseData;
                    $scope.businessProductFirstUrl = data.responseData[0].businessProductFirstUrl;
                }
            });
            $scope.submit = function () {
                OrderRefundApply.get({
                    status:$scope.param.status,
                    desc:$scope.param.desc,
                    transactionId:$scope.param.transactionId+""

            },function(date){
                    if(date.result == '0x00001'){
                        $state.go('afterSalesHint')
                    }else {
                        alert("订单异常，请联系客服")
                    }
                })
            }
            $scope.sel = function(status){
                $scope.param.status =status
            }

        }])
