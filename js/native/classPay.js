var loginttoken = window.localStorage.getItem("logintoken");
/*一进页面初始化*/
var orderPayInit = function () {
    $.ajax({
        url: "/weixin/customer/getConfig",// 跳转到 action
        async: true,
        type: 'get',
        data: {url: location.href.split('#')[0]},//得到需要分享页面的url
        cache: false,
        dataType: 'json',
        success: function (data) {
            var configValue = data.responseData;
            if (configValue != null) {
                timestamp = configValue.timestamp;//得到时间戳
                nonceStr = configValue.nonceStr;//得到随机字符串
                signature = configValue.signature;//得到签名
                appid = configValue.appid;//appid

                //微信配置
                wx.config({
                    debug: false,
                    appId: appid,
                    timestamp: timestamp,
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
            } else {
            }
        },
        error: function () {
        }
    });
}

var preConfirmPay = function () {
    //通过ajax接口
    $.ajax({
        url: "/business/income/getUserInfo",// 跳转到 action
        beforeSend: function (request) {
            request.setRequestHeader("logintoken", loginttoken);
        },
        async: true,
        type: 'get',
        data: '',
        cache: false,
        success: function (data) {
            if (data.errorInfo == '0x00006') {
                //没有登录，先去登录页
                window.location.href = "#/login/" + "classPay";
            } else {
                $.ajax({
                    url: "/business/schoolPay/usePay?price=" + 9.9 + "&classId=" + 1,// 跳转到 action
                    beforeSend: function (request) {
                        request.setRequestHeader("logintoken", loginttoken);
                    },
                    async: true,
                    type: 'get',
                    data: '',
                    cache: false,
                    success: function (data) {

                        if (data.result == "0x00001") {
                            var payResult = data.responseData;
                            if (payResult.agent < 5) {
                                alert("您的微信版本低于5.0无法使用微信支付");
                                return;
                            }
                            else if (payResult.agent == 6) {
                                alert("支付失败,请重新支付");
                                return;
                            } else if (payResult.agent == 7) {
                                alert("该订单已支付,请到我的预约中进行查看");
                                return;
                            }

                            wx.chooseWXPay({
                                appId: payResult.appId,
                                timestamp: payResult.timeStamp,
                                nonceStr: payResult.nonceStr,
                                package: payResult.packageData,
                                signType: payResult.signType,
                                paySign: payResult.paySign,
                                success: function (res) {
                                    if (res.errMsg == "chooseWXPay:ok") {
                                        //支付成功后， 跳转到支付成功页
                                        window.location.href = "#/trainingPaySuccess";
                                    } else {
                                        alert("支付失败,请重新支付")
                                    }
                                    $('#payButton').removeAttr("disabled");
                                },
                                cancel: function (res) {
                                    $('#payButton').removeAttr("disabled");
                                },
                                fail: function (res) {
                                    alert(res.errMsg)
                                }
                            });

                        }
                        else {
                            alert("支付失败，请重新支付");
                        }

                    },
                    error: function () {
                    }
                });
            }
        },
        error: function () {
        }
    })
};