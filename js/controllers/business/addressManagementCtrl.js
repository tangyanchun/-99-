angular.module('controllers',[]).controller('addressManagementCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserAddressList','BusinessUtil','Global','UpdateUserAddress','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetUserAddressList,BusinessUtil,Global,UpdateUserAddress,$ionicLoading) {

            $rootScope.addressManagementRoutePath = $stateParams.routePath;
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.$on('$ionicView.enter', function(){

                GetUserAddressList.get(function(data){
                    $ionicLoading.hide();
                    BusinessUtil.checkResponseData(data,"addressManagement");
                    $scope.userAddressList = data.responseData;
                    if(data.responseData==undefined)
                    {
                        $(".addressNull").show()
                    }else
                    {
                        $(".addressNull").hide()
                    }
                    for(var i=0;i<$scope.userAddressList.length;i++){
                        if($scope.userAddressList[i].status == 1){
                          return
                        }
                    }
                    $scope.setDefault($scope.userAddressList[0])
                });
            });

            $scope.addressEdit = function(type,id){
                $state.go("addressEdit",{type:type,addressId:id});
            }


            $scope.setDefault = function(item){
                item.status="1";
                UpdateUserAddress.save(item, function(data) {
                    if(data.result==Global.SUCCESS)
                    {
                        GetUserAddressList.get(function(data){
                            BusinessUtil.checkResponseData(data,"addressManagement");
                            $scope.userAddressList = data.responseData;
                        });
                    }
                })
            }

            $scope.goBackLastPage = function(addressId)
            {
                window.localStorage.setItem("buyOrderAddressId",addressId);
                window.location.href = "orderPay.do?productType="+window.localStorage.getItem("productType")+"&random="+Math.random();
            }
        }]);