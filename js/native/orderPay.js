var receiveOrderAddressId = "";
var productType = "";
var bonusActivityId = "";
var loginttoken = window.localStorage.getItem("logintoken");
var buyOrderAddressId = window.localStorage.getItem("buyOrderAddressId");
var orderIds = [];
var trainingProductId = "";
var field = "";
var specialShopId = "";
var orderIdForPay ={};
var returnMoney = 0;
var orderType = "normal";

var GetQueryString = function(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var orderPayInit = function(){

    var timestamp;//时间戳
    var nonceStr;//随机字符串
    var signature;//得到的签名
    var appid;//得到的签名
    $("#wxPay").attr("checked","checked");//选中
    //控制充值卡支付是否显示
    if(GetQueryString("productType") == "recharge"){
        $("#rechargeDiv").hide()
    }

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

    productType = GetQueryString("productType");
    specialShopId = GetQueryString("specialShopId");
    bonusActivityId = GetQueryString("specialShopId");

    if(productType=='offline'||productType=='special' ||productType=='seckill' ||productType=='collage'||productType=='bargain' ||productType=='bonus')
    {
        var userAddressInfo = {};
        var needPayOrderList = {};
        //通过ajax接口来获取用户的信息，包括用户名，手机号，和收货地址
        if(buyOrderAddressId!=undefined||buyOrderAddressId!=null)
        {
            receiveOrderAddressId = buyOrderAddressId;
            $.ajax({
                url:"/business/transaction/getUserAddressUsedInfoByAddressId",// 跳转到 action
                beforeSend: function(request) {
                    request.setRequestHeader("logintoken", loginttoken);
                },
                async:true,
                type:'get',
                data:{addressId:receiveOrderAddressId},
                cache:false,
                success:function(data) {

                    if(data.errorInfo=='0x00006')
                    {
                        //没有登录，先去登录页
                        window.location.href = "#/login/" + "shopHome";
                    }
                    else
                    {
                        userAddressInfo = data.responseData;
                        var userAddressInfoHtml = '<div onclick="addressManagement()"><ion class="ion ion-location" style="position:absolute;margin-top:8px;font-size:1.5rem;"></ion>' +
                            '<div style="margin-left:20px"> ' +
                            '<p style="font-size: 14px;color: #333333">收货人：'+ userAddressInfo.userName +'<span style="float:right;margin-right:0.4rem;font-size: 14px;color: #333333">'+userAddressInfo.userPhone+'</span></p> ' +
                            '<ion class="ion ion-ios-arrow-right item-note" style="font-size: 20px"></ion> ' +
                            '<p style="margin-top: 18px;font-size: 14px;color: #333333">'+userAddressInfo.province + userAddressInfo.city +userAddressInfo.detailAddress+'</p> </div></div>'
                        $('#userAddressInfo').html(userAddressInfoHtml);
                        receiveOrderAddressId = userAddressInfo.id;
                        window.localStorage.removeItem("buyOrderAddressId");
                    }
                },
                error : function() {
                }
            });

        }else
        {
            $.ajax({
                url:"/business/transaction/userAddressUsedInfo",// 跳转到 action
                beforeSend: function(request) {
                    request.setRequestHeader("logintoken", loginttoken);
                },
                async:true,
                type:'get',
                data:'',
                cache:false,
                success:function(data) {

                    if(data.errorInfo=='0x00006')
                    {
                        //没有登录，先去登录页
                        window.location.href = "#/login/" + "shopHome";
                    }
                    else
                    {
                        if(data.result=="0x00011"||data.responseData.userName==undefined)//用户还没有任何收获地址信息
                        {
                            userAddressInfo = data.responseData;
                            var userAddressInfoHtml = '<div onclick="addressManagement()" style="height:70px"><center> <h1 style="background: red;font-size: 18px;width: 30rem;color: white;">' +
                                '您没有选中任何收获地址信息</h1> </center> <i class="ion ion-ios-arrow-right" style="float: right;margin-top: -18px;"></i></div>'
                            $('#userAddressInfo').html(userAddressInfoHtml);

                        }
                        else
                        {
                            userAddressInfo = data.responseData;
                            var userAddressInfoHtml = '<div onclick="addressManagement()"><ion class="ion ion-location" style="position:absolute;margin-top:8px;font-size:1.5rem;"></ion>' +
                                '<div style="margin-left:20px"> ' +
                                '<p style="font-size: 14px;color: #333333">收货人：'+ userAddressInfo.userName +'<span style="float:right;margin-right:0.4rem;font-size: 14px;color: #333333">'+userAddressInfo.userPhone+'</span></p> ' +
                                '<ion class="ion ion-ios-arrow-right item-note" style="font-size: 20px"></ion> ' +
                                '<p style="margin-top: 18px;font-size: 14px;color: #333333">'+userAddressInfo.province + userAddressInfo.city +userAddressInfo.detailAddress+'</p> </div></div>'
                            $('#userAddressInfo').html(userAddressInfoHtml);
                            receiveOrderAddressId = userAddressInfo.id;
                        }
                    }
                },
                error : function() {
                }
            });

        }

        //通过ajax接口，获取用户的已选择订单的数据
        $.ajax({
            url:"/business/transaction/getNeedPayOrderListToRedis",// 跳转到 action
            beforeSend: function(request) {
                request.setRequestHeader("logintoken", loginttoken);
            },
            async:true,
            type:'get',
            data:'',
            cache:false,
            success:function(data) {
                needPayOrderList = data.responseData.needPayOrderList;
                orderIdForPay = data.responseData.needPayOrderList;
                if(data.errorInfo=='0x00006')
                {
                    window.location.href = "#/login/" + "businessOrderPay";
                }
                else
                {
                    var totalPrice = 0;

                    if(data.result=='0x00002')
                    {
                        //加载提示页
                    }
                    else if(data.result=='0x00001')
                    {

                        $.ajax({
                            url:"/business/transaction/getDiscountMoney",// 跳转到 action
                            beforeSend: function(request) {
                                request.setRequestHeader("logintoken", loginttoken);
                            },
                            async:true,
                            type:'get',
                            data:'',
                            cache:false,
                            success:function(data) {
                                if(data.responseData == null){
                                    returnMoney = 0
                                }else{
                                    returnMoney = data.responseData.returnMoney
                                }
                                var needPayOrderListHtml = "";

                                //---------------------------------积分抵扣逻辑-----------------------------
                                var bonusActivityInfo = "";
                                if(productType == 'bonus'){
                                    $.ajax({
                                        url:"/business/bonus/product/getBonusActivityDetail",// 跳转到 action
                                        async:true,
                                        type:'get',
                                        data:{id:specialShopId},
                                        cache:false,
                                        dataType:'json',
                                        success:function(data) {
                                            bonusActivityInfo = data.responseData
                                            $.each(needPayOrderList,function(index,value){
                                                needPayOrderListHtml = needPayOrderListHtml +
                                                    '<div class="list" style="margin-top:5px;margin-left:-1rem"> ' +
                                                    '<div class="item item-avatar" style="min-height:2.5rem"> ' +
                                                    '<img src="' + value.productFirstUrl +'"style="width: 1.92rem;height: 1.92rem;border-radius: 0;margin-left: 1.2rem; min-height: 6rem; min-width: 6rem;"> ' +
                                                    '<div style="margin-left:48px"> <p style="margin-left:1.5rem;font-size: 15px;color: #333333">'+ value.productName +'</p>' +
                                                    ' <p style="margin-left:1.5rem;color: #b2b2b2;;margin-top: 10px">' + value.productSpec + '</p> <br> <br>' +
                                                    ' <p style="margin-left:1.2rem;font-size:1.2rem;color: #ff4a59"> ￥'+ value.productPrice +'<span style="color:#333333;float: right;font-size:15px">X'+ value.productNum +'</span> </p>' +
                                                    ' </div> </div> <p class="item"><span style="margin-left:1rem;font-size: 15px;color: #000033">运费</span><span style="float:right;font-size: 15px;color: #333333">快递：￥0</span></p> ' +
                                                    '<p class="item"> <span style="float: right;font-size: 13px;color: #333333">共' + value.productNum +'件商品 小计：<span style="font-size:15px;color:#ff4a59;letter-spacing: 2px">' +
                                                    '￥'+ (parseFloat(value.productNum)*parseFloat(bonusActivityInfo.favorablePrice)).toFixed(2)+"使用享豆："+(parseFloat(value.productNum)*parseFloat(bonusActivityInfo.bonusPointsNum))+'</span> </span> </p> ' +
                                                    '</div>';
                                            })
                                            $('#needPayOrderList').html(needPayOrderListHtml);
                                        },

                                    });

                                }else{
                                    $.each(needPayOrderList,function(index,value){
                                        needPayOrderListHtml = needPayOrderListHtml +
                                            '<div class="list" style="margin-top:5px;margin-left:-1rem"> ' +
                                            '<div class="item item-avatar" style="min-height:2.5rem"> ' +
                                            '<img src="' + value.productFirstUrl +'"style="width: 1.92rem;height: 1.92rem;border-radius: 0;margin-left: 1.2rem; min-height: 6rem; min-width: 6rem;"> ' +
                                            '<div style="margin-left:48px"> <p style="margin-left:1.5rem;font-size: 15px;color: #333333">'+ value.productName +'</p>' +
                                            ' <p style="margin-left:1.5rem;color: #b2b2b2;;margin-top: 10px">' + value.productSpec + '</p> <br> <br>' +
                                            ' <p style="margin-left:1.2rem;font-size:1.2rem;color: #ff4a59"> ￥'+ value.productPrice +'<span style="color:#333333;float: right;font-size:15px">X'+ value.productNum +'</span> </p>' +
                                            ' </div> </div> <p class="item"><span style="margin-left:1rem;font-size: 15px;color: #000033">运费</span><span style="float:right;font-size: 15px;color: #333333">快递：￥0</span></p> ' +
                                            '<p class="item"> <span style="float: right;font-size: 13px;color: #333333">共' + value.productNum +'件商品 小计：<span style="font-size:20px;color:#ff4a59">' +
                                            '￥'+ (parseFloat(value.productNum)*parseFloat(value.productPrice)).toFixed(2)+'</span> </span> </p> ' +
                                            '</div>';
                                    })
                                    $('#needPayOrderList').html(needPayOrderListHtml);
                                }


                                $.each(needPayOrderList,function(index,value){
                                    totalPrice = totalPrice + (value.productNum/1)*(value.productPrice/1);
                                    trainingProductId = value.productId;
                                    orderIds.push(needPayOrderList[index].orderId);
                                });
                                var sumPrice = (totalPrice/1-returnMoney/1).toFixed(2);
                              /*  if(sumPrice>=380){
                                   var threeNightHtml='<div><p class="item" style="font-size: 15px;color: #000033">备注(请选择赠品)</p>' +
                                       '<ul class="item" style="display: flex;flex-wrap: wrap;justify-content: space-between"><li ><input type="radio" value="唇釉套盒" name="gender" style="width: 15px;height: 15px" checked="checked" id="0"/><label for="0" style="margin-left: 6px">唇釉套盒</label></li><li ><input type="radio" value="蜂蜜果冻" name="gender"  style="width: 15px;height: 15px" id="1"/><label for="1" style="margin-left: 6px">蜂蜜果冻</label></li><li ><input type="radio" value="纳米喷雾" name="gender" style="width: 15px;height: 15px" id="3"/><label for="3" style="margin-left: 6px">纳米喷雾</label></li></ul></div>';
                                    $("#threeNight").html(threeNightHtml)
                                }*/
                                var returnMoneyHtml = '<p class="item"><span style="font-size: 15px;color: #000033">折扣</span><span style="float:right;font-size: 15px;color: #333333">￥'+returnMoney+'</span></p>'
                                $('#returnMoney').html(returnMoneyHtml);
                                var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ sumPrice+""  +'</span>';
                                $('#totalPrice').html(totalPriceHtml);

                                totalPayPrice = sumPrice;
                                console.log("get total need pay price"+sumPrice);

                                //判断是否是活动类型的订单，拼团，秒杀，砍价
                                console.log(needPayOrderList);
                                var orderId = needPayOrderList[0].orderId;
                                $.ajax({
                                    url:"/business/transaction/getOrderTypeByTransactionId",// 跳转到 action
                                    beforeSend: function(request) {
                                        request.setRequestHeader("logintoken", loginttoken);
                                    },
                                    async:true,
                                    type:'get',
                                    data:'',
                                    data:{orderId:orderId},
                                    cache:false,
                                    success:function(data) {
                                        if(data.result=='0x00001')
                                        {
                                            orderType = data.responseData;
                                            console.log(orderType);
                                            if(orderType=='normal')
                                            {
                                                $.ajax({
                                                    url:"/business/transaction/getBonusPointsCutMoney",// 跳转到 action
                                                    beforeSend: function(request) {
                                                        request.setRequestHeader("logintoken", loginttoken);
                                                    },
                                                    async:true,
                                                    type:'get',
                                                    data:'',
                                                    data:{sumPrice:sumPrice},
                                                    cache:false,
                                                    success:function(data) {
                                                        if(data.result=='0x00001')
                                                        {
                                                            var bonusPointsPayHtml = '<label class="item item-radio" onclick="chooseBonusPointsPay()">\n' +
                                                                '<input type="checkbox" name="payType" value="0" id="bonusPointsPay">\n' +
                                                                '<div class="radio-content">\n' +
                                                                '<div class="item-content" style="width:100%;white-space:normal;word-break:break-all;word-wrap:break-word">\n' +
                                                                '<i class="icon ion-ribbon-a" style="width:1rem;height:1rem;display:inline-block"></i> &nbsp;&nbsp;\n' +
                                                                '您购买此商品可以使用'+data.responseData+'享豆，抵扣'+data.responseData/100+'元，<span style="color: red">请点击勾选使用</span>\n' +
                                                                '</div>\n' +
                                                                '<i class="radio-icon ion-checkmark"></i>\n' +
                                                                '</div>\n' +
                                                                '</label>'
                                                            $('#bonusPoints').html(bonusPointsPayHtml);
                                                            bonusPointsCutPrice = data.responseData/100;
                                                        }
                                                    }})
                                            }
                                        }
                                    }})

                            }})
                    }


                }
            },
            error : function() {
            }
        });
    }
    else if(productType=='trainingProduct'||productType=='recharge')
    {
        $("#invoiceBox").hide();
        var needPayOrderList = {};
        //通过ajax接口，获取用户的已选择订单的数据
        $.ajax({
            url:"/business/transaction/getNeedPayOrderListToRedis",// 跳转到 action
            beforeSend: function(request) {
                request.setRequestHeader("logintoken", loginttoken);
            },
            async:true,
            type:'get',
            data:'',
            cache:false,
            success:function(data) {
                if(data.errorInfo=='0x00006')
                {
                    window.location.href = "#/login/" + "businessOrderPay";
                }
                else
                {
                    var totalPrice = 0;

                    if(data.result=='0x00002')
                    {
                        //加载提示页
                    }
                    else if(data.result=='0x00001')
                    {
                        needPayOrderList = data.responseData.needPayOrderList;
                        var needPayOrderListHtml = "";
                        $.each(needPayOrderList,function(index,value){
                            if(productType=='recharge'){
                                needPayOrderListHtml = needPayOrderListHtml +
                                '<div class="list" style="margin-top:5px;margin-left:-1rem"> ' +
                                '<div class="item item-avatar" style="min-height:2.5rem"> ' +
                                '<div style="margin-left:48px"> <p style="margin-left: -70px;color: #333333;font-size: 15px;">'+ value.productName +'</p>' +
                                ' <p style="margin-left: -4.5rem;color: #b2b2b2;margin-top: 10px;">' + value.productSpec + '</p> <br> <br>' +
                                ' <p style="margin-left: -4.5rem;font-size:1.2rem;color: #ff4a59;"> ￥'+ value.productPrice +'</p>' +
                                ' </div> </div>'+
                                '<p class="item"> <span style="float: right;font-size: 13px;color: #333333">小计：<span style="font-size:20px;color:#ff4a59">' +
                                '￥'+ value.productPrice +'</span> </span> </p> </div>';
                            }else{
                                 needPayOrderListHtml = needPayOrderListHtml +
                                '<div class="list" style="margin-top:5px;margin-left:-1rem"> ' +
                                '<div class="item item-avatar" style="min-height:2.5rem"> ' +
                                '<img src="' + value.productFirstUrl +'"style="width: 1.92rem;height: 1.92rem;border-radius: 0;margin-left: 1.2rem; min-height: 6rem; min-width: 6rem;"> ' +
                                '<div style="margin-left:48px"> <p style="margin-left:1.5rem;color: #333333;font-size: 15px">'+ value.productName +'</p>' +
                                ' <p style="margin-left:1.5rem;color: #b2b2b2;margin-top: 10px">' + value.productSpec + '</p> <br> <br>' +
                                ' <p style="margin-left:1.2rem;font-size:1.2rem;color: #ff4a59"> ￥'+ value.productPrice +'<span style="color:#333333;float: right;font-size: 15px;">X'+ value.productNum +'</span> </p>' +
                                ' </div> </div> <p class="item"><span style="margin-left:1rem;font-size: 15px;color: #000033">运费</span><span style="float:right;font-size: 15px;color: #333333">快递：￥0</span></p> ' +
                                '<p class="item"> <span style="float: right;font-size: 13px;color: #333333">共' + value.productNum +'件商品 小计：<span style="font-size:20px;color:#ff4a59">' +
                                '￥'+ value.productPrice +'</span> </span> </p> </div>';
                            }

                        })
                        $('#needPayOrderList').html(needPayOrderListHtml);

                        $.each(needPayOrderList,function(index,value){
                            totalPrice = value.productPrice;
                            trainingProductId = value.productId;
                        })
                    }
                    sumPrice = totalPrice
                    var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ totalPrice  +'</span>';
                    $('#totalPrice').html(totalPriceHtml);
                }
            },
            error : function() {
            }
        });
    }

}
var sumPrice;
var payType;
var balance;
var rechargePay = function () {

    if(orderType=="normal")
    {
        var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ totalPayPrice +""  +'</span>';
        $('#totalPrice').html(totalPriceHtml);
        $('#bonusPoints').html('');
        finallyBonusPointsCutPrice = 0;
    }

    //获取用户的充值卡金额
    $.ajax({
        url:"/business/account/getUserRechargeAccountDetail",
        beforeSend: function(request) {
            request.setRequestHeader("logintoken", loginttoken);
        },
        async:true,
        type:'get',
        data:'',
        cache:false,
        success:function(data) {
            balance = data.responseData.balance
            if(Number(balance)<Number(sumPrice)){
                alert("对不起，你的储值卡余额为"+balance+"元，请选择微信支付")
                $("#rechargePay").removeAttr("checked")
                $("#wxPay").prop("checked", "checked")
            }
        }
    });
}

var wxPay = function () {

    if(orderType=="normal")
    {
        if(bonusPointsCutPrice!=undefined)
        {
            var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ totalPayPrice +""  +'</span>';
            $('#totalPrice').html(totalPriceHtml);
            bonusPointsCutFlag = true;
            finallyBonusPointsCutPrice = 0;

            var bonusPointsPayHtml = '<label class="item item-radio" onclick="chooseBonusPointsPay()">\n' +
                '<input type="checkbox" name="payType" value="0" id="bonusPointsPay">\n' +
                '<div class="radio-content">\n' +
                '<div class="item-content" style="width:100%;white-space:normal;word-break:break-all;word-wrap:break-word">\n' +
                '<i class="icon ion-ribbon-a" style="width:1rem;height:1rem;display:inline-block"></i> &nbsp;&nbsp;\n' +
                '您购买此商品可以使用'+bonusPointsCutPrice*100+'享豆，抵扣'+bonusPointsCutPrice+'元，<span style="color: red">请点击勾选使用</span>\n' +
                '</div>\n' +
                '<i class="radio-icon ion-checkmark"></i>\n' +
                '</div>\n' +
                '</label>'
            $('#bonusPoints').html(bonusPointsPayHtml);
        }
    }

}

var bonusPointsCutPrice;
var totalPayPrice;
var finallyBonusPointsCutPrice=0;
var bonusPointsCutFlag = true;
var chooseBonusPointsPay = function () {
    if(bonusPointsCutFlag)
    {
        var cutPrice = totalPayPrice-bonusPointsCutPrice;
        cutPrice = Math.round(cutPrice*100)/100
        var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ cutPrice +""  +'</span>';
        $('#totalPrice').html(totalPriceHtml);
        bonusPointsCutFlag = false;
        finallyBonusPointsCutPrice = bonusPointsCutPrice;
    }
    else
    {
        var totalPriceHtml = '<span style="color: #ff4a59;font-size: 16px">￥'+ totalPayPrice +""  +'</span>';
        $('#totalPrice').html(totalPriceHtml);
        bonusPointsCutFlag = true;
        finallyBonusPointsCutPrice = 0;
    }
}

var preConfirmPay = function () {
    payType = $("input[name='payType']:checked").val()
    if("5" == payType){
        $.confirm({
            keyboardEnabled: true,
            content: "你的充值卡余额为"+balance+"元，确认要支付吗？",
            cancel: function(){
            },
            confirm: function(){
                confirmPay();
            }
        });
    }else{
        confirmPay();
    }
}

var confirmPay = function(){

    $('#payButton').attr('disabled',"disabled");//添加disabled属性
    if(receiveOrderAddressId==""&&(productType=='offline'||productType=='special'||productType=='seckill'||productType=='collage'||productType=='bargain'||productType=='bonus' ))
    {
        alert("请先选择收货地址");
    }
    else
    {
        if(productType=='trainingProduct'||productType=='recharge')
        {
            $.ajax({
                url:"/business/transaction/pay/"+productType,// 跳转到 action
                beforeSend: function(request) {
                    request.setRequestHeader("logintoken", loginttoken);
                },
                async:true,
                type:'get',
                data:'',
                cache:false,
                success:function(data) {

                    if(data.result=="0x00001")
                    {
                        var payResult = data.responseData;
                        if(payResult.agent < 5){
                            alert("您的微信版本低于5.0无法使用微信支付");
                            return;
                        }
                        else if(payResult.agent == 6)
                        {
                            alert("支付失败,请重新支付");
                            return;
                        }else if(payResult.agent == 7)
                        {
                            alert("该订单已支付,请到我的预约中进行查看");
                            return;
                        }

                        wx.chooseWXPay({
                            appId:payResult.appId,
                            timestamp:payResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr:payResult.nonceStr,  // 支付签名随机串，不长于 32 位
                            package:payResult.packageData,// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType:payResult.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign:payResult.paySign,  // 支付签名
                            success: function (res) {
                                if(res.errMsg == "chooseWXPay:ok" ) {
                                    //支付成功后， 跳转到支付成功页
                                    if(productType=='offline'||productType=='special'||productType=='bargain')
                                    {
                                        window.location.href = "#/paySuccess";
                                    }else if(productType=='trainingProduct')
                                    {
                                        window.location.href = "#/trainingProductLearning/"+trainingProductId;
                                    }else if(productType=="recharge"){
                                         window.location.href = "#/rechargeAccountB";
                                     }else if(productType=="collage"){
                                        window.location.href = "#/collagePaySuccess";
                                    }
                                }else{
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
                    else
                    {
                        alert("支付失败，请重新支付");
                    }

                },
                error : function() {
                }
            });
        }
        else if(productType=='offline'||productType=='special'||productType=='seckill' || productType=='collage'||productType=='bargain'||productType=='bonus')
        {
            if(productType=='special')
            {
                $("#specialProductInfo").show();
            }else if(productType=='seckill'){
                //检测是否过期
                $.ajax({
                    url:"/business/seckillOrder/cheackSeckillOrder?orderID="+orderIds,// 跳转到 action
                    beforeSend: function(request) {
                        request.setRequestHeader("logintoken", loginttoken);
                    },
                    async:true,
                    type:'get',
                    data:'',
                    cache:false,
                    success:function(data) {
                        if(data.result=="0x00001"){
                            processPay();
                        }else{
                            alert("订单已失效!");
                        }
                    }})
            }
            else
            {
                processPay();
            }
        }
    }
};

var processPay = function(){
    if(null == payType || undefined == payType){
        alert("请选择支付方式");
        return
    }
    //如果是微商城商品，则给订单补充上地址ID
    $.ajax({
        url:"/business/transaction/updateBusinessOrderAddress",// 跳转到 action
        beforeSend: function(request) {
            request.setRequestHeader("logintoken", loginttoken);
        },
        async:true,
        type:'get',
        data:{orderIds:orderIds,orderAddressId:receiveOrderAddressId},
        cache:false,
        success:function(data) {
            if(data.result=="0x00001"){
                
                //活动编号
                if(productType == "bonus"){
                    field = bonusActivityId
                }
               /* var checkGift=$("input[type='radio']:checked").val();*/
                /*订单备注*/
                var reason=$('#reason').val();
                $.ajax({
                    url:"/business/transaction/pay/"+productType,// 跳转到 action
                    beforeSend: function(request) {
                        request.setRequestHeader("logintoken", loginttoken);
                    },
                    async:true,
                    type:'get',
                    data:{payType:payType,bonusPointsCutPrice:finallyBonusPointsCutPrice,field:field,remarks:reason},
                    cache:false,
                    success:function(data) {
                        if(data.result=="0x00001")
                        {
                            var payResult = data.responseData;
                            if(payResult.agent < 5){
                                alert("您的微信版本低于5.0无法使用微信支付");
                                return;
                            }
                            else if(payResult.agent == 6)
                            {
                                alert("支付失败,请重新支付");
                                return;
                            }else if(payResult.agent == 7)
                            {
                                alert("该订单已支付,请到我的预约中进行查看");
                                return;
                            }

                            wx.chooseWXPay({
                                appId:payResult.appId,
                                timestamp:payResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr:payResult.nonceStr,  // 支付签名随机串，不长于 32 位
                                package:payResult.packageData,// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                signType:payResult.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign:payResult.paySign,  // 支付签名
                                success: function (res) {
                                    if(res.errMsg == "chooseWXPay:ok" ) {
                                        //支付成功后， 跳转到支付成功页
                                        if(productType=='offline'||productType=='seckill'||productType=='bargain'||productType=='bonus')
                                        {
                                            window.location.href = "#/paySuccess";
                                        }else if(productType=='trainingProduct')
                                        {
                                            window.location.href = "#/trainingProductLearning/"+trainingProductId;
                                        }else if(productType=="collage"){
                                            window.location.href = "#/collagePaySuccess";
                                        }else if(productType=='special'){
                                            window.location.href = "#/specialMine"
                                        }
                                    }else{
                                        alert("支付失败,请重新支付")
                                    }
                                    $('#payButton').removeAttr("disabled");
                                },
                                cancel:function (res) {
                                    $('#payButton').removeAttr("disabled");

                                },
                                fail: function (res) {
                                    alert(res.errMsg)
                                }
                            });

                        }
                        else if(data.result=="0x00021"){
                            if(productType=='offline'||productType=='seckill'||productType=='bargain' ||productType=='bonus')
                            {
                                window.location.href = "#/paySuccess";
                            }else if(productType=='trainingProduct')
                            {
                                window.location.href = "#/trainingProductLearning/"+trainingProductId;
                            }else if(productType=="collage"){
                                window.location.href = "#/collagePaySuccess";
                            }else if(productType=='special'){
                                window.location.href = "#/specialMine"
                            }
                        }
                        else
                        {
                            alert("支付失败，请重新支付");
                        }
                    },
                    error : function() {
                    }
                });
            }
        },
        error : function() {
        }
    });
}

var url=window.location.search;
$(document).ready(function(){
    if(url.substring(url.length-1)=="a"){
        console.log(1);
        $("input[type='checkbox']").prop("checked",true);
    }
});

//点击复选框跳转页面
var check=function(){
   if($("#checkbox-id").prop("checked")){
       window.location.href="#/invoice/"+orderIds;
   }
}

var addressManagement = function(){
    window.localStorage.setItem("productType",productType);
    window.location.href = "#/addressManagement/orderPay.do";
}

var confirmUserInfo = function(){
    $.ajax({
        url:"/user/customer/queryRealNameAuthentication",// 跳转到 action
        beforeSend: function(request) {
            request.setRequestHeader("logintoken", loginttoken);
        },
        async:true,
        type:'get',
        data:{cardNo:$('#userIdentifyNum').val(),name:$('#userName').val(),orderIds:orderIds,specialShopId:specialShopId},
        cache:false,
        success:function(data) {
            if($('#userName').val()==data.name&&data.result=='匹配')
            {
                $('#specialProductInfo').hide();
                processPay();
            }
            else
            {
                alert("跨境商品收货人的身份证号和姓名不匹配，请重新输入");
            }
        }
    })
}

var cancelUserInfo = function(){
    $('#specialProductInfo').hide();
}
