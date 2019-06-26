/**
 * Created by Administrator on 2018/12/24.
 */
angular.module('controllers',[]).controller('listTransactionsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBonusPointsRecordFromUser','BusinessUtil','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetBonusPointsRecordFromUser,BusinessUtil,Global,$ionicLoading) {

            $rootScope.title = "交易列表";
            $scope.param={
                picFlag:false
            };
            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetBonusPointsRecordFromUser.get(function(data){
                    $ionicLoading.hide()
                    BusinessUtil.checkResponseData(data,"listTransactions");
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.punchClock=data.responseData;
                        $scope.param.picFlag=false;
                    }else{
                        $scope.param.picFlag=true;
                    }
                    if(data.responseData.length<=0){
                        $scope.param.picFlag=true;
                    }
                })
            });


        }]);