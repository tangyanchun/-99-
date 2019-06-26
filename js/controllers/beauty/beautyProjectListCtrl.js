/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyProjectListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserClientShopProjectList','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetUserClientShopProjectList,Global,$ionicLoading) {
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
    $scope.confirmProject = function() {
        $state.go("beautyAppoint");
    };

    $scope.chooseProject = function(projectId)
    {
        if($rootScope.shopAppointInfo.shopProjectIds.indexOf(projectId)!=-1)
        {
            var key = 0;
            angular.forEach($rootScope.shopAppointInfo.shopProjectIds,function (val,index) {
                if(val==projectId)
                {
                    $rootScope.shopAppointInfo.shopProjectIds.splice(key,1);
                }
                key++;
            })
        }
        else
        {
            $rootScope.shopAppointInfo.shopProjectIds.push(projectId);
        }
    };
    $scope.param = {
        pageNo : 0,
        pageSize:10,
        shopProjectList : [],
        shopProjectId : $rootScope.shopAppointInfo.shopProjectId
    };
   /*点击项目列表的项目跳转到项目详情页面*/
   $scope.goDetails=function (projectId) {
     $state.go("beautyProjectDetails",{projectId:projectId})
   };
    $scope.doRefresh = function()
    {
        GetUserClientShopProjectList.get({pageNo:$scope.param.pageNo,pageSize:$scope.param.pageSize},function(data){
            $ionicLoading.hide();
            if(data.result==Global.SUCCESS)
            {
                $scope.param.shopProjectList = data.responseData;
            }else if(data.result==Global.PARAM_ERROR){
                alert(data.errorInfo);
                history.go(-1)
            }
            $scope.$broadcast('scroll.refreshComplete');
        });
        $scope.param.pageNo++;
    };

    $scope.doRefresh();
            });

}]);