/**
 * Created by Administrator on 2018/9/20.
 */
var seckill=angular.module('controllers',[]).controller('myCutCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBargainOrderList','$ionicLoading','$ionicPopup','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,GetBargainOrderList,$ionicLoading,$ionicPopup,BusinessUtil) {
            $scope.bargainGoods=function () {
                $state.go("cutPrice",{productPrefecture:9})
            };
            $scope.bargainFree=function (item,item2) {
                if(item2=='0'){
                 alert("活动已结束，下次早点来哈~");
                    return;
                }
                $state.go("bargainFree",{businessOrderId:item})
            };
            $scope.model=false;
            $scope.checkCut=function (item,item2) {
                if(item2=='0'){
                        alert("活动已结束，下次早点来哈~");
                    return;
                }
                $scope.model=true;
                $scope.money=item.bargainTotalMoney;

                var alertPopup = $ionicPopup.alert({
                    title:'<p style="font-size: 0.3rem;color: #333333;">恭喜您!</p>',
                    template: '<div style="font-size: 0.3rem;color: #333333;text-align: center">您砍啦'+ $scope.money+'元' +'<p style="font-size: 12px;color: #5a5a5a;margin-top: 27px;font-family: PingFang-SC-Bold">点击右上角，分享给朋友、朋友圈</p>'+'<p style="font-size: 12px;color: #5a5a5a;margin-top: 9.5px;font-family: PingFang-SC-Bold">有机会免费拿哦</p>'+
                    '</div>',

                    buttons: [
                        {
                            text: '关闭',
                            type: 'button-assertive'
                        }
                    ]

                });
                wx.onMenuShareTimeline({
                    title:  "千山万水总是情，帮我砍一刀行不行。", // 分享标题
                    imgUrl: 'https://mximage.oss-cn-beijing.aliyuncs.com/viewPicture/585854756758332547.jpg', // 分享图标
                    link:'http://mx99.kpbeauty.com.cn/customer#/joinCutPrice/'+item.businessOrderId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    success: function () {
                    }
                });

                wx.onMenuShareAppMessage({
                    title: "一个可以分享赚钱的美妆商城", // 分享标题
                    desc:  '千山万水总是情，帮我砍一刀行不行。', // 分享描述
                    link: 'http://mx99.kpbeauty.com.cn/customer#/joinCutPrice/'+item.businessOrderId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://mximage.oss-cn-beijing.aliyuncs.com/viewPicture/585854756758332547.jpg', // 分享图标
                    success: function (res) {
                    },
                    fail: function (res) {
                        alert(res)
                    }
                });

            };
            $scope.concealment=function () {
                $scope.model=false;
            };
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param={
                    picFlag:false/*空白页面的显示*/
                };
                /*我的砍价接口*/
                GetBargainOrderList.get(function (data) {
                    BusinessUtil.checkResponseData(data,'myCut');
                    if(data.responseData){
                        $ionicLoading.hide();
                        for (var i = 0; i < data.responseData.length; i = i + 1) {
                            $scope.cutPriceList = data.responseData;
                            for(var  j = 0 ;j < data.responseData[i].bargainActivityDTO.bargainDetail.length;j=j+1){
                                $scope.cutPrice2List = data.responseData[i].bargainActivityDTO.bargainDetail
                            }
                        }
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else {
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                });
            })
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
seckill.directive('timerBtn', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            remindMe: '=remindMe',
            getData: '&getData'
        },
        template: '<span class="btn btn-danger" ng-disabled="startTime> 0" ng-bind="remindMe == 0 ? showTime+\'后结束\':showTime+\'后结束\'"" ng-click="getData()"></span>',
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
                    return (day >0?((day < 10 ? "0" + day : day) + "天"):"") +(hour >0?((hour < 10 ? "0" + hour : hour) + "时"):"") + (minute < 10 ? "0" + minute : minute) + "分钟" + (second < 10 ? "0" + second : second)+"秒";
                }
            };

            var timer = $interval(function() {
                $scope.startTime -= 1;
                $scope.showTime = formatTime($scope.startTime);
                if($scope.startTime < 1) {
                    $interval.cancel(timer);
                    // location.reload();
                };
            }, 1000);

        }
    };
});
