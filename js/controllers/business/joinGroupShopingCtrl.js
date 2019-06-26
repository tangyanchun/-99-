var shopingDetail=angular.module('controllers',['ionic']).controller('joinGroupShopingCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        'BusinessUtil','$ionicPopup','$ionicPopover', '$ionicSlideBoxDelegate','GetCollageActivityRQCode','Global','$ionicLoading',"$interval",'GetCollageQRCode','$location',
        function ($scope,$rootScope,$stateParams,$state,
                 BusinessUtil,$ionicPopup,$ionicPopover, $ionicSlideBoxDelegate,GetCollageActivityRQCode,Global,$ionicLoading,$interval,GetCollageQRCode,$location) {

            $scope.orderid = $stateParams.orderId;
            $rootScope.title = "商品团购";
            $scope.explain=false;// 点击24小时发货显示说明
            $scope.model=false;
            $scope.myObj = {
                background:"red",
                padding: "5px 20px"
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
                GetCollageActivityRQCode.get({orderId:$scope.orderid },function (data) {
                    console.log(data)
                    $ionicLoading.hide();
                    $scope.param.product = data.responseData.collageActivity;
                    $scope.countdown = data.responseData.countdown;

                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    GetCollageQRCode.get({info:data.responseData.qrcode},function (data) {
                       $scope.userQRCode = data.responseData;
                    })

                    if($scope.orderid == ''){
                        $scope.linkUrl = $location.absUrl()+data.responseData.orderId;
                    }else{
                        $scope.linkUrl = $location.absUrl();
                    }
                    wx.onMenuShareTimeline({
                        title:  "您的好友邀请你参加拼团", // 分享标题
                        imgUrl: 'https://mximage.oss-cn-beijing.aliyuncs.com/viewPicture/585854756758332547.jpg', // 分享图标
                        link: $scope.linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        success: function () {
                        }
                    })

                    wx.onMenuShareAppMessage({
                        title: "一个可以分享赚钱的美妆商城", // 分享标题
                        desc:  '您的好友邀请你参加拼团', // 分享描述
                        link: $scope.linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'https://mximage.oss-cn-beijing.aliyuncs.com/viewPicture/585854756758332547.jpg', // 分享图标
                        success: function (res) {
                        },
                        fail: function (res) {
                            alert(res)
                        }
                    });

                })
            });

        }]);


$.ajax({
    url:"/weixin/customer/getConfig",// 跳转到 action
    async:true,
    type:'get',
    data:{url:location.href.split('#')[0]},//得到需要分享页面的url
    cache:false,
    dataType:'json',
    success:function(data) {
        var configValue = data.responseData;
        console.log(configValue);
        if(configValue!=null ){
            timestamp = configValue.timestamp;//得到时间戳
            nonceStr = configValue.nonceStr;//得到随机字符串
            signature = configValue.signature;//得到签名
            appid = configValue.appid;//appid

            //微信配置
            wx.config({
                debug: false,
                appId: appid,
                timestamp:timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                ] // 功能列表
            });
            wx.ready(function () {
                // config信息验证后会执行ready方法，
                // 所有接口调用都必须在config接口获得结果之后，
                // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
                // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
                // 则可以直接调用，不需要放在ready函数中。
            })
        }else{
        }
    },
    error : function() {
    }
});

        shopingDetail.directive('timerBtn', function() { // 倒计时按钮
                return {
                    restrict: 'EA',
                    replace: true,
                    scope: {
                        startTime:'@',
                        getData: '&getData'
                    },
                    template: '<div style="position: relative;display: inline-block"><span style="background: black;width: 0.5rem;height: 0.3rem;line-height:0.3rem;text-align:center;display: inline-block;margin-right: 0.1rem;color:#fff">{{h}}</span>' +
                        '<span style="color:#fff;">:</span>'+
                        '<span style="background: black;width: 0.5rem;height: 0.3rem;line-height:0.3rem;text-align:center;display: inline-block;margin-right: 0.1rem;color:#fff;">{{m}}</span>'+
                        '<span style="color:#fff;">:</span>'+
                        '<span style="background: black;width: 0.5rem;height: 0.3rem;line-height:0.3rem;text-align:center;display: inline-block;margin-right: 0.1rem;color:#fff;">{{s}}</span></div>',
                    controller: ['$scope','$interval',function($scope, $interval) {
                        $scope.h=121;
                        var formatTime = function(sys_second) {
                            if (sys_second > 0) {
                                sys_second -= 1;

                                var hour = Math.floor(sys_second / 3600);
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


                                $scope.h=(hour < 10 ? "0" + hour : hour);
                                $scope.m=(minute < 10 ? "0" + minute : minute);
                                $scope.s=(second < 10 ? "0" + second : second);
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

                    }]
                };
            });

