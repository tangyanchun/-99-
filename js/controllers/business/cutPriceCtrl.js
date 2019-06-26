/**
 * Created by Administrator on 2018/9/20.
 */
angular.module('controllers',[]).controller('cutPriceCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetBargainProductList','Global','GetUserOrderByBargain','$ionicPopup','IsLogin','$timeout','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetBargainProductList,Global,GetUserOrderByBargain,$ionicPopup,IsLogin,$timeout,BusinessUtil) {
            $rootScope.title = "砍价专区";
           $scope.param={
                   checkType:"0",
                   productPrefecture:$stateParams.productPrefecture
           };
            $scope.checkBg=function (checkType) {
                $scope.param.checkType=checkType;
            };
            $scope.enterDetails=function(item,item2){
                GetUserOrderByBargain.get({bargainId:item},function (data) {
                 if(data.result=="0x00002"){
                        BusinessUtil.checkResponseData(data,'cutPrice/9');
                        return
                 }else if(data.result==Global.SUCCESS){
                        $state.go("cutDetails",{id:item,productId:item2})
                 }else if(data.result==Global.PARAM_ERROR){
                    alert("商品限购，请购买其他商品");
                 }else if(data.result=="0x00010"){
                     alert("当前商品未支付，请到订单列表进行支付");
                 }else{
                        var alertPopup = $ionicPopup.alert({
                            title:'<p style="font-size: 0.3rem;color: #333333;">提示</p>',
                            template: '<div style="font-size: 0.3rem;color: #333333;">当前商品砍价中，快去我的砍价中查看</div>',
                            buttons: [
                                {
                                    text: '否'
                                },
                                {
                                    onTap: function() {
                                        $state.go("myCut")
                                    },
                                    text: '是',
                                    type: 'button-assertive'
                                }
                            ]

                        });
                    }
                })
            };
            $scope.$on('$ionicView.enter', function(){
                    /*底部切换初始默认为首页*/
                $scope.param.checkType="0";
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.PageParamDTO ={
                    pageNo:1,
                    pageSize:100,
                    requestData:{
                        productPrefecture:$scope.param.productPrefecture,
                        activityStatus:1
                    }
                };
                GetBargainProductList.save($scope.PageParamDTO,function(data){

                    if(data.result==Global.SUCCESS&&data.responseData!=null)
                    {
                        $ionicLoading.hide();
                        $scope.param.productList=data.responseData.responseData;
                        for(var i=0;i<$scope.param.productList.length;i++){
                            var thisTime = $scope.param.productList[i].endTime.replace(/-/g, '/');
                            var time = new Date(thisTime);
                            time = time.getTime();
                            var timestamp = (new Date()).getTime();
                            $scope.param.productList[i].overTime= (time-timestamp)/1000
                        }
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else {
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                });
            });
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
        }]).directive('timerBtn', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            remindMe: '=remindMe',
            getData: '&getData'
        },
        template: '<span class="btn btn-danger" ng-disabled="startTime> 0" ng-bind="remindMe == 0 ? \'距离结束:\'+showTime:\'距离结束:\'+showTime"" ng-click="getData()"></span>',
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
                    return (((hour + day*24) >0?(((hour + day*24) < 10 ? "0" + (hour + day*24) : (hour + day*24)) + " : "):"") + (minute < 10 ? "0" + minute : minute) + " : " + (second < 10 ? "0" + second : second))
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