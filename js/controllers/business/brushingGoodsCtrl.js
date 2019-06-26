/**
 * Created by Administrator on 2018/11/1.
 */
angular.module('controllers',[]).controller('brushingGoodsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetOfflineProductList','$ionicLoading','Global',
        function ($scope,$rootScope,$stateParams,$state,GetOfflineProductList,$ionicLoading,Global) {

            $scope.getInfo=function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.PageParamDTO ={
                    pageNo:0,
                    pageSize:100,
                    orderBy:$scope.param.orderBy,
                    orderType:$scope.param.orderType,
                    requestData:{
                        productPrefecture:$scope.param.productPrefecture
                    }
                };
                GetOfflineProductList.save($scope.PageParamDTO,function(data){

                    if(data.result==Global.SUCCESS&&data.responseData!=null)
                    {
                        $ionicLoading.hide();
                        $scope.param.productList=data.responseData;
                    }
                });
            };

            $scope.$on('$ionicView.enter', function() {
                $scope.param={
                    productList:{},
                    orderBy:"",
                    orderType:"",
                    productPrefecture:10,
                };
                $scope.getInfo();
            });
            /*点击商品 进入商品详情页面*/
            $scope.enterDetails=function(item){
                $state.go("offlineProductDetail",{productId:item})
            };
        }]);