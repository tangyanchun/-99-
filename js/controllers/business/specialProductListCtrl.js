angular.module('controllers',[]).controller('specialProductListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBusinessProductInfo','Global',
        'GetSpecialProductList','$ionicLoading','LoginGlobal','BusinessUtil','GetSpecialShopInfo',
        function ($scope,$rootScope,$stateParams,$state,GetBusinessProductInfo,Global,
                  GetSpecialProductList,$ionicLoading,LoginGlobal,BusinessUtil,GetSpecialShopInfo) {

            $rootScope.title = "唯11跨境店";
            $rootScope.specialShopId = $stateParams.specialShopId;

            $scope.param = {
                specialProductList : [],
                specialShopId : $stateParams.specialShopId,
                specialShopInfo : {},
                checkType:"0"
            };
            /*点击底部切换按钮更改背景色 字体*/
            $scope.checkBg=function (checkType) {
                $scope.param.checkType=checkType;
            };

            $scope.enterSpecialProductDetails = function(item2){
                BusinessUtil.twoParameters(LoginGlobal.MX_SC_ADJ,item2);
                $state.go("offlineProductDetail",{productId:item2})
            };

            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                /*底部切换初始默认为首页*/
                $scope.param.checkType="0";
                GetSpecialShopInfo.get({specialShopId:$scope.param.specialShopId},function(data){
                    if(data.result==Global.SUCCESS)
                    {
                        $scope.param.specialShopInfo = data.responseData;
                    }
                });

                GetSpecialProductList.save({pageNo:0,pageSize:100},function(data){
                    $ionicLoading.hide();
                    if(data.result==Global.SUCCESS)
                    {
                        $scope.param.specialProductList = data.responseData;
                    }
                })
            });
            /*点击input框跳转到搜索页面*/
            $scope.search=function () {
                $state.go("searchSpecial")
            };

}])