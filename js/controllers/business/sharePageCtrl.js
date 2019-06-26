angular.module('controllers',[]).controller('sharePageCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCustomerQRCode','BusinessUtil','$location',
        function ($scope,$rootScope,$stateParams,$state,GetCustomerQRCode,BusinessUtil,$location) {

            $rootScope.title = "分享赚钱";
            $scope.shareDesc = "一个可以分享赚钱的美妆商城"

            $scope.param = {
                imgs:{},
                weixinShareInfo:{},
                ctx : {},
                mainImg:{},
                canvas:{}
            };

            var calcHeight = function(obj, w)
            {
                return w / obj.width * obj.height;
            };

            //绘制$scope.param.canvas
            var drawImage = function(){
                //背景图
                $scope.param.ctx.drawImage($scope.param.imgs.bg, 0, 0, $scope.param.canvas.width, $scope.param.canvas.height);

                //二维码
                $scope.param.ctx.drawImage($scope.param.imgs.qrCode, $scope.param.canvas.width*0.36, $scope.param.canvas.height*0.78 , $scope.param.canvas.width*0.23, calcHeight($scope.param.imgs.qrCode, $scope.param.canvas.width*0.23));

                //获取base64格式的src
                var imgSrc = $scope.param.canvas.toDataURL('image/jpg');
                $scope.param.mainImg.src = imgSrc;
                $("#canvas").hide();
            }

            var drawInto = function(){
                var imgNum = 0;
                for(var key in $scope.param.imgs){
                    var img = new Image();
                    img.src = $scope.param.imgs[key];
                    $scope.param.imgs[key] = img;
                    $scope.param.imgs[key].onload = function(){
                        imgNum++;
                        if(imgNum == Object.keys($scope.param.imgs).length) drawImage();
                    }
                }
                if($stateParams.reload){
                    $stateParams.reload=false;
                    $state.reload('app.toMenu');
                }
            }

            GetCustomerQRCode.get({userPhone:$stateParams.userPhone},function (data) {
                console.log(data)
                $scope.param.weixinShareInfo = data.responseData;
                $scope.shareDesc =  data.responseData.nickName+"的美享小铺"
                //获取$scope.param.canvas
                $scope.param.canvas = document.getElementById('canvas');

                //设置宽高
                //想获取高清图请*2，一般的直接等于Width就行
                var Height = 1102;
                var Width = 750;

                //$scope.param.canvas绘制需要的对象
                $scope.param.ctx = $scope.param.canvas.getContext("2d");
                $scope.param.canvas.width = Width;
                $scope.param.canvas.height = Height;

                //获取图片
                $scope.param.mainImg = document.getElementById('mainImg');

                //获取图片
                $scope.param.imgs = {
                    bg: 'images/sharePage/bgs.png', //大背景
                    via:  $scope.param.weixinShareInfo.userImage, //'img/people.jpg', //头像
                    qrCode: $scope.param.weixinShareInfo.qrCodeURL //.shareCode //二维码
                };

                //载入图片
                drawInto();
                wx.onMenuShareTimeline({
                    title:  $scope.shareDesc, // 分享标题
                    imgUrl: 'https://mximage.oss-cn-beijing.aliyuncs.com/viewPicture/585854756758332547.jpg', // 分享图标
                    link: $location.absUrl(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    success: function () {
                    }
                })

                wx.onMenuShareAppMessage({
                    title: $scope.shareDesc, // 分享标题
                    desc:  '一个可以分享赚钱的美妆商城', // 分享描述
                    link: $location.absUrl(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://mximage.oss-cn-beijing.aliyuncs.com/viewPicture/585854756758332547.jpg', // 分享图标
                    success: function (res) {
                    },
                    fail: function (res) {
                        alert(res)
                    }
                });
            })

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


        }])