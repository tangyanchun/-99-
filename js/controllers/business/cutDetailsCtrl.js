angular.module('controllers',[]).controller('cutDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBargainActivityDetail','BusinessUtil','$ionicPopup',
        '$ionicSlideBoxDelegate','CreateBargainOrder','PutNeedPayOrderListToRedis','Global','$ionicLoading',"$interval",'LoginGlobal','$timeout','GetBusinessOrderByProductId',
        function ($scope,$rootScope,$stateParams,$state,GetBargainActivityDetail,
                  BusinessUtil,$ionicPopup,
                  $ionicSlideBoxDelegate,CreateBargainOrder,PutNeedPayOrderListToRedis,Global,$ionicLoading,$interval,LoginGlobal,$timeout,GetBusinessOrderByProductId) {

            $rootScope.title = "美享99产品详情";

            $scope.explain=false;// 点击24小时发货显示说明

            $scope.model=false;
            $scope.isSubmitted =false;

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


                /*根据商品状态来判断商品是否为下架商品*/
                if($scope.param.product.status == "0"){
                    return;
                }
                if($scope.model){
                    $scope.isSubmitted =true;
                    if($scope.param.product.productDetail.spec.length == 1){
                        $scope.param.checkFlag = $scope.param.product.productDetail.spec[0]
                    }
                    if($scope.param.productNum>$scope.param.product.activityNum){
                        alert("库存不足~");
                        return;
                    }
                    //没有选择属性
                    if($scope.param.checkFlag=="")
                    {
                        $scope.model=true;
                    }else{
                         var businessOrderDTO={
                             businessProductId:$stateParams.productId,
                             productSpec:$scope.param.checkFlag,
                             businessProductNum: $scope.param.productNum,
                             bargainId:$stateParams.id,
                             type:"bargain",
                         };

                        /*判断用户有没有购买过该商品接口*/
                        GetBusinessOrderByProductId.get({productId:$stateParams.productId},function (data) {
                            if (data.result == "0x00001") {
                                if ($scope.param.product.astrict == '2') {
                                    showToast("很抱歉，该商品最多购买1次");
                                    hideToast();
                                    return;
                                }
                                // if ($scope.param.product.astrict == '3') {
                                //     showToast("很抱歉，该商品最多购买1件");
                                //     hideToast();
                                //     return;
                                // }
                                if ($scope.param.product.astrict == '3') {
                                    showToast("很抱歉，该商品最多购买1件，最多买一次");
                                    hideToast();
                                    return;
                                }
                            }
                            CreateBargainOrder.save(businessOrderDTO, function (data) {
                                if (data.result == Global.SUCCESS) {
                                    var alertPopup = $ionicPopup.alert({
                                        template: '<div style="font-size: 0.3rem;color: #333333;text-align: center">亲您砍啦' + data.responseData.bargainMoney + '元，请尽快购买，24小时后订单失效</div>',
                                        buttons: [
                                            {
                                                onTap: function () {
                                                    $state.go("myCut")
                                                },
                                                text: '确定',
                                                type: 'button-assertive'
                                            }
                                        ]

                                    });
                                } else {
                                    alert(data.errorInfo)
                                }
                                $scope.isSubmitted =false;
                            })
                        })
                    }
                }else{
                    $scope.model = true
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
                GetBargainActivityDetail.get({id:$stateParams.id},function(data){
                    $ionicLoading.hide();
                    $scope.param.product = data.responseData;
                    var thisTime = data.responseData.endTime.replace(/-/g, '/');
                    var time = new Date(thisTime);
                    time = time.getTime();
                    var timestamp = (new Date()).getTime();
                    $scope.time = time-timestamp;
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
            });
           $scope.bargainGoods=function () {
             $state.go("cutPrice",{productPrefecture:9})
           }
        }]).directive('timerBtns', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            remindMe: '=remindMe',
            getData: '&getData'
        },
        template: '<span class="btn btn-danger" ng-disabled="startTime> 0" ng-bind="remindMe == 0 ? showTime:showTime"" ng-click="getData()"></span>',
        controller: function($scope, $interval) {
            var formatTime = function(sys_second) {
                if (sys_second > 0) {
                    sys_second -= 1;
                    var day =  parseInt((sys_second/ (1000 * 60 * 60 * 24)))
                    if (day < 0) {
                        day = 0;
                    }
                    var hour = parseInt((sys_second % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    if (hour < 0) {
                        hour = 0;
                    }
                    var minute = parseInt((sys_second % (1000 * 60 * 60)) / (1000 * 60));
                    if (minute < 0) {
                        minute = 0;
                    }
                    var second = Math.ceil(sys_second % (1000 * 60)/1000) ;
                    if (second < 0) {
                        second = 0;
                    }
                    return (((hour + day*24) >0?(((hour + day*24) < 10 ? "0" + (hour + day*24) : (hour + day*24)) + " : "):"") + (minute < 10 ? "0" + minute : minute) + " : " + (second < 10 ? "0" + second : second))
                }
            };

            var timer = $interval(function() {
                $scope.startTime -= 1000;
                $scope.showTime = formatTime($scope.startTime);
                if($scope.startTime < 1) {
                    $interval.cancel(timer);
                    // location.reload();
                };
            }, 1000);

        }
    };
});
