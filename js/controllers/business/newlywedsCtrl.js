/**
 * Created by Administrator on 2018/7/25.
 */
angular.module('controllers',[]).controller('newlywedsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetOfflineProductList','$ionicLoading','Global',
        function ($scope,$rootScope,$stateParams,$state,GetOfflineProductList,$ionicLoading,Global) {
            document.title = '新人专享';
            /*$rootScope.title = "新人专享";*/
            $scope.param={
                productList:{},
                productPrefecture:$stateParams.productPrefecture
            };
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            $scope.enterDetails=function(item){
                $state.go("offlineProductDetail",{productId:item})
            };
            $scope.PageParamDTO ={
                pageNo:0,
                pageSize:100,
                requestData:{
                    productPrefecture: $scope.param.productPrefecture
                }
            };
            GetOfflineProductList.save($scope.PageParamDTO,function(data){
                $ionicLoading.hide();
                if(data.result==Global.SUCCESS&&data.responseData!=null)
                {
                    $scope.param.productList=data.responseData;
                }
            })
            });
        }]);