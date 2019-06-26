angular.module('controllers',[]).controller('shopHomeCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetHomeBannerList','GetOfflineProductList','$ionicSlideBoxDelegate',
        '$ionicLoading','GetBusinessOrderByProductId','Global','$ionicPopup',
        'LoginGlobal','BusinessUtil','CheckTripleMonthBonus','GetTripleMonthBonus',
        'FindProductById','FindProductBargainPriceTimeById','GetUserInfoByOpenId','GetRankingsList',
        "GetProductNumFromBuyCart",'GetUserInfo','$timeout','GetOctoberTeamList',
        function ($scope,$rootScope,$stateParams,$state,GetHomeBannerList,GetOfflineProductList,$ionicSlideBoxDelegate,
                  $ionicLoading,GetBusinessOrderByProductId,Global,$ionicPopup,
                  LoginGlobal,BusinessUtil,CheckTripleMonthBonus,GetTripleMonthBonus,
                  FindProductById,FindProductBargainPriceTimeById,GetUserInfoByOpenId,
                  GetRankingsList,GetProductNumFromBuyCart,GetUserInfo,$timeout,GetOctoberTeamList) {
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
            $scope.rankingsList = ['充值有礼：一次性充值满100元，立送5元；','一次性充值满300元，立送20元；','一次性充值满500元，立送40元；','一次性充值满1000元，立送100元；','一次性充值满5000元，立送500元；','一次性充值满10000元，立送1200元；']
            $scope.$on('$ionicView.enter', function(){
                $rootScope.title = "美享99触屏版";
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                // GetOctoberTeamList.get({startDate:"2018-11-01",endDate:"2018-11-12", size:5},function (data) {
                //     $scope.rankingsList = data.responseData;
                //
                // })

                $scope.goNewlyweds = function (productId) {
                    $state.go('offlineProductDetail',{productId:productId})
                }

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
                        }else if($scope.param.bannerList[i].bannerType=="1"){
                            $scope.specialImgUrl = $scope.param.bannerList[i].uri;
                        }else if($scope.param.bannerList[i].bannerType=="2"){
                            $scope.newProductImgUrl = $scope.param.bannerList[i].uri;
                        }else if($scope.param.bannerList[i].bannerType=="3"){
                            $scope.seckillImgUrl = $scope.param.bannerList[i].uri;
                        }else if($scope.param.bannerList[i].bannerType=="4"){
                            $scope.collageImgUrl = $scope.param.bannerList[i].uri;
                        }else if($scope.param.bannerList[i].bannerType=="5"){
                            $scope.cutImgUrl = $scope.param.bannerList[i].uri;
                        }else if($scope.param.bannerList[i].bannerType=="6"){
                            $scope.newUserImgUrl1 = $scope.param.bannerList[i].uri;
                        }else if($scope.param.bannerList[i].bannerType=="7"){
                            $scope.newUserImgUrl2 = $scope.param.bannerList[i].uri;
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

            $scope.goOctoberTeam = function () {
                $state.go("octoberTeam");
            }

            /*点击 跳入新人专享页面*/
            $scope.Newlyweds=function (productPrefecture) {
                $state.go("newlyweds",{productPrefecture:productPrefecture})
            };
            /*点击价格区跳转到价格页面*/
            $scope.areaPage=function (productPrefecture) {
                $state.go("areaPage",{productPrefecture:productPrefecture})
            };
            /*砍价专区*/
            $scope.cutPrice=function (productPrefecture) {
                $state.go("cutPrice",{productPrefecture:productPrefecture})
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
            /*刷新页面*/
            $scope.refreshPage = function(){
                $state.reload();
            }
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
                GetUserInfo.save(function (data) {
                    if(data.result==Global.FAILURE)
                    {
                        BusinessUtil.checkResponseData(data,"buyCart");
                    }
                    else
                    {
                        $state.go("buyCart");
                    }
                })
            };


            //498列表
            $scope.PageParamDTO ={
                pageNo:0,
                pageSize:100,
                // orderBy:$scope.param.orderBy,
                // orderType:$scope.param.orderType,
                orderBy:"asc",
                orderType:"price",
                requestData:{
                    productPrefecture:"12"
                }
            };
            GetOfflineProductList.save($scope.PageParamDTO,function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null)
                {
                    $scope.product498List=data.responseData;
                }
            });
            $scope.enterDetails=function(item){
                $state.go("offlineProductDetail",{productId:item})
            };

            /*视频播放*/
            $scope.isPlayVideo = false;
            $scope.isFirstPlay=true;
            $scope.videoPlayTap = function(){

                    if($scope.isFirstPlay){
                        wx.getNetworkType({
                            success: function (res) {
                                var networkType = res.networkType;
                                if(['2g','3g','4g'].includes(networkType)){
                                    $scope.isPlayVideo = true;
                                }else{
                                    $('video').attr("controls","controls");
                                    new Promise(function (resolve,reject) {
                                        GetUserInfo.save(function (data) {
                                          if(data.result==Global.SUCCESS){
                                              resolve(data.responseData)
                                          }else if(data.result==Global.FAILURE){
                                              resolve({
                                                  id:'####',
                                                  nickname:'未登录用户'
                                              })
                                          }
                                        })
                                    }).then(function (value) {
                                        $.ajax({
                                            type: "GET",
                                            url: "http://47.100.102.37:3000/logger/shopHomeVideoLogger",
                                            data: {name:value.nickname, id:value.id},
                                            dataType: "json",
                                            success: function(data){
                                            }
                                        });
                                    })
                                }
                            }
                        });
                    }else{
                        $('video').attr("controls","controls");
                        new Promise(function (resolve,reject) {
                            GetUserInfo.save(function (data) {
                                if(data.result==Global.SUCCESS){
                                    resolve(data.responseData)
                                }else if(data.result==Global.FAILURE){
                                    resolve({
                                        id:'####',
                                        nickname:'未登录用户'
                                    })
                                }
                            })
                        }).then(function (value) {
                            $.ajax({
                                type: "GET",
                                url: "http://47.100.102.37:3000/logger/shopHomeVideoLogger",
                                data: {name:value.nickname, id:value.id},
                                dataType: "json",
                                success: function(data){
                                }
                            });
                        })
                    }
            }
            $scope.continuePlay=function () {
                $scope.isPlayVideo = false;
                $('video').attr("controls","controls");
                $scope.isFirstPlay=false;
            }

        }]);
