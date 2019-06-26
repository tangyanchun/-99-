/**
 * Created by Administrator on 2017/12/15.
 */
angular.module('controllers',[]).controller('beautyUserQRCodeCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserQrCode','Global',
        function ($scope,$rootScope,$stateParams,$state,GetUserQrCode,Global) {

            GetUserQrCode.get({},function (data) {
                console.log(data);
                if(data.result==Global.SUCCESS)
                {
                    $scope.userQRCode = data.responseData;
                }
            })

}])