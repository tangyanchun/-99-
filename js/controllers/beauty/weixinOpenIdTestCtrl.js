/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('weixinOpenIdTestCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopClerkList','Global','BeautyUtil','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetShopClerkList,Global,BeautyUtil,$ionicLoading) {

            $scope.$on('$ionicView.enter', function() {

                window.location.href =
                    "http://mx99test1.kpbeauty.com.cn/weixin/customer/fieldwork/authorTest?" +
                    "url=http://mx99test1.kpbeauty.com.cn/weixin/customer/getUserWeixinMenuId?url=weixinOpenIdTest"

            });

}]);