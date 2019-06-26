angular.module('controllers',[]).controller('bargainFreeCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBargainOrderDetail',
        'AddProduct2BuyCart','BusinessUtil','GetProductNumFromBuyCart','$ionicPopup',
        '$ionicSlideBoxDelegate','CreateBusinessOrder','PutNeedPayOrderListToRedis','Global','$ionicLoading',"$interval",'LoginGlobal','$timeout','GetUserInfo','GetUserInfoByOpenId','GetBusinessOrderByProductId',
        function ($scope,$rootScope,$stateParams,$state,GetBargainOrderDetail,
                  AddProduct2BuyCart,BusinessUtil,GetProductNumFromBuyCart,$ionicPopup,
                  $ionicSlideBoxDelegate,CreateBusinessOrder,PutNeedPayOrderListToRedis,Global,$ionicLoading,$interval,LoginGlobal,$timeout,GetUserInfo,GetUserInfoByOpenId,GetBusinessOrderByProductId) {

            $rootScope.title = "美享99产品详情";
            $scope.explain=false;// 点击24小时发货显示说明

            $scope.model=false;
            /* $scope.inputModel=false;*//*点击购买数量出现的弹框*/

            $scope.myObj = {
                background:"red",
                padding: "5px 20px"
            };

            $scope.showFlag = function (type) {
                $scope.model = type;
                /*if(!type){
                 $scope.param.checkFlag=""
                 }*/
            };

            $scope.confirmProductSpec = function(spec) {
                $scope.param.checkFlag = spec
            };

            $scope.concealment=function () {
                $scope.showFlag(false);
                /* $scope.param.checkFlag = "";*/
                $scope.param.productNum = 1
            };

            $scope.chooseSpec = function () {
                $scope.model = true
            };

            $scope.viewInstructions=function(){
                $scope.explain= true;
            };

            $scope.know=function(){
                $scope.explain=false;
            };
            $scope.goPay = function(){
                //先将此商品生成订单
                // CreateBusinessOrder.save({businessProductId:$scope.param.product[0].bargainActivityDTO.productId,
                //     productSpec:$scope.param.product[0].productSpec,
                //     businessProductNum: $scope.param.productNum,
                //     type:"bargain",orderId:$scope.param.product[0].orderId},function (data) {
                //     if(data.result==Global.FAILURE)
                //     {
                //         showToast("交易失败");
                //         hideToast()
                //     }
                //     else
                //     {
                        //生成订单后再直接前往支付页面
                        var needPayOrderList = [];
                        var payOrder = {
                            orderId:$scope.param.product[0].orderId,
                            productFirstUrl:$scope.param.product[0].bargainActivityDTO.firstUrl,
                            productId:$scope.param.product[0].bargainActivityDTO.productId,
                            productName:$scope.param.product[0].bargainActivityDTO.name,
                            productNum:$scope.param.productNum,
                            productPrice:$scope.param.product[0].amount,
                            productSpec:$scope.param.product[0].productSpec
                        };
                        needPayOrderList.push(payOrder);
                        //将needPayOrderList数据放入后台list中
                        PutNeedPayOrderListToRedis.save({needPayOrderList:needPayOrderList},function(data){
                            if(data.result==Global.SUCCESS)
                            {
                                hideToast()
                                $scope.showFlag(false);
                                $scope.param.checkFlag = "";
                                $scope.param.productNum = 1;
                                window.location.href = "orderPay.do?productType=bargain&random="+Math.random();
                            }else if(data.result==Global.FAILURE){
                                alert("购买失败");
                                hideToast()
                                $scope.showFlag(false);
                            }

                        })
                    // }
                // }
                // )

            };

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

            $scope.loginCart = function(){
                GetUserInfo.save(function (data) {
                    if(data.result==Global.FAILURE)
                    {
                        BusinessUtil.checkResponseData(data,"buyCart");
                    }
                    else
                    {
                        $state.go("buyCart");
                    }
                })
            };

            $scope.$on('$ionicView.enter', function(){
                $scope.param = {
                    product:[],
                    productSpec:"",
                    productUnPaidNum : "0",
                    currentIndex:0,
                    totalIndex:0,
                    productNum:1,
                    checkFlag:""
                };
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetBargainOrderDetail.get({orderId:$stateParams.businessOrderId},function(data){
                    $ionicLoading.hide();
                    $scope.param.product= data.responseData;
                    console.log($scope.param.product[0].orderId);
                    console.log($scope.param.product);
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    $interval(function(){
                        $scope.param.currentIndex =  $ionicSlideBoxDelegate.currentIndex()+1;
                        $scope.param.totalIndex =  $ionicSlideBoxDelegate.slidesCount()
                    },100);
                });

                GetProductNumFromBuyCart.get(function(data){
                    $scope.param.productUnPaidNum = data.responseData;
                });
            });
            $scope.bargainGoods=function () {
                $state.go("cutPrice",{productPrefecture:9})
            }
        }]);

