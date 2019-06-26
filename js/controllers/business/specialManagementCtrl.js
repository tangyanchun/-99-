/**
 * Created by Administrator on 2018/9/5.
 */
angular.module('controllers',[]).controller('specialManagementCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBorderSpecialOrderListByStauts','BusinessUtil','PutNeedPayOrderListToRedis','Global','DeleteOrderFromBuyCart','UpdateBusinessOrderStatus','$ionicPopup','$ionicLoading','$timeout','GetUserInfoByOpenId',
        function ($scope,$rootScope,$stateParams,$state,GetBorderSpecialOrderListByStauts,BusinessUtil,PutNeedPayOrderListToRedis,Global,DeleteOrderFromBuyCart,UpdateBusinessOrderStatus,$ionicPopup,$ionicLoading,$timeout,GetUserInfoByOpenId) {
            $scope.param = {
                orderList:[],
                orderType:$stateParams.type
            };
            $scope.chooseTab = function(type){
                $scope.param.orderList=[];
                $scope.param.orderType = type;
                GetBorderSpecialOrderListByStauts.get({orderStatus:$scope.param.orderType},function(data){
                    console.log(data)
                    $ionicLoading.hide();
                    BusinessUtil.checkResponseData(data,"orderManagement&"+$scope.param.orderType);
                    $scope.param.orderList = data.responseData;
                    console.log($scope.param.orderList.astrict);
                    if(($scope.param.orderType=='1'&&$scope.param.orderList=="")||($scope.param.orderType=='0'&&$scope.param.orderList=="")||($scope.param.orderType=='4'&&$scope.param.orderList=="")||($scope.param.orderType=='all'&&$scope.param.orderList=="")||($scope.param.orderType=='2'&&$scope.param.orderList==""))
                    {
                        $(".pedingDelivery").show()
                    }else
                    {

                        $(".pedingDelivery").hide()
                    }
                })
            }

            $rootScope.title = "订单管理";

            $scope.goPay = function(item){
                if(item.astrict=='2'){
                    showToask("很抱歉，该商品最多购买1次");
                    hideToask();
                    return;
                }
                if(item.astrict=='3'){
                    showToask("很抱歉，该商品最多购买1件");
                    hideToask();
                    return;
                }
                var needPayOrderList = [];
                var payOrder = {
                    orderId:item.businessOrderId,
                    productFirstUrl:item.businessProductFirstUrl,
                    productId:item.businessProductId,
                    productName:item.businessProductName,
                    productNum:item.businessProductNum,
                    productPrice:item.type == "seckill"?item.payAmount:item.businessProductPrice,
                    productSpec:item.productSpec,
                    productPrefecture:item.productPrefecture,
                    productStatus:item.productStatus
                };
                needPayOrderList.push(payOrder);
                //将needPayOrderList数据放入后台list中
                PutNeedPayOrderListToRedis.save({needPayOrderList:needPayOrderList},function(data){
                    if(data.result==Global.SUCCESS)
                    {
                        if(item.type=="offline")
                        {
                            window.location.href = "orderPay.do?productType=offline&random="+Math.random();
                        }
                        else if(item.type=="special")
                        {
                            window.location.href = "orderPay.do?productType=special&random="+Math.random();
                        }
                        else if(item.type=="training")
                        {
                            window.location.href = "orderPay.do?productType=training&random="+Math.random();
                        }else if(item.type=="seckill")
                        {
                            window.location.href = "orderPay.do?productType=seckill&random="+Math.random();
                        }

                    }else if(data.result==Global.FAILURE){
                        if(data.errorInfo=="failure"){
                            alert("亲！此商品为新用户专享产品");
                        }else{
                            alert(data.errorInfo);
                        }
                    }
                })
            };

            $scope.buyAgain = function(item){
                $state.go("offlineProductDetail",{productId:item.businessProductId})
            }

            $scope.reminding=function(){
                var alertPopup = $ionicPopup.alert({
                    template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.2rem">货品正在处理，请耐心等待哦~</span>',
                    okText:'确定'
                });
            }

            $scope.deleteOrder = function(item){
                var alertPopup = $ionicPopup.show({
                    template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">确定要删除订单了吗？</span>',
                    subTitle: '',
                    scope: $scope,
                    buttons: [
                        {
                            text: '否'
                        },
                        {
                            text: '是',
                            type: 'button-calm',
                            onTap: function() {
                                $scope.param.productSpec = "";
                                UpdateBusinessOrderStatus.save({businessOrderId:item.businessOrderId,status:'del'},function(data){
                                    if(data.result==Global.SUCCESS){
                                        GetBorderSpecialOrderListByStauts.get({orderStatus:$scope.param.orderType},function(data){
                                            BusinessUtil.checkResponseData(data,"orderManagement&"+$scope.param.orderType);
                                            $scope.param.orderList = data.responseData;
                                            console.log(data.responseData)
                                        })
                                    }
                                })
                            }
                        }
                    ]
                });

            }

            $scope.confirmReceive = function(item){
                showToask("确认中...");
                UpdateBusinessOrderStatus.save({businessOrderId:item.businessOrderId,orderStatus:'2'},function(data){
                    if(data.result==Global.SUCCESS){
                        GetBorderSpecialOrderListByStauts.get({orderStatus:$scope.param.orderType},function(data){
                            BusinessUtil.checkResponseData(data,"orderManagement&"+$scope.param.orderType);
                            $scope.param.orderList = data.responseData;
                            showToask("确认成功");
                            hideToask();
                        })
                    }

                })
            }
            $scope.goDetails=function (orderId) {
                $state.go("orderDetails",{orderId:orderId})
            }
            $scope.findLogistic=function (orderId) {
                $state.go("logisticDetails",{orderId:orderId})
            }
            $scope.goHome=function () {
                $state.go("shopHome")
            }
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.chooseTab($stateParams.type);
            })

            var showToask = function (content) {
                $ionicLoading.show({
                    template: content
                });
            }
            var hideToask = function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            };
        }])