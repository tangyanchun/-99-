/**
 * Created by Administrator on 2018/3/1.
 */
angular.module('controllers',[]).controller('rechargeCtrl',
    ['$scope','$rootScope','$stateParams','$state','CreateBusinessOrder','PutNeedPayOrderListToRedis','GetUserInfo','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,CreateBusinessOrder,PutNeedPayOrderListToRedis,GetUserInfo,BusinessUtil) {

            $rootScope.title = "充值";

            $scope.type ="recharge";
            $scope.money=100;

            $scope.productType = "recharge";
            $scope.logintoken = window.localStorage.getItem("logintoken");

            $scope.orderPayInit = function(){

                var timestamp;//时间戳
                var nonceStr;//随机字符串
                var signature;//得到的签名
                var appid;//得到的签名

                $.ajax({
                    url:"/weixin/customer/getConfig",// 跳转到 action
                    async:true,
                    type:'get',
                    data:{url:location.href.split('#')[0]},//得到需要分享页面的url
                    cache:false,
                    dataType:'json',
                    success:function(data) {
                        var configValue = data.responseData;
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
                                    'chooseWXPay'
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

            };
            var moneyArry=[100,300,500,1000,5000,10000];
            var swiper = new Swiper('.swiper-container', {
                slidesPerView : 1,
                slidesPerGroup : 1,
                spaceBetween : 20,
                on: { slideChangeTransitionEnd: function(){
                    checkMoney(moneyArry[this.activeIndex]);
                    $scope.money=moneyArry[this.activeIndex]
                }
                    , },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                     renderBullet: function (index, className) { switch(index){ case 0:text='100';break; case 1:text='300';break; case 2:text='500';break; case 3:text='1000';break; case 4:text='5000';break;case 5:text='10000';break; } return '<span  onclick="checkMoney('+text+')" class="' + className + '">' + text + '元</span>'; },
                },

            });

            $scope.$on('$ionicView.enter', function(){
                GetUserInfo.save(function (data) {
                    BusinessUtil.checkResponseData(data,'recharge');
                })

                $scope.orderPayInit();
                $("#amount").val();
            });
             checkMoney = function (text) {
                 $('.transmit').html(' 需支付'+text+'元')
                 $scope.money=text;
             };
            checkMoney(100);

            $scope.payAccount = function(){
                    //先将此商品生成订单
                    CreateBusinessOrder.save({businessProductId:"20180830-chongzhi",
                        productSpec:"储值账户充值",
                        businessProductNum: "1",
                        type:"recharge",
                        businessProductPrice:$scope.money/1
                        },function (data) {
                       // BusinessUtil.checkResponseData(data,'offlineProductDetail&'+"20180830-chongzhi");
                        if(data.result=="0x00002")
                        {
                            showToast("交易失败");
                        }
                        else
                        {
                            //生成订单后再直接前往支付页面
                            var needPayOrderList = [];
                            var payOrder = {
                                orderId:data.responseData,
                                productFirstUrl:"chongzhi",
                                productId:"20180830-chongzhi",
                                productName:"充值",
                                productNum:"1",
                                productPrice:$scope.money/1,
                                productSpec:"储值账户充值"
                            };
                            needPayOrderList.push(payOrder);

                            //将needPayOrderList数据放入后台list中
                            PutNeedPayOrderListToRedis.save({needPayOrderList:needPayOrderList},function(data){
                                if(data.result=="0x00001")
                                {
                                    window.location.href = "orderPay.do?productType=" + $scope.productType + "&random="+Math.random();
                                }else if(data.result=="0x00002"){
                                    alert("充值失败");
                                }

                            })
                        }
                    })
                }

            $scope.goRechargeAccount = function () {
                $state.go("rechargeAccountB");
            }
        }])
