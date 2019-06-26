/**
 * Created by Administrator on 2018/1/2.
 */
angular.module('controllers',[]).controller('supportBankCtrl',
    ['$scope','$rootScope','$stateParams','$state','BusinessUtil',
        function ($scope,$rootScope,$stateParams,$state,BusinessUtil) {

            $rootScope.title = "支持银行";

        }])