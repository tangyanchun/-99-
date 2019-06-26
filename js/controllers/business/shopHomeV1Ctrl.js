angular.module('controllers',[]).controller('shopHomeV1Ctrl',
    ['$scope','$rootScope','$stateParams','$state','GetHomeBannerList','GetOfflineProductList','$ionicSlideBoxDelegate',
        '$ionicLoading','GetBusinessOrderByProductId','Global','$ionicPopup',
        'LoginGlobal','BusinessUtil','CheckTripleMonthBonus','GetTripleMonthBonus','FindProductById',
        'FindProductBargainPriceTimeById','GetUserInfoByOpenId','GetRankingsList',"GetProductNumFromBuyCart",'IsLogin','$timeout','GetOctoberTeamList',
        function ($scope,$rootScope,$stateParams,$state,GetHomeBannerList,GetOfflineProductList,$ionicSlideBoxDelegate,
                  $ionicLoading,GetBusinessOrderByProductId,Global,$ionicPopup,
                  LoginGlobal,BusinessUtil,CheckTripleMonthBonus,GetTripleMonthBonus,FindProductById,
                  FindProductBargainPriceTimeById,GetUserInfoByOpenId,GetRankingsList,GetProductNumFromBuyCart,IsLogin,$timeout,GetOctoberTeamList) {

            $rootScope.title = "美享99快时尚";

            $scope.param = {
                bannerList:{},
                productList:{},//特殊商品
                product2List:[[]],//普通商品
                promoteProduct:true,
                rookieProduct:true,
                redPackerFlagOne:false,
                redPackerFlagTwo:false,
                redPackerBox:true,
                checkType:"0",
                floating:[],
                productUnPaidNum : "0"
            };

            $scope.goOctoberTeam = function () {
                $state.go("octoberTeam");
            }

            $scope.$on('$ionicView.enter', function(){
                $rootScope.title = "美享99触屏版";
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                // GetRankingsList.save(function(data){
                //     $scope.rankingsList = data.responseData;
                // });

                GetOctoberTeamList.get({startDate:"2018-09-10",endDate:"2018-09-15",size:5},function (data) {
                    $scope.rankingsList = data.responseData;
                })

                /*底部切换初始默认为首页*/
                $scope.param.checkType="0";
                GetHomeBannerList.save(function(data){
                    $ionicLoading.hide();
                    $scope.param.bannerList = data.responseData;
                    /*轮播图排序 按照后台返回来的那个值*/
                    $ionicSlideBoxDelegate.update();
                    $ionicSlideBoxDelegate.loop(true);
                    for(var i=0;i<$scope.param.bannerList.length;i++){
                        if( $scope.param.bannerList[i].bannerType=="supernatant"){
                            $scope.param.floating.push($scope.param.bannerList[i]);
                        }
                    }
                });
                /*点击底部切换按钮更改背景色 字体*/
               $scope.checkBg=function (checkType) {
                $scope.param.checkType=checkType;
               };
                GetProductNumFromBuyCart.get(function(data){
                    $ionicLoading.hide();
                    $scope.param.productUnPaidNum = data.responseData;
                });
            });
           /*点击 跳入新人专享页面*/
           $scope.Newlyweds=function (productPrefecture) {
             $state.go("newlyweds",{productPrefecture:productPrefecture})
           };
           /*点击价格区跳转到价格页面*/
           $scope.areaPage=function (productPrefecture) {
             $state.go("areaPage",{productPrefecture:productPrefecture})
           };
           /*点击分销进入分销页面*/
           $scope.distributionArea=function (productPrefecture) {
             $state.go("distributionArea")
           };
           /*点击秒杀部门跳转到秒杀页面*/
           $scope.seckillList=function () {
             $state.go("seckillList")
           };
           /*点击input框跳转到搜索页面*/
           $scope.search=function () {
               $state.go("searchPage")
           };
           /*点击好货推荐跳转到相应页面*/
           $scope.recommendation=function (productPrefecture) {
             $state.go("recommendation",{productPrefecture:productPrefecture})
           };
                /*点击首页浮层 取消让浮层隐藏*/
            $scope.redPackerClose = function () {
              $scope.param.redPackerBox=false;
            };
            var showToast = function (content) {
                $ionicLoading.show({
                    template: content
                });
            };

            var hideToast = function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            };
            $scope.loginCart = function(){
                IsLogin.save(function(data){
                    if(data.responseData=="failure"){
                        showToast("请先登录账号");
                        hideToast();
                        $state.go("login");
                    }else{
                        $state.go("buyCart");
                    }
                })
            };

        }]);
