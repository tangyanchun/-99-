var seckillInfo = angular.module('controllers',[]).controller('seckillInfoCtrl',
    ['$scope','$location','$rootScope','$stateParams','$state','$ionicPopup',
        '$ionicSlideBoxDelegate','$ionicLoading',"$interval",'$timeout','IsLogin','SeckillInfo','CreateSeckillOrder','Global','PutNeedPayOrderListToRedis','BusinessUtil','GetBusinessOrderByProductId',
        function ($scope,$location,$rootScope,$stateParams,$state,$ionicPopup,
                  $ionicSlideBoxDelegate,$ionicLoading,$interval,$timeout,IsLogin,SeckillInfo,CreateSeckillOrder,Global,PutNeedPayOrderListToRedis,BusinessUtil,GetBusinessOrderByProductId) {
            $scope.authentication_flag = false;
            $rootScope.title = "秒杀详情";
            $scope.model=false;
            $scope.myObj = {
                background:"red",
                padding: "5px 20px",
            };
            $scope.showFlag = function (type) {
                $scope.model = type;
                if(!type){
                    $scope.param.checkFlag=""
                }
            };
            $scope.kefu = function () {
                $state.go("contactCustomer");
            };

            $scope.confirmProductSpec = function(spec) {
                $scope.param.checkFlag = spec
            };

            $scope.concealment=function () {
                $scope.showFlag(false);
                $scope.param.checkFlag = "";
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

                /*根据商品状态来判断商品是否为下架商品*/
                if($scope.model){
                    if($scope.param.checkFlag=="")
                    {
                        $scope.model=true;
                    }
                        if($scope.param.productNum=="0"){
                            alert("请选择正确的数量");
                            return
                        }
                        if($scope.param.productNum>$scope.param.product.stockNum){
                            alert("库存不足~");
                            return;
                        }
                        else
                        {
                            showToast("加载中");

                            GetBusinessOrderByProductId.get({productId:$scope.param.product.productId},function (data) {
                                if(data.result=="0x00001"){
                                    if($scope.param.product.astrict=='2'){
                                        showToast("很抱歉，该商品最多购买1次");
                                        hideToast();
                                        return;
                                    }
                                    // if($scope.param.product.astrict=='3'){
                                    //     showToast("很抱歉，该商品最多购买1件");
                                    //     hideToast();
                                    //     return;
                                    // }
                                    if($scope.param.product.astrict=='3'){
                                        showToast("很抱歉，该商品最多购买1件，最多买一次");
                                        hideToast();
                                        return;
                                    }
                                }

                            CreateSeckillOrder.save(
                                {businessProductId:$scope.param.product.productId,
                                productSpec:$scope.param.checkFlag,
                                businessProductNum: $scope.param.productNum,
                                type:$scope.param.product.productType,
                                fieldId:$scope.param.product.fieldId+"",
                                },function (data) {
                                BusinessUtil.checkResponseData(data,"seckillInfoCtrl/"+$scope.param.product.fieldId);
                                if(data.result==Global.FAILURE)
                                {
                                    showToast("交易失败");
                                    hideToast()
                                }
                                else
                                {
                                    //生成订单后再直接前往支付页面
                                    var needPayOrderList = [];
                                    var payOrder = {
                                        orderId:data.responseData,
                                        productFirstUrl:$scope.param.product.firstUrl,
                                        productId:$scope.param.product.productId,
                                        productName:$scope.param.product.productName,
                                        productNum:$scope.param.productNum,
                                        productPrice:$scope.param.product.favorablePrice,
                                        productSpec:$scope.param.checkFlag
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
                                            window.location.href = "orderPay.do?productType=seckill&random="+Math.random();
                                        }else if(data.result==Global.FAILURE){
                                            alert("购买失败");
                                            hideToast()
                                            $scope.showFlag(false);
                                        }

                                    })
                                }
                            })
                            });
                        }
                        }
                }

            $scope.addProductNum = function(){
                if($scope.param.product.astrict=='1'){
                    alert("本商品最多购买一件");
                    return
                }else if($scope.param.product.astrict=='3'){
                    alert("本商品最多购买一次");
                    return
                }
                $scope.param.productNum=$scope.param.productNum+1;
                if($scope.param.productNum>$scope.param.product.productNum || $scope.param.productNum>$scope.param.product.stockNum){
                    $("#Car").css("background","grey");
                    $("#goPay").css("background","grey");
                    $("#goPay").attr('disabled','disabled').addClass("grey");
                }
            };

            $scope.minusProductNum = function(){
                if($scope.param.productNum>1){
                    $scope.param.productNum= $scope.param.productNum-1;
                }
                if($scope.param.productNum<=$scope.param.product.productNum && $scope.param.productNum <= $scope.param.product.stockNum){
                    $("#goPay").css("background","red");
                    $('#goPay').removeAttr("disabled");
                }else{
                    $("#goPay").css("background","grey");
                    $("#goPay").attr('disabled','disabled').addClass("grey");
                }
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
            $scope.$on('$ionicView.enter', function(){
                $scope.param = {
                    product:{},
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

                SeckillInfo.get({activtyId:$stateParams.id+""},function (data){
                    $ionicLoading.hide();
                    if(data.status != 0){
                        $("#buyButton").attr('disabled','disabled').css("background","#444");
                    }
                    $scope.param.product = data;
                    $scope.param.checkFlag = $scope.param.product.productDetail.spec[0];
                    $scope.param.product.astrict =data.astrict;
                    if($scope.param.product.productNum <= 0){
                        $("#add").css("background","grey");
                        $("#go").css("background","grey");
                    }
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    $interval(function(){
                        $scope.param.currentIndex =  $ionicSlideBoxDelegate.currentIndex()+1;
                        $scope.param.totalIndex =  $ionicSlideBoxDelegate.slidesCount()
                    },100);
                    console.log(data)
                })

            })

        }])


seckillInfo.directive('timerBtn', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            remindMe: '=remindMe',
            getData: '&getData'
        },
        template: '<span class="btn btn-danger" ng-disabled="startTime> 0" ng-bind="remindMe == 0 ? \'距离活动结束还剩:\' +showTime : \'距离活动开始还剩:\' +showTime " ng-click="getData()"></span>',
        controller: function($scope, $interval) {
            var formatTime = function(sys_second) {
                if (sys_second > 0) {
                    sys_second -= 1;
                    var day = Math.floor((sys_second / 3600) / 24);
                    if (day < 0) {
                        day = 0;
                    }
                    var hour = Math.floor((sys_second / 3600) % 24);
                    if (hour < 0) {
                        hour = 0;
                    }
                    var minute = Math.floor((sys_second / 60) % 60);
                    if (minute < 0) {
                        minute = 0;
                    }
                    var second = Math.floor(sys_second % 60);
                    if (second < 0) {
                        second = 0;
                    }
                    return  (day >0?((day < 10 ? "0" + day : day) + "天"):"") + (hour >0?((hour < 10 ? "0" + hour : hour) + "小时"):"") + (minute < 10 ? "0" + minute : minute) + "分钟" + (second < 10 ? "0" + second : second)+"秒";
                }
            }

            var timer = $interval(function() {
                $scope.startTime -= 1;
                $scope.showTime = formatTime($scope.startTime);
                if($scope.startTime < 1) {
                    $interval.cancel(timer);
                    location.reload();
                };
            }, 1000);

        }
    };
});