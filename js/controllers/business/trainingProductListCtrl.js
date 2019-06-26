angular.module('controllers',[]).controller('trainingProductListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBusinessProductInfo','Global','GetTrainingProductPlayNum',
        'GetTrainingProductListNeedPay','$ionicLoading','LoginGlobal','BusinessUtil','GetTrainingProductListNoNeedPay',
        function ($scope,$rootScope,$stateParams,$state,GetBusinessProductInfo,Global,GetTrainingProductPlayNum,
                  GetTrainingProductListNeedPay,$ionicLoading,LoginGlobal,BusinessUtil,GetTrainingProductListNoNeedPay) {

            $rootScope.title = "美享99产品详情";

            $scope.param = {

                trainingProductListNeedPay:[],
                trainingProduct2NeedPayList:[],
                freeProductDTOList:[],
                memberProductDTOList:[],
                chargeProductDTOList:[]
            };
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.courseDetails=function(item){
                    BusinessUtil.twoParameters(LoginGlobal.MX_YX_SZDJ,item);
                    $state.go("trainingProductLearning",{productId:item})
                }

                GetTrainingProductListNeedPay.save({pageNo:0,pageSize:100},function(data){
                    $ionicLoading.hide();
                    if(data.result==Global.SUCCESS)
                    {
                        $scope.param.freeProductDTOList = data.responseData.freeProductDTOList;
                        $scope.param.memberProductDTOList = data.responseData.memberProductDTOList;
                        $scope.param.chargeProductDTOList = data.responseData.chargeProductDTOList;

                        /*  var partNames = [];
                          angular.forEach($scope.param.trainingProductListNeedPay,function(value1,index1){
                              var same = false;
                              angular.forEach(partNames,function(value2,index){
                                  if(value2==parseInt(value1.price)) {
                                      same = true;
                                  }
                              })
                              if(!same) {
                                  partNames.push(parseInt(value1.price))
                              }
                          })*/
                        /* partNames.sort(function(a,b){return b-a});
 */
                        /* var index=0;
                         angular.forEach(partNames,function (value1,index1) {
                             angular.forEach($scope.param.trainingProductListNeedPay,function(value2,index2){
                                 GetTrainingProductPlayNum.get({productId:value2.productId},function (data) {
                                     value2.playNum = data.responseData;
                                 })
                                 if(value1==parseInt(value2.price)) {
                                     $scope.param.trainingProduct2NeedPayList[index]=value2;
                                 }
                             })
                             index++;
                         })*/
                    }

                })
            });

        }])