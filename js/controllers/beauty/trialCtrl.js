/**
 * Created by Administrator on 2018/8/14.
 */
angular.module('controllers',[]).controller('trialCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','SaveSpreadCustomerInfo',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,SaveSpreadCustomerInfo) {
            $scope.$on('$ionicView.enter', function() {

                $scope.shopSpreadDTO = {
                    mobile:'',
                    name:'',
                    brand:'',
                    detail:''
                };

                $scope.immediatelyTrial = function () {
                    console.log($scope.shopSpreadDTO)
                    var sMobile = $scope.shopSpreadDTO.mobile
                    if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(sMobile))){
                        alert("不是完整的11位手机号或者正确的手机号前七位");
                        return false;
                    }
                    SaveSpreadCustomerInfo.save({
                        mobile:$scope.shopSpreadDTO.mobile,
                        name:$scope.shopSpreadDTO.name,
                        brand:$scope.shopSpreadDTO.brand,
                        detail:$scope.shopSpreadDTO.detail
                    }, function (data) {
                        console.log(data)
                        alert(data.responseData);
                    })
                }

            })

        }]);