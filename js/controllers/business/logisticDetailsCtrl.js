/**
 * Created by Administrator on 2018/3/6.
 */
angular.module('controllers',[]).controller('logisticDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','QueryOrderCopRelationById','GetOrderAddressDetail','Global','GetLogisticsInfoByLogisticsNo',
        function ($scope,$rootScope,$stateParams,$state,QueryOrderCopRelationById,GetOrderAddressDetail,Global,GetLogisticsInfoByLogisticsNo) {
            $rootScope.title = "物流详情";
            $scope.param = {
                orderDetailInfo : {},
            }
            QueryOrderCopRelationById.save({
                "orderId":$stateParams.orderId
            },function (data) {
                if(data.result == "0x00001"){
                    $scope.waybillNumber = data.responseData[0].waybillNumber;
                    GetLogisticsInfoByLogisticsNo.get({
                        logisticsNo : $scope.waybillNumber,
                    },function (data) {
                            if(null != data.responseData){
                                $scope.logisticsInfo = JSON.parse(data.responseData)
                            }
                        else{
                            alert("获取信息失败")
                        }
                    })
                }else {
                    alert(data.result)
                }
            });
            GetOrderAddressDetail.get({orderId:$stateParams.orderId},function(data){
                if(data.result==Global.SUCCESS)
                {
                    $scope.param.orderDetailInfo = data.responseData;
                }
            });
        }])