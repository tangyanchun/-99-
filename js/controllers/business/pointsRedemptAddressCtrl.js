angular.module('controllers',[]).controller('pointsRedemptAddressCtrl',
    ['$scope','$rootScope','$stateParams','$state','AddUserAddress','Global','DeleteUserAddress','GetUserAddressList','FindUserAddressById','BusinessUtil','UpdateUserAddress','$ionicPopup','UpdateBusinessAwardUserRecord','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,AddUserAddress,Global,DeleteUserAddress,GetUserAddressList,FindUserAddressById,BusinessUtil,UpdateUserAddress,$ionicPopup,UpdateBusinessAwardUserRecord,$ionicLoading) {

            //手机号码格式验证
            // var phoneReg=/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|5|6|7|8|9]|147|177)\d{8}$/;
            var phoneReg=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|147|177)\d{8}$/;
            $scope.$on('$ionicView.enter', function(){
                $scope.param = {
                    // editType : $stateParams.type,
                    userAddressInfo :{
                        userName:"",
                        userPhone:"",
                        province:"",
                        city:"",
                        detailAddress:"",
                    }
                };
                $scope.flag=false;
                $scope.businessAwardUserRecord = {
                    id:$stateParams.recordId,
                    userMobile:'',
                    userName:'',
                    userAddress:''
                }
                $scope.$watch(['flag'],function () {
                    /*
                * 防止用户因抽到商品不小心点到返回键，导致没有录入地址信息产生的错误，从而禁止返回键
                * */
                    history.pushState(null, null, document.URL);
                    window.addEventListener('popstate', function () {
                        history.pushState(null, null, document.URL);
                        if(!$scope.flag){
                            alert('请填写信息，确保您可以收到抽奖的商品！');
                         }
                    });

                },false)


            $scope.saveAddress = function(){
                $scope.param.userAddressInfo.province=$("#J_Address").val();
                if(phoneReg.test($scope.param.userAddressInfo.userPhone))
                {
                    if($scope.param.userAddressInfo.userName==""||$scope.param.userAddressInfo.detailAddress=="")
                    {
                        var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">请输入收件人姓名或收件人的详细地址</span>',
                            okText:'确定'
                        });
                    }
                    else
                    {
                        $scope.businessAwardUserRecord.userName = $scope.param.userAddressInfo.userName;
                        $scope.businessAwardUserRecord.userMobile = $scope.param.userAddressInfo.userPhone;
                        $scope.businessAwardUserRecord.userAddress = $scope.param.userAddressInfo.province+' '+$scope.param.userAddressInfo.detailAddress;
                        $ionicLoading.show();
                        UpdateBusinessAwardUserRecord.save($scope.businessAwardUserRecord, function(data) {
                                $ionicLoading.hide();
                                $scope.flag=true;
                                if(Global.SUCCESS==data.result)
                                {
                                    alert('地址保存成功！拿着小板凳坐等收货呢！')
                                    $state.go('beans');
                                }
                            });

                        }
                }
                else
                {
                    var alertPopup = $ionicPopup.alert({
                        template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">手机号格式不正确，请重新输入</span>',
                        okText:'确定'
                    });
                }
            };

            });
            !function () {
                var $target = $('#J_Address');
                $target.citySelect();
                console.log( $target.citySelect);
                $target.on('click', function (event) {
                    event.stopPropagation();
                    $target.citySelect('open');
                });
                $target.on('done.ydui.cityselect', function (ret) {
                    $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
                });
            }();

        }]);