/**
 * Created by Administrator on 2018/10/11.
 */
angular.module('controllers',[]).controller('bargainProductDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBargainOrderDetail','BusinessUtil','$ionicPopup',
        '$ionicSlideBoxDelegate','UserBargain','PutNeedPayOrderListToRedis','Global','$ionicLoading',"$interval",'LoginGlobal','$timeout','IsLogin',
        function ($scope,$rootScope,$stateParams,$state,GetBargainOrderDetail,
                  BusinessUtil,$ionicPopup,
                  $ionicSlideBoxDelegate,UserBargain,PutNeedPayOrderListToRedis,Global,$ionicLoading,$interval,LoginGlobal,$timeout,IsLogin) {

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
            $scope.toCut = function(){
                UserBargain.get({orderId:$stateParams.orderId,bargainId:$stateParams.bargainId,productId:$stateParams.productId},function (data) {
                    if(data.result == '0x00002'){
                        BusinessUtil.checkResponseData(data,'bargainProductDetail/'+$stateParams.bargainId+"/"+$stateParams.orderId+"/"+$stateParams.productId);
                    }
                    if(data.result==Global.SUCCESS){
                        var alertPopup = $ionicPopup.alert({
                            template: '<div style="font-size: 0.3rem;color: #333333;text-align: center">您帮朋友砍啦'+ data.responseData.bargainMoney +'元</div>',
                            buttons: [
                                {
                                    onTap: function() {
                                        $state.go("shopHome")
                                    },
                                    text: '确定',
                                    type: 'button-assertive'
                                }
                            ]

                        });
                    }else{
                        alert(data.errorInfo)
                    }
                })
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
                    checkFlag:"",
                    money:{}
                };
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetBargainOrderDetail.get({orderId:$stateParams.orderId},function(data){
                    $ionicLoading.hide();
                    $scope.param.product = data.responseData;
                    $scope.param.checkFlag = $scope.param.product.productDetail.spec[0];
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
            });
            $scope.bargainGoods=function () {
                $state.go("cutPrice",{productPrefecture:9})
            }
        }]);

