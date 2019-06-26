angular.module('controllers',[]).controller('collagePaySuccessCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCollageActivityRQCode','Global',
        function ($scope,$rootScope,$stateParams,$state,GetCollageActivityRQCode,Global) {
            $scope.flageButton = false;
            GetCollageActivityRQCode.get(function (data) {
                if(data.result==Global.SUCCESS){
                    $scope.flageButton = true;
                }
            })
        }])