/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyTrainingVideoCtrl',
    ['$scope','$rootScope','$stateParams','$state','BeautyUtil','GetClerkScheduleInfo',
        'GetBeautyShopInfo','Global','SaveUserAppointInfo','GetCurrentLoginUserInfo','$filter','$ionicLoading','$sce',
        function ($scope,$rootScope,$stateParams,$state,BeautyUtil,GetClerkScheduleInfo,
                  GetBeautyShopInfo,Global,SaveUserAppointInfo,GetCurrentLoginUserInfo,$filter,$ionicLoading,$sce) {

        $scope.param = {
                videos : [
                    {
                        name:'用户端操作演示',
                        url:'https://mx-beauty.oss-cn-beijing.aliyuncs.com/%E8%A7%86%E9%A2%91/%E5%94%AF%E7%BE%8E%E5%B8%AE%E2%80%94%E7%94%A8%E6%88%B7%E7%AB%AF%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4'
                    },
                    {
                        name:'老板端操作演示',
                        url:'https://mx-beauty.oss-cn-beijing.aliyuncs.com/%E8%A7%86%E9%A2%91/%E5%94%AF%E7%BE%8E%E5%B8%AE%E2%80%94%E8%80%81%E6%9D%BF%E7%AB%AF%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.MP4'
                    },
                    {
                        name:'pad前台端操作演示',
                        url:'https://mx-beauty.oss-cn-beijing.aliyuncs.com/%E8%A7%86%E9%A2%91/%E5%94%AF%E7%BE%8E%E5%B8%AE%E2%80%94pad%E5%89%8D%E5%8F%B0%E7%AB%AF%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4'
                    },
                    {
                        name:'员工端操作演示',
                        url:'https://mx-beauty.oss-cn-beijing.aliyuncs.com/%E8%A7%86%E9%A2%91/%E5%94%AF%E7%BE%8E%E5%B8%AE%E2%80%94%E5%91%98%E5%B7%A5%E7%AB%AF%E6%93%8D%E4%BD%9C%E6%BC%94%E7%A4%BA.mp4'
                    }
            ]
        }

        angular.forEach($scope.param.videos,function (val,index) {
            val.url = angular.copy($sce.trustAsResourceUrl(val.url));
        })
}]);
