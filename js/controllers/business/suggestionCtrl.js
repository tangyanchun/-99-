angular.module('controllers',[]).controller('suggestionCtrl',
    ['$scope','$rootScope','$stateParams','$state','SuggestionDetail','Global','GetUserInfo','BusinessUtil',"$ionicLoading","$timeout",
        function ($scope,$rootScope,$stateParams,$state,SuggestionDetail,Global,GetUserInfo,BusinessUtil,$ionicLoading,$timeout) {

            $rootScope.title = "意见反馈";
            $scope.param = {
                suggestion:""
            }

            $scope.$on('$ionicView.enter', function(){
                GetUserInfo.get(function (data) {
                    BusinessUtil.checkResponseData(data,'suggestion');
                    $scope.param.userInfo = data.responseData;
                })
            });

           // 提交反馈
           $scope.submit=function(){
               showToask("提交中...");
               console.log($scope.param.suggestion);
               if($scope.param.suggestion!=""){
                    SuggestionDetail.get({suggestion:$scope.param.suggestion},function(data){

                           if(Global.SUCCESS==data.result)
                           {
                               showToask("提交成功");
                               hideToask();

                               $state.go("myselfCenter");
                           }
                       })
               }else{
                    showToask("内容不能为空，请输入建议内容");
                    hideToask();
               }

           };
            var showToask = function (content) {
                $ionicLoading.show({
                    template: content
                });
            }

            var hideToask = function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            };
        }])