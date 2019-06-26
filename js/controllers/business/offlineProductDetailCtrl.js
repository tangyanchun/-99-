angular.module('controllers',[]).controller('offlineProductDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetOfflineProductDetail',
        'AddProduct2BuyCart','BusinessUtil','GetProductNumFromBuyCart','$ionicPopup',
        '$ionicSlideBoxDelegate','CreateBusinessOrder','PutNeedPayOrderListToRedis','Global','$ionicLoading',"$interval",'LoginGlobal','$timeout','GetUserInfo','GetUserInfoByOpenId','GetBusinessOrderByProductId',
        function ($scope,$rootScope,$stateParams,$state,GetOfflineProductDetail,
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

            $scope.addBuyCart = function(){
                /*根据商品状态来判断商品是否为下架商品*/
                if($scope.param.product.status == "0"){
                    return;
                }
                if($scope.model){
                    BusinessUtil.twoParameters(LoginGlobal.MX_SC_AGW,$stateParams.productId);
                    if($scope.param.product.productDetail.spec.length == 1){
                        $scope.param.checkFlag = $scope.param.product.productDetail.spec[0]
                    }
                    if($scope.param.productNum=="0"){
                        alert("请选择正确的数量");
                        return;
                    }
                    if($scope.param.productNum>$scope.param.product.productAmount){
                        alert("库存不足~");
                        return;
                    }
                    //没有选择属性
                    if($scope.param.checkFlag=="")
                    {
                        $scope.model=true;
                    }else{
                        showToast("加载中...");


                        if(($stateParams.productId=="AAA111"||$stateParams.productId=="AAA222")&&$scope.param.productNum>1)
                        {
                            alert("此商品只能购买一套")
                        }


                        else {
                            /*判断用户有没有购买过该商品接口*/
                            GetBusinessOrderByProductId.get({productId:$stateParams.productId},function (data) {
                                if(data.result=="0x00001"){
                                    if($scope.param.product.astrict=='2'){
                                        showToast("很抱歉，该商品最多购买1次");
                                        hideToast();
                                        return;
                                    }
                                    // if($scope.param.product.astrict=='1'){
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
                                AddProduct2BuyCart.get({productId:$stateParams.productId,productSpec:$scope.param.checkFlag,productNum: $scope.param.productNum},function(data){
                                BusinessUtil.checkResponseData(data,'offlineProductDetail&'+$stateParams.productId);
                                if(data.result==Global.FAILURE){
                                    showToast("加入购物车失败");
                                    hideToast()
                                }else{
                                    showToast("加入购物车成功");
                                    hideToast();
                                    $scope.param.productNum = 1;
                                    $scope.showFlag(false);
                                    $scope.param.checkFlag = "";
                                    GetProductNumFromBuyCart.get(function(data){
                                        $scope.param.productUnPaidNum = data.responseData;
                                    });
                                }
                            })
                        });
                        }

                    }
                }else{
                    $scope.model = true
                }
            };

            $scope.goPay = function(){
                /*根据商品状态来判断商品是否为下架商品*/
                if($scope.param.product.status == "0"){
                    return;
                }
                BusinessUtil.twoParameters(LoginGlobal.MX_SC_ACJ,$stateParams.productId);

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
                            BusinessUtil.checkResponseData(data,'offlineProductDetail&'+$scope.param.product.productId);
                        }
                        if(data.responseData.userType!="business-C-1"){
                            if($scope.param.product.productPrefecture=="1"){
                                alert("亲！此商品为新用户专享产品");
                                return
                            }
                        }
                        if($scope.param.productNum=="0"){
                            alert("请选择正确的数量");
                            return
                        }
                        /*判断用户有没有购买过该商品接口*/
                        GetBusinessOrderByProductId.get({productId:$stateParams.productId},function (data) {
                            if(data.result=="0x00001"){
                                if($scope.param.product.astrict=='2'){
                                    showToast("很抱歉，该商品最多购买1次");
                                    hideToast();
                                    return;
                                }
                                // if($scope.param.product.astrict=='1'){
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
                            /*根据商品数量跟库存的对比，数量大于库存及库存不足，结束这一步*/
                            if($scope.param.productNum>$scope.param.product.productAmount){
                                alert("库存不足~");
                                return;
                            }
                            else
                            {
                                showToast("加载中");

                                if(($stateParams.productId=="AAA111"||$stateParams.productId=="AAA222")&&$scope.param.productNum>1)
                                {
                                    alert("此商品只能购买一套")
                                }
                                else {
                                    //先将此商品生成订单
                                    CreateBusinessOrder.save({businessProductId:$scope.param.product.productId,
                                        productSpec:$scope.param.checkFlag,
                                        businessProductNum: $scope.param.productNum,
                                        type:$scope.param.product.type},function (data) {
                                        BusinessUtil.checkResponseData(data,'offlineProductDetail&'+$scope.param.product.productId);
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
                                                    if($scope.param.product.type=='offline')
                                                    {
                                                        window.location.href = "orderPay.do?productType=" + $scope.param.product.type + "&random="+Math.random();
                                                    }
                                                    else if($scope.param.product.type=='special')
                                                    {
                                                        window.location.href = "orderPay.do?productType=" + $scope.param.product.type
                                                            + "&specialShopId=" + $rootScope.specialShopId
                                                            + "&random="+Math.random();
                                                    }
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
                /*限购*/
                if($scope.param.product.astrict=="1" || $scope.param.product.astrict=="3" ){
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

            /*点击购买数量的输入框出现的div*/
            /* $scope.inputBox=function () {
               $scope.inputModel=true;
             };*/

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
                GetOfflineProductDetail.get({productId:$stateParams.productId},function(data){
                    $ionicLoading.hide();
                    $scope.param.product = data.responseData;
                    $scope.param.checkFlag = $scope.param.product.productDetail.spec[0];
                    $scope.param.product.astrict =data.responseData.astrict;
                    /*测试*/
                    /* $scope.param.product.status = "0";*/
                    /* $scope.param.product.productAmount=$scope.param.product.productAmount-1;*/
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

                GetProductNumFromBuyCart.get(function(data){
                    $scope.param.productUnPaidNum = data.responseData;
                });
                /*点击联系客服跳转到相应页面*/
                $scope.contactCustomer=function () {
                    $state.go("contactCustomer")
                }
            });

        }]);

