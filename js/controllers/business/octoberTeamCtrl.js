/**
 * Created by Administrator on 2018/3/5.
 */
angular.module('controllers',[]).controller('octoberTeamCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetUserNextLevelStruct','Global','GetOctoberTeamList',
        function ($scope,$rootScope,$stateParams,$state,GetUserNextLevelStruct,Global,GetOctoberTeamList) {

            $rootScope.title = "双十一消费排行榜";

            GetOctoberTeamList.get({startDate:"2018-11-01",endDate:"2018-11-12", size:20},function (data) {
                $scope.rankingsList = data.responseData;
            })


}])