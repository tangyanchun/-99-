/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('projectCardDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetProjectCardConsumeByFlowId','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetProjectCardConsumeByFlowId,Global,$ionicLoading) {
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param = {
                    pageSize: 5000,
                    projectCardConsumes: [],
                    picFlag:false/*空白页面的显示*/
                };

                GetProjectCardConsumeByFlowId.get({flowId: $stateParams.projectId, consumeType: "1"}, function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null)
                    {
                        $ionicLoading.hide();
                        $scope.param.projectCardConsumes = data.responseData;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else {
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                })
            })                

}]);