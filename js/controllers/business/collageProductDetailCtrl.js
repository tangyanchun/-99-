var seckill=angular.module('controllers',[]).controller('collageProductDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCollageActivityDetail','BusinessUtil','$ionicPopup',
        '$ionicSlideBoxDelegate','CreateBusinessOrder','PutNeedPayOrderListToRedis','Global','$ionicLoading',"$interval",'LoginGlobal','$timeout','IsLogin','GetUserInfoByOpenId','GetBusinessOrderByProductId','CreateCollageOrder','GetRemainCollageOrder',
        function ($scope,$rootScope,$stateParams,$state,GetCollageActivityDetail,
                  BusinessUtil,$ionicPopup,
                  $ionicSlideBoxDelegate,CreateBusinessOrder,PutNeedPayOrderListToRedis,Global,$ionicLoading,$interval,LoginGlobal,$timeout,IsLogin,GetUserInfoByOpenId,GetBusinessOrderByProductId,CreateCollageOrder,GetRemainCollageOrder) {

            $rootScope.title = "美享99产品详情";

            $scope.explain=false;// 点击24小时发货显示说明

            $scope.model=false;

            $scope.myObj = {
                background:"red",
                padding: "5px 20px"
            };

            $scope.showFlag = function (type) {
                $scope.model = type;
            };

            $scope.confirmProductSpec = function(spec) {
                $scope.param.checkFlag = spec
            };

            $scope.concealment=function () {
                $scope.showFlag(false);
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
            $scope.goPay = function(status){
                if(status != undefined){
                    $scope.productPayStatus = status;
                }
                /*根据商品状态来判断商品是否为下架商品*/
                if($scope.param.product.status == "0"){
                    return;
                }
                if($scope.model){
                    if($scope.param.product.productDetail.spec.length == 1){
                        $scope.param.checkFlag = $scope.param.product.productDetail.spec[0]
                    }
                    if($scope.param.checkFlag=="")
                    {
                        $scope.model=true;
                    }
                    /*根据用户的等级的商品来判断*/
                    GetUserInfoByOpenId.get(function (data) {
                        if(data.result == '0x00002'){
                            BusinessUtil.checkResponseData(data,'collageProductDetail/'+$scope.param.product.id+"/"+$stateParams.groupId);
                        }

                        if($scope.param.productNum=="0"){
                            alert("请选择正确的数量");
                            return
                        }
                        /*判断用户有没有购买过该商品接口*/
                        GetBusinessOrderByProductId.get({productId:$scope.param.product.productId},function (data) {
                            if(data.result=="0x00001"){
                                if($scope.param.product.astrict=='2'){
                                    showToast("很抱歉，该商品最多购买1次");
                                    hideToast();
                                    return;
                                }
                                if($scope.param.product.astrict=='3'){
                                    showToast("很抱歉，该商品最多购买1件");
                                    hideToast();
                                    return;
                                }
                            }
                            /*根据商品数量跟库存的对比，数量大于库存及库存不足，结束这一步*/
                            if($scope.param.productNum>$scope.param.product.productAmount){
                                alert("库存不足~");
                                return;
                            }
                            else
                            {
                                showToast("加载中");

                                if($scope.productPayStatus  == "alone"){
                                    //先将此商品生成订单
                                    CreateBusinessOrder.save({businessProductId:$scope.param.product.productId,
                                        productSpec:$scope.param.checkFlag,
                                        businessProductNum: $scope.param.productNum,
                                        type:"offline"},function (data) {
                                        BusinessUtil.checkResponseData(data,'collageProductDetail/'+$scope.param.product.id+"/"+$stateParams.groupId);
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
                                                productName:$scope.param.product.name,
                                                productNum:$scope.param.productNum,
                                                productPrice:$scope.param.product.price,
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
                                                    window.location.href = "orderPay.do?productType=offline&random="+Math.random();
                                                }else if(data.result==Global.FAILURE){
                                                    alert("购买失败");
                                                    hideToast()
                                                    $scope.showFlag(false);
                                                }
                                            })
                                        }
                                    })
                                }else{
                                    //拼团购买
                                    console.log($stateParams.groupId)
                                    CreateCollageOrder.save({collageId:$stateParams.collageId,businessProductId:$scope.param.product.productId,
                                        productSpec:$scope.param.checkFlag,collageGroupId:$stateParams.groupId,
                                        businessProductNum: $scope.param.productNum,
                                        type:"collage"},function (data) {
                                        BusinessUtil.checkResponseData(data,'collageProductDetail/'+$scope.param.product.id+"/"+$stateParams.groupId);
                                        if(data.result==Global.FAILURE)
                                        {
                                            showToast(data.errorInfo);
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
                                                productName:$scope.param.product.name,
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
                                                    window.location.href = "orderPay.do?productType=collage&random="+Math.random();
                                                }else if(data.result==Global.FAILURE){
                                                    alert("购买失败");
                                                    hideToast()
                                                    $scope.showFlag(false);
                                                }
                                            })
                                        }
                                    })
                                }

                            }
                        });
                    });
                }else{
                    $scope.model = true
                }
            };

            $scope.addProductNum = function(){
                if($scope.param.product.astrict=="1"){
                    showToast("很抱歉，该商品最多购买1件");
                    hideToast();
                    return;
                }
                $scope.param.productNum=$scope.param.productNum+1;
                if($scope.param.productNum>$scope.param.product.productAmount){
                    $("#Car").css("background","grey");
                    $("#goPay").css("background","grey");
                }
            };

            $scope.minusProductNum = function(){
                if($scope.param.productNum>1){
                    $scope.param.productNum= $scope.param.productNum-1;
                }else{
                    $(".ion-ios-minus-outline").attr('disabled','disabled').addClass("grey");
                }
                if($scope.param.productNum<=$scope.param.product.productAmount){
                    $("#Car").css("background","#fca1a8");
                    $("#goPay").css("background","red");
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
                GetCollageActivityDetail.get({id:$stateParams.collageId},function(data){
                    $ionicLoading.hide();
                    $scope.param.product = data.responseData;
                    $scope.param.checkFlag = $scope.param.product.productDetail.spec[0];
                    $scope.param.product.astrict =data.responseData.astrict;
                    if($scope.param.product.status == "0"){
                        $("#add").css("background","grey");
                        $("#go").css("background","grey");
                    }
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    $interval(function(){
                        $scope.param.currentIndex =  $ionicSlideBoxDelegate.currentIndex()+1;
                        $scope.param.totalIndex =  $ionicSlideBoxDelegate.slidesCount()
                    },100);
                });
                GetRemainCollageOrder.get({activityId:$stateParams.collageId},function (data) {
                    $scope.activityList=data.responseData;
                });
                $scope.activityPay=function (id) {
                    $stateParams.groupId=id;
                    $scope.goPay('collage')
                };

                /*点击联系客服跳转到相应页面*/
                $scope.contactCustomer=function () {
                    $state.go("contactCustomer")
                }
            });

        }]);
seckill.directive('timerBtn', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            remindMe: '=remindMe',
            getData: '&getData'
        },
        template: '<span class="btn btn-danger" ng-disabled="startTime> 0" ng-bind="remindMe == 0 ? \'剩余:\' +showTime +\'结束\': \'剩余:\' +showTime+\'后结束\'" ng-click="getData()"></span>',
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
                    return  (hour >0?((hour < 10 ? "0" + hour : hour) + "："):"") + (minute < 10 ? "0" + minute : minute) + "：" + (second < 10 ? "0" + second : second);
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
