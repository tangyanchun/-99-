/**
 * Created by Administrator on 2018/3/1.
 */
angular.module('controllers',[]).controller('rechargeAccountBCtrl',
    ['$scope','$rootScope','$stateParams','$state','BusinessUtil','GetUserRechargeAccountDetail','GetUserInfoIncome',
        function ($scope,$rootScope,$stateParams,$state,BusinessUtil,GetUserRechargeAccountDetail,GetUserInfoIncome) {

            $rootScope.title = "我的储值账户";

            $scope.param = {
                rechargeAccountDTO:{}
            }

            $scope.balance = 0;

            $scope.recharge = function(){

            }

            $scope.goRechargeAccountRecordList = function(){
                $state.go("rechargeAccountRecordList",{rechargeAccountId:$scope.param.rechargeAccountDTO.id});
            }

            $scope.$on('$ionicView.enter', function(){
                GetUserInfoIncome.get(function(data){
                    BusinessUtil.checkResponseData(data,"shopHome");
                    if(data.responseData!=null){
                         GetUserRechargeAccountDetail.get(function (data) {
                             if(data.result=='0x00001'){
                                 $scope.param.rechargeAccountDTO =data.responseData;
                                 $scope.balance= data.responseData.balance;
                             }
                         });

                    }
                })

            })

        }])
