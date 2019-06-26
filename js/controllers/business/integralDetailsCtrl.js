/**
 * Created by Administrator on 2019/1/9.
 */
angular.module('controllers',[]).controller('integralDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetOfflineProductDetail',
        'AddProduct2BuyCart','BusinessUtil','GetProductNumFromBuyCart','$ionicPopup',
        '$ionicSlideBoxDelegate','CreateBonusOrder','PutNeedPayOrderListToRedis','Global','$ionicLoading',"$interval",'LoginGlobal','$timeout','GetUserInfo','GetUserInfoByOpenId','GetBusinessOrderByProductId','GetUserInfoIncome','GetBonusPointsDetail','GetBonusActivityDetail',
        function ($scope,$rootScope,$stateParams,$state,GetOfflineProductDetail,
                  AddProduct2BuyCart,BusinessUtil,GetProductNumFromBuyCart,$ionicPopup,
                  $ionicSlideBoxDelegate,createBonusOrder,PutNeedPayOrderListToRedis,Global,$ionicLoading,$interval,LoginGlobal,$timeout,GetUserInfo,GetUserInfoByOpenId,GetBusinessOrderByProductId,GetUserInfoIncome,GetBonusPointsDetail,GetBonusActivityDetail) {

            $rootScope.title = "美享99产品详情";

            $scope.explain=false;// 点击24小时发货显示说明

            $scope.model=false;

            $scope.myObj = {
                background:"red",
                padding: "5px 20px"
            };
            $scope.bonusPoints=''
            GetUserInfoIncome.get(function (data) {
                if (data.responseData != null) {
                    GetBonusPointsDetail.get(function (data) {
                        if (data.result == '0x00001') {
                            $scope.param.bonusPointsDTO = data.responseData;
                            //获得当前用户的积分数
                            $scope.bonusPoints = data.responseData.bonusPoints;
                        }
                    });
                }
            });

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
                    GetBonusPointsDetail.get(function (data) {
                        $scope.bonusPoints = data.responseData.bonusPoints;
                    /*根据用户的等级的商品来判断*/
                        GetUserInfoByOpenId.get(function (data) {
                        if(data.result == '0x00002'){
                            BusinessUtil.checkResponseData(data,'offlineProductDetail&'+$scope.param.product.productId);
                        }

                        if($scope.param.productNum<="0"){
                            alert("请选择正确的数量");
                            return
                        }

                        //积分校验
                        $scope.totalBonusPoints = $scope.bonusActivityInfo.bonusPointsNum * $scope.param.productNum
                        if($scope.totalBonusPoints > $scope.bonusPoints || $scope.bonusPoints=='' || $scope.bonusPoints=='undefined'){
                            alert("对不起，您的积分不足，购买"+$scope.param.productNum+"个产品，至少需要"+$scope.totalBonusPoints+"个积分"+"你目前有"+$scope.bonusPoints+"个积分");
                            return
                        }

                        /*根据商品数量跟库存的对比，数量大于库存及库存不足，结束这一步*/
                        if($scope.param.productNum > $scope.bonusActivityInfo.activityNum){
                            alert("库存不足~");
                            return;
                        }
                        else
                        {
                            showToast("加载中");
                            //先将此商品生成订单
                            $scope.param.product.type = "bonus"
                            createBonusOrder.save({businessProductId:$scope.param.product.productId,
                                productSpec:$scope.param.checkFlag,
                                businessProductNum: $scope.param.productNum,
                                bonusId: $scope.bonusActivityInfo.id,
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
                                        productPrice:$scope.bonusActivityInfo.favorablePrice,
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
                                            window.location.href = "orderPay.do?productType=" + $scope.param.product.type
                                                    + "&productId=" +$scope.param.product.productId
                                                    + "&specialShopId=" +$scope.bonusActivityInfo.id
                                                    + "&random="+Math.random();

                                        }else if(data.result==Global.FAILURE){
                                            alert("购买失败");
                                            hideToast()
                                            $scope.showFlag(false);
                                        }

                                    })
                                }
                            })
                        }
                    });

                    })

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
                //活动信息
                $scope.bonusActivityInfo = {}

                GetBonusActivityDetail.get({id:$stateParams.bonusPointsId},
                    function(data){
                        $scope.bonusActivityInfo = data.responseData;
                        if(data.result == Global.SUCCESS){
                            GetOfflineProductDetail.get({productId:$scope.bonusActivityInfo.productId},function(data){
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
                        }
                    })

                GetProductNumFromBuyCart.get(function(data){
                    $scope.param.productUnPaidNum = data.responseData;
                });
                /*点击联系客服跳转到相应页面*/
                $scope.contactCustomer=function () {
                    $state.go("contactCustomer")
                }
            });

        }]);

