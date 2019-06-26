var shopingDetail=angular.module('controllers',['ionic']).controller('groupShopingStateCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        'BusinessUtil','$ionicPopup','$ionicPopover', '$ionicSlideBoxDelegate','GetCollageActivityRQCode','Global','$ionicLoading',"$interval",'GetCollageQRCode',
        function ($scope,$rootScope,$stateParams,$state,
                  BusinessUtil,$ionicPopup,$ionicPopover, $ionicSlideBoxDelegate,GetCollageActivityRQCode,Global,$ionicLoading,$interval,GetCollageQRCode) {
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
                GetCollageActivityRQCode.get(function (data) {
                    console.log(data)
                    $ionicLoading.hide();
                    $scope.param.product = data.responseData.collageActivity;
                    $scope.countdown = data.responseData.countdown;
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    $scope.shareList = data.responseData.activityGroup;
                })

                //获取接口的数据
                // $scope.getMes=function(){
                //     $ionicLoading.hide();
                //     $scope.param.product = $scope.items;
                // }
                // $scope.getMes();


                // $interval(function(){
                //     $scope.param.currentIndex =  $ionicSlideBoxDelegate.currentIndex()+1;
                //     $scope.param.totalIndex =  $ionicSlideBoxDelegate.slidesCount();
                // },100);


            });

        }]);

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

