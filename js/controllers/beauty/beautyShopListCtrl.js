/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyShopListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserClientInfo','Global','ChangeUserShop','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetUserClientInfo,Global,ChangeUserShop,$ionicLoading) {
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            $scope.param = {
                currentShopInfo : {},
                otherShopInfo : []
            };

            $rootScope.shopAppointInfo = {
                clerkId : '',
                shopProjectIds:[],
                shopProjectDetail:'',
                appointValue:'',
                chooseWeekDate :"",
                shopUserInfo:{}
            };

            GetUserClientInfo.get(function (data) {
                $ionicLoading.hide();
                if(data.result==Global.SUCCESS)
                {
                    $scope.param.currentShopInfo = data.responseData.currentShop;
                    $scope.param.otherShopInfo = data.responseData.otherShop;
                }
            });
            
            $scope.chooseShop = function (shopId) {
                ChangeUserShop.get({sysShopId:shopId},function (data) {
                    $ionicLoading.hide();
                    if(data.result=Global.SUCCESS)
                    {
                        $state.go("beautyUserCenter");
                    }
                })
            }
            });
}]);