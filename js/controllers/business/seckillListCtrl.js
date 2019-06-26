var seckill = angular.module('controllers',[]).controller('seckillListCtrl',
    ['$scope','$window','$rootScope','$stateParams','$state','SeckillList','$ionicLoading',
        function ($scope,$window,$rootScope,$stateParams,$state,SeckillList,$ionicLoading) {
            $rootScope.title = "秒杀专区";
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param={
                    checkType:"1"
                };
                $scope.PageParamVoDTO ={
                    pageNo:$scope.pageNo,
                    pageSize:100
                };
                SeckillList.save($scope.PageParamVoDTO,function (data) {
                    $ionicLoading.hide();
                    $scope.seckillList = data.responseData.responseData;
                    console.log(  $scope.seckillList )
                });
                $scope.checkType=function (index) {
                    $scope.param.checkType=index

                };
                $scope.seckillInfo = function (item) {
                    if(item.status == 0 || item.status == 1){
                        $state.go("seckillInfo",{id:item.fieldId});
                    }else if(item.status == 2 || item.status == 3){
                        alert("亲，本轮秒杀已结束，下次敬请期待！");
                    }
                }
            });
        }]);

seckill.directive('timerBtn', function() { // 倒计时按钮
    return {
        restrict: 'A',
        replace: true,
        scope: {
            startTime: '=startTime',
            remindMe: '=remindMe',
            getData: '&getData'
        },
        template: '<span class="btn btn-danger" ng-disabled="startTime> 0" ng-bind="remindMe == 0 ? \'距离活动结束还剩:\' +showTime : \'距离活动开始还剩:\' +showTime " ng-click="getData()"></span>',
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
                    return  (day >0?((day < 10 ? "0" + day : day) + "天"):"") + (hour >0?((hour < 10 ? "0" + hour : hour) + "小时"):"") + (minute < 10 ? "0" + minute : minute) + "分钟" + (second < 10 ? "0" + second : second)+"秒";
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

        }
    };
});