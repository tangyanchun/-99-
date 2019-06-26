/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyClerkListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopClerkList','Global','BeautyUtil','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetShopClerkList,Global,BeautyUtil,$ionicLoading) {

            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

            $scope.param = {
                pageNo : 0,
                pageSize:10,
                clerkId:$rootScope.shopAppointInfo.clerkId,
                clerkList : []
            };

            $scope.confirmClerk = function() {
                $state.go("beautyAppoint");
            };

            $scope.chooseClerk = function(clerkId)
            {
                $scope.param.clerkId = angular.copy(clerkId);
                $rootScope.shopAppointInfo.clerkId = $scope.param.clerkId;
            };

            $scope.doRefresh = function()
            {
                GetShopClerkList.get({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize},function(data){
                    $ionicLoading.hide();
                    BeautyUtil.checkResponseData(data,'beautyClerkList');
                    if(data.result==Global.SUCCESS)
                    {
                        $scope.param.clerkList = data.responseData;
                        angular.forEach($scope.param.clerkList,function (value,index,array) {
                            var clerkProgressStyle = {
                                width: value.score +  "%",
                                background : "red",
                                height:"10px"
                            };
                            value.clerkProgressStyle = angular.copy(clerkProgressStyle);
                        })
                    }else{
                        alert("请先绑定店铺，谢谢");
                        history.go(-1)
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                });
                $scope.pageNo++;
            };

            $scope.doRefresh();
            });

}]);