/**
 * Created by Administrator on 2018/3/5.
 */
angular.module('controllers',[]).controller('experienceCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetTrainingProductListNoNeedPay',
        'Global','GetTrainingProductPlayNum','BusinessUtil','LoginGlobal',
        function ($scope,$rootScope,$stateParams,$state,GetTrainingProductListNoNeedPay,
                  Global,GetTrainingProductPlayNum,BusinessUtil,LoginGlobal) {

            $rootScope.title = "";

            $scope.param = {
                trainingProductListNoNeedPay:""
            }

            GetTrainingProductListNoNeedPay.save({pageNo:0,pageSize:100},function (data) {
                if(data.result==Global.SUCCESS)
                {
                    $scope.param.trainingProductListNoNeedPay = data.responseData;
                    angular.forEach($scope.param.trainingProductListNoNeedPay,function(value2,index2){
                        GetTrainingProductPlayNum.get({productId:value2.productId},function (data) {
                            value2.playNum = data.responseData;
                        })
                    })
                    console.log($scope.param.trainingProductListNoNeedPay);
                }
            });

            $scope.courseDetails=function(item){
                BusinessUtil.twoParameters(LoginGlobal.MX_YX_SZDJ,item);
                $state.go("trainingProductLearning",{productId:item})
            }

        }])
