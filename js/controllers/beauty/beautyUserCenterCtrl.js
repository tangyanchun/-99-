/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyUserCenterCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserClientInfo','Global','GetCurrentLoginUserInfo','BeautyUtil','BeautyLoginOut','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetUserClientInfo,Global,GetCurrentLoginUserInfo,BeautyUtil,BeautyLoginOut,$ionicLoading) {

            $scope.param = {
                currentShopInfo : {}
            };
// debugger
    $.ajax({
        url:"/weixin/beauty/getBeautyConfig",// 跳转到 action
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
                        'scanQRCode'
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

            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetUserClientInfo.get(function (data) {
                    console.log(data);
                    $ionicLoading.hide();
                    BeautyUtil.checkResponseData(data,'beautyUserCenter');
                    if(data.result==Global.SUCCESS) {
                        $scope.param.currentShopInfo = data.responseData.currentShop;
                    }
                });

                GetCurrentLoginUserInfo.get(function (data) {
                    $ionicLoading.hide();
                    BeautyUtil.checkResponseData(data,'beautyUserCenter');
                    if(data.result==Global.SUCCESS){
                        $rootScope.shopAppointInfo.shopUserInfo = data.responseData;
                        console.log($rootScope.shopAppointInfo.shopUserInfo);
                    }
                });

            $scope.chooseProject = function() {
                $state.go("beautyAppoint");
            };

            $scope.userLoginOut = function () {
                BeautyLoginOut.get({},function (data) {
                    alert("退出成功");
                    window.localStorage.removeItem("beautyUserLoginToken");
                    window.localStorage.removeItem("beautyBossLoginToken");
                    window.localStorage.removeItem("beautyClerkLoginToken");
                    $state.go("beautyAppoint")
                })
            };
            });
            $scope.bindBeautyShop = function(){
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = JSON.stringify(res);
                        //var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        alert(result);
                    }
                });
            }

}]);