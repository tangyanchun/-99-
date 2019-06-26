/**
 * Created by Administrator on 2019/6/20.
 */
angular.module('controllers',[]).controller('inviteClassCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetSchoolQRCode','BusinessUtil','$location',
        function ($scope,$rootScope,$stateParams,$state,GetSchoolQRCode,BusinessUtil,$location) {
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
                $scope.param.ctx.drawImage($scope.param.imgs.qrCode, $scope.param.canvas.width*0.7, $scope.param.canvas.height*0.82, $scope.param.canvas.width*0.24, calcHeight($scope.param.imgs.qrCode, $scope.param.canvas.width*0.2));

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
            }

            GetSchoolQRCode.get(function (data) {
                console.log(data);
                $scope.param.weixinShareInfo = data.responseData;
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
                    bg: 'images/meixiangClass/inviteCode.png', //大背景
                    qrCode: $scope.param.weixinShareInfo //.shareCode //二维码
                };

                //载入图片
                drawInto();
            })

        }]);