/**
 * Created by Administrator on 2018/10/8.
 */
angular.module('controllers',[]).controller('joinCutPriceCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetBargainActivityRQCode','$ionicSlideBoxDelegate','GetCollageQRCode',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetBargainActivityRQCode,$ionicSlideBoxDelegate,GetCollageQRCode) {
           $scope.orderId=$stateParams.orderId;
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetBargainActivityRQCode.get({orderId:$scope.orderId},function (data) {
                    $ionicLoading.hide();
                    $scope.product=data.responseData;
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    GetCollageQRCode.get({info:data.responseData.qrcode},function (data) {
                        $scope.userQRCode = data.responseData;
                    })
                })
            });

        }]);
