/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyUserAppointCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetMyAppointInfoList','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetMyAppointInfoList,$ionicLoading) {
        $scope.param = {
            type:'onGoing',
            appointProjectList : []
        };
        
        $scope.selectAppointProject = function(type) {
            $scope.param.type = type;
            if(type=='onGoing')
            {
                GetMyAppointInfoList.get({status:'5'},function (data) {
                    $scope.param.appointProjectList = angular.copy(data.responseData);
                })
            }
            else if(type=='finish')
            {
                GetMyAppointInfoList.get({status:'6'},function (data) {
                    $scope.param.appointProjectList = angular.copy(data.responseData);
                })
            }
        };

        $scope.selectAppointProject($scope.param.type);

        $scope.goAppointDetail = function (appointId) {
            $state.go("beautyUserAppointDetail",{appointId:appointId});
        }


}]);