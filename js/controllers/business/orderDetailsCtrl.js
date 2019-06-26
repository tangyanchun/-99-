/**
 * Created by Administrator on 2018/3/2.
 */
angular.module('controllers',[]).controller('orderDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','Global','GetOrderAddressDetail','GetOrderDetailInfo','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,Global,GetOrderAddressDetail,GetOrderDetailInfo,$ionicLoading,$timeout) {

            $rootScope.title = "订单详情";

            $scope.param = {
                orderId : $stateParams.orderId,
                orderAddressDetail : {},
                orderDetailInfo : {},
                orderProductInfo:{}

            }
            //根据orderId，获取此订单的收货地址
            GetOrderAddressDetail.get({orderId:$scope.param.orderId},function(data){
                if(data.result==Global.SUCCESS)
                {
                    $scope.param.orderAddressDetail = data.responseData;
                    console.log(data.responseData)
                }
            });
            $scope.goOffline=function () {
                $state.go("offlineProductDetail",{productId:$scope.param.orderDetailInfo.businessProductId})

            };
            //根据orderId，获取此订单的详情信息
            GetOrderDetailInfo.get({orderId:$scope.param.orderId},function(data){
                if(data.result==Global.SUCCESS)
                {
                    $scope.param.orderDetailInfo = data.responseData;
                    console.log($scope.param.orderDetailInfo);
                    console.log(data.responseData.businessProductId)
                }
            });
            /*复制交易流水号*/
            var clipboard = new ClipboardJS('.btn', {
                text: function() {
                    return document.querySelector('.pCopy').innerText;
                }
            });
            clipboard.on('success', function(e) {
                showToast("复制成功");
                hideToast();
                console.log(e);
                console.log(document.getElementsByClassName('pCopy')[0])
            });
            clipboard.on('error', function(e) {
                console.log(e);
            });

            var showToast = function (content) {
                $ionicLoading.show({
                    template: content
                });
            };

            var hideToast = function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            };


        }])
