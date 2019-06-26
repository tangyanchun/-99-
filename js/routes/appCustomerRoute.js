/**
 * 路由
 */
define(['appCustomer'], function(app){
    return app
        .config(['$stateProvider','$urlRouterProvider',
            function($stateProvider,$urlRouterProvider) {
                var loadFunction = function($templateCache, $ocLazyLoad, $q, $http,name,files,htmlURL){
                    lazyDeferred = $q.defer();
                    return $ocLazyLoad.load ({
                        name: name,
                        files: files
                    }).then(function() {
                        return $http.get(htmlURL)
                            .success(function(data, status, headers, config) {
                                return lazyDeferred.resolve(data);
                            }).
                            error(function(data, status, headers, config) {
                                return lazyDeferred.resolve(data);
                            });
                    });
                };

                $stateProvider
                    .state('addressEdit', {
                        url: '/addressEdit/:type,:addressId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addressEditCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addressEditCtrl',
                                    ['js/controllers/business/addressEditCtrl.js?ver='+ customerVersion,
                                        "js/libs/ydui.js?ver='+ customerVersion",
                                        "styles/ydui.css?ver='+ customerVersion",
                                    ],
                                    'views/business/addressEdit.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('addressManagement', {
                        url: '/addressManagement/:routePath',//从哪个页面来，回哪个页面去
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'addressManagementCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.addressManagementCtrl',
                                    ['js/controllers/business/addressManagementCtrl.js?ver='+ customerVersion],
                                    'views/business/addressManagement.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('shopHome', {
                        url: '/shopHome',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'shopHomeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shopHomeCtrl',
                                    ['js/controllers/business/shopHomeCtrl.js?ver='+ customerVersion],
                                    'views/business/shopHome.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('shopHomeV1', {
                        url: '/shopHomeV1',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'shopHomeV1Ctrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shopHomeV1Ctrl',
                                    ['js/controllers/business/shopHomeV1Ctrl.js?ver='+ customerVersion],
                                    'views/business/shopHomeV1.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('newShopHome', {
                        url: '/newShopHome',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'newShopHomeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.newShopHomeCtrl',
                                    ['js/controllers/business/newShopHomeCtrl.js?ver='+ customerVersion],
                                    'views/business/newShopHome.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('rechargeAccountRecordList', {
                        url: '/rechargeAccountRecordList/:rechargeAccountId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'rechargeAccountRecordListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeAccountRecordListCtrl',
                                    ['js/controllers/business/rechargeAccountRecordListCtrl.js?ver='+ customerVersion],
                                    'views/business/rechargeAccountRecordList.html?ver=' + customerVersion);
                            }
                        }
                    })

                    /*新人专享页面*/
                    .state('newlyweds', {
                        url: '/newlyweds/:productPrefecture',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'newlywedsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.newlywedsCtrl',
                                    ['js/controllers/business/newlywedsCtrl.js?ver='+ customerVersion],
                                    'views/business/newlyweds.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*特价专区 框架商品页面*/
                    .state('areaPage', {
                        url: '/areaPage/:productPrefecture',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'areaPageCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.areaPageCtrl',
                                    ['js/controllers/business/areaPageCtrl.js?ver='+ customerVersion],
                                    'views/business/areaPage.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*刷单页面*/
                    .state('brushingGoods', {
                        url: '/brushingGoods',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'brushingGoodsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.brushingGoodsCtrl',
                                    ['js/controllers/business/brushingGoodsCtrl.js?ver='+ customerVersion],
                                    'views/business/brushingGoods.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*砍价页面*/
                    .state('cutPrice', {
                        url: '/cutPrice/:productPrefecture',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'cutPriceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.cutPriceCtrl',
                                    ['js/controllers/business/cutPriceCtrl.js?ver='+ customerVersion],
                                    'views/business/cutPrice.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*砍价详情*/
                    .state('cutDetails', {
                        url: '/cutDetails/:id/:productId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'cutDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.cutDetailsCtrl',
                                    ['js/controllers/business/cutDetailsCtrl.js?ver='+ customerVersion],
                                    'views/business/cutDetails.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*好友砍价页面*/
                    .state('bargainProductDetail', {
                        url: '/bargainProductDetail/:bargainId/:orderId/:productId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'bargainProductDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.bargainProductDetailCtrl',
                                    ['js/controllers/business/bargainProductDetailCtrl.js?ver='+ customerVersion],
                                    'views/business/bargainProductDetail.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*砍价免费拿*/
                    .state('bargainFree', {
                        url: '/bargainFree/:businessOrderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'bargainFreeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.bargainFreeCtrl',
                                    ['js/controllers/business/bargainFreeCtrl.js?ver='+ customerVersion],
                                    'views/business/bargainFree.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*报名表*/
                    .state('registration', {
                        url: '/registration',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'registrationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.registrationCtrl',
                                    ['js/controllers/business/registrationCtrl.js?ver='+ customerVersion],
                                    'views/business/registration.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*我的砍价*/
                    .state('myCut', {
                        url: '/myCut',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'myCutCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.myCutCtrl',
                                    ['js/controllers/business/myCutCtrl.js?ver='+ customerVersion],
                                    'views/business/myCut.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*分销页面*/
                    .state('distributionArea', {
                        url: '/distributionArea',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'distributionAreaCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.distributionAreaCtrl',
                                    ['js/controllers/business/distributionAreaCtrl.js?ver='+ customerVersion],
                                    'views/business/distributionArea.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*点击二级类目的具体产品*/
                    .state('specificGoods', {
                        url: '/specificGoods/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specificGoodsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specificGoodsCtrl',
                                    ['js/controllers/business/specificGoodsCtrl.js?ver='+ customerVersion],
                                    'views/business/specificGoods.html?ver=' + customerVersion);
                            }
                        }
                    })

                        /*点击跨境二级类目的具体产品*/
                    .state('crossGoods', {
                        url: '/crossGoods/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'crossGoodsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.crossGoodsCtrl',
                                    ['js/controllers/business/crossGoodsCtrl.js?ver='+ customerVersion],
                                    'views/business/crossGoods.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*好货推荐*/
                    .state('recommendation', {
                        url: '/recommendation/:productPrefecture',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'recommendationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.recommendationCtrl',
                                    ['js/controllers/business/recommendationCtrl.js?ver='+ customerVersion],
                                    'views/business/recommendation.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*空页面*/
                    .state('area', {
                        url: '/area',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'areaCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.areaCtrl',
                                    ['js/controllers/business/areaCtrl.js?ver='+ customerVersion],
                                    'views/business/area.html?ver=' + customerVersion);
                            }
                        }
                    })

                    /*分类页面*/
                    .state('classification', {
                        url: '/classification',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'classificationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.classificationCtrl',
                                    ['js/controllers/business/classificationCtrl.js?ver='+ customerVersion],
                                    'views/business/classification.html?ver=' + customerVersion);
                            }
                        }
                    })
                        /*跨境分类*/
                    .state('specialClassification', {
                        url: '/specialClassification',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialClassificationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specialClassificationCtrl',
                                    ['js/controllers/business/specialClassificationCtrl.js?ver='+ customerVersion],
                                    'views/business/specialClassification.html?ver=' + customerVersion);
                            }
                        }
                    })

                    /*充值账户页面*/
                    .state('rechargeAccountB', {
                        url: '/rechargeAccountB',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'rechargeAccountBCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeAccountBCtrl',
                                    ['js/controllers/business/rechargeAccountBCtrl.js?ver='+ customerVersion],
                                    'views/business/rechargeAccountB.html?ver=' + customerVersion);
                            }
                        }
                    })

                    /*充值账户页面*/
                    .state('recharge', {
                        url: '/recharge',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'rechargeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.rechargeCtrl',
                                    ['js/controllers/business/rechargeCtrl.js?ver='+ customerVersion,
                                        'js/libs/swiper.min.js?ver='+ customerVersion,
                                        'styles/swiper.min.css?ver='+ customerVersion,],


                                    'views/business/recharge.html?ver=' + customerVersion);
                            }
                        }
                    })

                    /*联系客服页面*/
                    .state('contactCustomer', {
                        url: '/contactCustomer',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'contactCustomerCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.contactCustomerCtrl',
                                    ['js/controllers/business/contactCustomerCtrl.js?ver='+ customerVersion],
                                    'views/business/contactCustomer.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('shareHome', {
                        url: '/shareHome',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'shareHomeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.shareHomeCtrl',
                                    ['js/controllers/business/shareHomeCtrl.js?ver='+ customerVersion],
                                    'views/business/shareHome.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*搜索页面*/
                    .state('searchPage', {
                        url: '/searchPage',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'searchPageCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.searchPageCtrl',
                                    ['js/controllers/business/searchPageCtrl.js?ver='+ customerVersion],
                                    'views/business/searchPage.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('sharePage', {
                        url: '/sharePage/:reload,:userPhone',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'sharePageCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.sharePageCtrl',
                                    ['js/controllers/business/sharePageCtrl.js?ver='+ customerVersion],
                                    'views/business/sharePage.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('buyCart', {
                        url: '/buyCart',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'buyCartCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.buyCartCtrl',
                                    ['js/controllers/business/buyCartCtrl.js?ver='+ customerVersion],
                                    'views/business/buyCart.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('seckillList', {
                        url: '/seckillList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'seckillListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.seckillListCtrl',
                                    ['js/controllers/business/seckillListCtrl.js?ver='+ customerVersion],
                                    'views/business/seckillList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('login', {
                        url: '/login/:redirectUrl',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'loginCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.loginCtrl',
                                    ['js/controllers/business/loginCtrl.js?ver='+ customerVersion],
                                    'views/business/login.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('paySuccess', {
                        url: '/paySuccess',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'paySuccessCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.paySuccessCtrl',
                                    ['js/controllers/business/paySuccessCtrl.js?ver='+ customerVersion],
                                    'views/business/paySuccess.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('offlineProductDetail', {
                        url: '/offlineProductDetail/:productId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'offlineProductDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.offlineProductDetailCtrl',
                                    ['js/controllers/business/offlineProductDetailCtrl.js?ver='+ customerVersion],
                                    'views/business/offlineProductDetail.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('seckillInfo', {
                        url: '/seckillInfoCtrl/:id',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'seckillInfoCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.seckillInfoCtrl',
                                    ['js/controllers/business/seckillInfoCtrl.js?ver='+ customerVersion],
                                    'views/business/seckillInfo.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('trainingProductList', {
                        url: '/trainingProductList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'trainingProductListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trainingProductListCtrl',
                                    ['js/controllers/business/trainingProductListCtrl.js?ver='+ customerVersion],
                                    'views/business/trainingProductList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('trainingProductLearning', {
                        url: '/trainingProductLearning/:productId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'trainingProductLearningCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trainingProductLearningCtrl',
                                    ['js/controllers/business/trainingProductLearningCtrl.js?ver='+ customerVersion],
                                    'views/business/trainingProductLearning.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('withDraw', {
                        url: '/withDraw',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'withDrawCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.withDrawCtrl',
                                    ['js/controllers/business/withDrawCtrl.js?ver='+ customerVersion],
                                    'views/business/withDraw.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('account', {
                        url: '/account',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'accountCtrl',
                        cache:false,
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.accountCtrl',
                                    ['js/controllers/business/accountCtrl.js?ver='+ customerVersion],
                                    'views/business/account.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('myselfCenter', {
                        url: '/myselfCenter',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'myselfCenterCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.myselfCenterCtrl',
                                    ['js/controllers/business/myselfCenterCtrl.js?ver='+ customerVersion],
                                    'views/business/myselfCenter.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('orderManagement', {
                        url: '/orderManagement/:type',//type的状态用来表示不同的订单状态
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'orderManagementCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.orderManagementCtrl',
                                    ['js/controllers/business/orderManagementCtrl.js?ver='+ customerVersion],
                                    'views/business/orderManagement.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('specialManagement', {
                        url: '/specialManagement/:type',//type的状态用来表示不同的订单状态
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialManagementCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specialManagementCtrl',
                                    ['js/controllers/business/specialManagementCtrl.js?ver='+ customerVersion],
                                    'views/business/specialManagement.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('suggestion', {
                        url: '/suggestion',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'suggestionCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.suggestionCtrl',
                                    ['js/controllers/business/suggestionCtrl.js?ver='+ customerVersion],
                                    'views/business/suggestion.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('transactionList', {
                        url: '/transactionList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'transactionListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionListCtrl',
                                    ['js/controllers/business/transactionListCtrl.js?ver='+ customerVersion],
                                    'views/business/transactionList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('transactionDetail', {
                        url: '/transactionDetail/:transactionId,:type',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'transactionDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/transactionDetailCtrl.js?ver='+ customerVersion],
                                    'views/business/transactionDetail.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('personalInformation', {
                        url: '/personalInformation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'personalInformationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/personalInformationCtrl.js?ver='+ customerVersion],
                                    'views/business/personalInformation.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*跨境个人设置*/
                    .state('specialInformation', {
                        url: '/specialInformation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialInformationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/specialInformationCtrl.js?ver='+ customerVersion],
                                    'views/business/specialInformation.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyTraining', {
                        url: '/beautyTraining',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyTrainingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyTrainingCtrl',
                                    ['js/controllers/business/beautyTrainingCtrl.js?ver='+ customerVersion],
                                    'views/business/beautyTraining.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('aboutMine', {
                        url: '/aboutMine',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'aboutMineCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/aboutMineCtrl.js?ver='+ customerVersion],
                                    'views/business/aboutMine.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('invoice', {
                        url: '/invoice/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'invoiceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/invoiceCtrl.js?ver='+ customerVersion],
                                    'views/business/invoice.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('supportBank', {
                        url: '/supportBank',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'supportBankCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/supportBankCtrl.js?ver='+ customerVersion],
                                    'views/business/supportBank.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beans', {
                        url: '/beans',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beansCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beansCtrl',
                                    ['js/controllers/business/beansCtrl.js?ver='+ customerVersion],
                                    'views/business/beans.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*积分换购详情*/
                    .state('integralDetails', {
                        url: '/integralDetails/:bonusPointsId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'integralDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.integralDetailsCtrl',
                                    ['js/controllers/business/integralDetailsCtrl.js?ver='+ customerVersion],
                                    'views/business/integralDetails.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*交易列表*/
                    .state('listTransactions', {
                        url: '/listTransactions',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'listTransactionsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.listTransactionsCtrl',
                                    ['js/controllers/business/listTransactionsCtrl.js?ver='+ customerVersion],
                                    'views/business/listTransactions.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*规则*/
                    .state('signRule', {
                        url: '/signRule',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'signRuleCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.signRuleCtrl',
                                    ['js/controllers/business/signRuleCtrl.js?ver='+ customerVersion],
                                    'views/business/signRule.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('orderDetails', {
                        url: '/orderDetails/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'orderDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/orderDetailsCtrl.js?ver='+ customerVersion],

                                    'views/business/orderDetails.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('myTeam', {
                        url: '/myTeam',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'myTeamCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.myTeamCtrl',
                                    ['js/controllers/business/myTeamCtrl.js?ver='+ customerVersion],
                                    'views/business/myTeam.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('octoberTeam', {
                        url: '/octoberTeam',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'octoberTeamCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.octoberTeamCtrl',
                                    ['js/controllers/business/octoberTeamCtrl.js?ver='+ customerVersion],
                                    'views/business/octoberTeam.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('trainingHome', {
                        url: '/trainingHome',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'trainingHomeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trainingHomeCtrl',
                                    ['js/controllers/business/trainingHomeCtrl.js?ver='+ customerVersion],
                                    'views/business/trainingHome.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('experience', {
                        url: '/experience',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'experienceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.experienceCtrl',
                                    ['js/controllers/business/experienceCtrl.js?ver='+ customerVersion],
                                    'views/business/experience.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('drawDetails', {
                        url: '/drawDetails/:status,:withDrawAmount',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'drawDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/drawDetailsCtrl.js?ver='+ customerVersion],
                                    'views/business/drawDetails.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('logisticDetails', {
                        url: '/logisticDetails/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'logisticDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/logisticDetailsCtrl.js?ver='+ customerVersion],
                                    'views/business/logisticDetails.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('shopActivity', {
                        url: '/shopActivity/:forward',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'shopActivityCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/shopActivityCtrl.js?ver='+ customerVersion],
                                    'views/business/shopActivity.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('protocol', {
                        url: '/protocol',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'protocolCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.transactionDetailCtrl',
                                    ['js/controllers/business/protocolCtrl.js?ver='+ customerVersion],
                                    'views/business/protocol.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('specialProductList', {
                        url: '/specialProductList/:specialShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialProductListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specialProductListCtrl',
                                    ['js/controllers/business/specialProductListCtrl.js?ver='+ customerVersion],
                                    'views/business/specialProductList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*跨境商品搜索页面*/
                    .state('searchSpecial', {
                        url: '/searchSpecial',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'searchSpecialCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.searchSpecialCtrl',
                                    ['js/controllers/business/searchSpecialCtrl.js?ver='+ customerVersion],
                                    'views/business/searchSpecial.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*跨境页面我的页面*/
                    .state('specialMine', {
                        url: '/specialMine',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialMineCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specialMineCtrl',
                                    ['js/controllers/business/specialMineCtrl.js?ver='+ customerVersion],
                                    'views/business/specialMine.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('specialShopTransactionList', {
                        url: '/specialShopTransactionList/:specialShopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialShopTransactionListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specialShopTransactionListCtrl',
                                    ['js/controllers/business/specialShopTransactionListCtrl.js?ver='+ customerVersion],
                                    'views/business/specialShopTransactionList.html?ver=' + customerVersion);
                            }
                        }
                    })
                 .state('specialTransactionDetail', {
                        url: '/specialTransactionDetail/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'specialTransactionDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.specialTransactionDetailCtrl',
                                    ['js/controllers/business/specialTransactionDetailCtrl.js?ver='+ customerVersion],
                                    'views/business/specialTransactionDetail.html?ver=' + customerVersion);
                            }
                        }
                    })

                    .state('beautyAppoint', {
                        url: '/beautyAppoint',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyAppointCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyAppointCtrl',
                                    ['js/controllers/beauty/beautyAppointCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyAppoint.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*立即试用页面*/
                    .state('trial', {
                        url: '/trial',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'trialCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trialCtrl',
                                    ['js/controllers/beauty/trialCtrl.js?ver='+ customerVersion],
                                    'views/beauty/trial.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyProjectList', {
                        url: '/beautyProjectList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyProjectListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyProjectListCtrl',
                                    ['js/controllers/beauty/beautyProjectListCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyProjectList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyClerkList', {
                        url: '/beautyClerkList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyClerkListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyClerkListCtrl',
                                    ['js/controllers/beauty/beautyClerkListCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyClerkList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('expenseCardRecord', {
                        url: '/expenseCardRecord',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'expenseCardRecordCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.expenseCardRecordCtrl',
                                    ['js/controllers/beauty/expenseCardRecordCtrl.js?ver='+ customerVersion],
                                    'views/beauty/expenseCardRecord.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('projectCardList', {
                        url: '/projectCardList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectCardListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectCardListCtrl',
                                    ['js/controllers/beauty/projectCardListCtrl.js?ver='+ customerVersion],
                                    'views/beauty/projectCardList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('projectCardDetail', {
                        url: '/projectCardDetail/:projectId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'projectCardDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.projectCardDetailCtrl',
                                    ['js/controllers/beauty/projectCardDetailCtrl.js?ver='+ customerVersion],
                                    'views/beauty/projectCardDetail.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautySendMessage', {
                        url: '/beautySendMessage',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautySendMessageCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautySendMessageCtrl',
                                    ['js/controllers/beauty/beautySendMessageCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautySendMessage.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyUserCenter', {
                        url: '/beautyUserCenter',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyUserCenterCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyUserCenterCtrl',
                                    ['js/controllers/beauty/beautyUserCenterCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyUserCenter.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyUserQRCode', {
                        url: '/beautyUserQRCode',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyUserQRCodeCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyUserQRCodeCtrl',
                                    ['js/controllers/beauty/beautyUserQRCodeCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyUserQRCode.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyUserAppoint', {
                        url: '/beautyUserAppoint',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyUserAppointCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyUserAppointCtrl',
                                    ['js/controllers/beauty/beautyUserAppointCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyUserAppoint.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyUserAppointDetail', {
                        url: '/beautyUserAppointDetail/:appointId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyUserAppointDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyUserAppointDetailCtrl',
                                    ['js/controllers/beauty/beautyUserAppointDetailCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyUserAppointDetail.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyShopList', {
                        url: '/beautyShopList',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyShopListCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyShopListCtrl',
                                    ['js/controllers/beauty/beautyShopListCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyShopList.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*选择项目的详情*/
                    .state('beautyProjectDetails', {
                        url: '/beautyProjectDetails/:projectId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyProjectDetailsCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyProjectDetailsCtrl',
                                    ['js/controllers/beauty/beautyProjectDetailsCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyProjectDetails.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('beautyLogin', {
                        url: '/beautyLogin/:redirectUrl',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyLoginCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyLoginCtrl',
                                    ['js/controllers/beauty/beautyLoginCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyLogin.html?ver=' + customerVersion);
                            }
                        }
                    })
                  /*个人中心页面  点击售后页面 跳转到另一个页面*/
                    .state('afterSale', {
                        url: '/afterSale',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'afterSaleCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.afterSaleCtrl',
                                    ['js/controllers/business/afterSaleCtrl.js?ver='+ customerVersion],
                                    'views/business/afterSale.html?ver=' + customerVersion);
                            }
                        }
                    })

                    .state('beautyTrainingVideo', {
                        url: '/beautyTrainingVideo',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'beautyTrainingVideoCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.beautyTrainingVideoCtrl',
                                    ['js/controllers/beauty/beautyTrainingVideoCtrl.js?ver='+ customerVersion],
                                    'views/beauty/beautyTrainingVideo.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('fileInformation', {
                        url: '/fileInformation',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'fileInformationCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.fileInformationCtrl',
                                    ['js/controllers/beauty/fileInformationCtrl.js?ver='+ customerVersion],
                                    'views/beauty/fileInformation.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('joinGroupShoping', {
                        url: '/joinGroupShoping/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'joinGroupShopingCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.joinGroupShopingCtrl',
                                    ['js/controllers/business/joinGroupShopingCtrl.js?ver='+ customerVersion],
                                    'views/business/joinGroupShoping.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*砍价二维码页面*/
                    .state('joinCutPrice', {
                        url: '/joinCutPrice/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'joinCutPriceCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.joinCutPriceCtrl',
                                    ['js/controllers/business/joinCutPriceCtrl.js?ver='+ customerVersion],
                                    'views/business/joinCutPrice.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('groupShopingState', {
                        url: '/groupShopingState/:orderId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'groupShopingStateCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.groupShopingStateCtrl',
                                    ['js/controllers/business/groupShopingStateCtrl.js?ver='+ customerVersion],
                                    'views/business/groupShopingState.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('pointsRedemptAddress', {
                        url: '/pointsRedemptAddressCtrl/:recordId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'pointsRedemptAddressCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.pointsRedemptAddressCtrl',
                                    ['js/controllers/business/pointsRedemptAddressCtrl.js?ver='+ customerVersion,
                                        "js/libs/ydui.js?ver='+ customerVersion",
                                        "styles/ydui.css?ver='+ customerVersion",],
                                    'views/business/pointsRedemptAddress.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('weixinOpenIdTest', {
                        url: '/weixinOpenIdTest/:shopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'weixinOpenIdTestCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.weixinOpenIdTestCtrl',
                                    ['js/controllers/beauty/weixinOpenIdTestCtrl.js?ver='+ customerVersion],
                                    'views/beauty/weixinOpenIdTest.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('mxShopTest', {
                        url: '/mxShopTest/:shopId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'mxShopTestCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.mxShopTestCtrl',
                                    ['js/controllers/shop/mxShopTestCtrl.js?ver='+ customerVersion],
                                    'views/shop/mxShopTest.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('collageProductDetail', {
                        url: '/collageProductDetail/:collageId/:groupId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'collageProductDetailCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.collageProductDetailCtrl',
                                    ['js/controllers/business/collageProductDetailCtrl.js?ver='+ customerVersion],
                                    'views/business/collageProductDetail.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('collagePaySuccess', {
                        url: '/collagePaySuccess',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'collagePaySuccessCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.collagePaySuccessCtrl',
                                    ['js/controllers/business/collagePaySuccessCtrl.js?ver='+ customerVersion],
                                    'views/business/collagePaySuccess.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('afterSalesHint', {
                        url: '/afterSalesHint',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'afterSalesHintCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.afterSalesHintCtrl',
                                    ['js/controllers/business/afterSalesHintCtrl.js?ver='+ customerVersion],
                                    'views/business/afterSalesHint.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('afterSales', {
                        url: '/afterSales/:transactionId',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'afterSalesCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.afterSalesCtrl',
                                    ['js/controllers/business/afterSalesCtrl.js?ver='+ customerVersion],
                                    'views/business/afterSales.html?ver=' + customerVersion);
                            }
                        }
                    })
                    .state('tradingNum', {
                        url: '/tradingNum',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'tradingNumCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.tradingNumCtrl',
                                    ['js/controllers/business/tradingNumCtrl.js?ver='+ customerVersion],
                                    'views/business/tradingNum.html?ver=' + customerVersion);
                            }
                        }
                    })
                    /*美享课堂支付成功页面*/
                    .state('trainingPaySuccess', {
                        url: '/trainingPaySuccess',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'trainingPaySuccessCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trainingPaySuccessCtrl',
                                    ['js/controllers/business/trainingPaySuccessCtrl.js?ver='+ customerVersion],
                                    'views/business/trainingPaySuccess.html?ver=' + customerVersion);
                            }
                        }
                    })
                   /*美享课堂邀请页面*/
                    .state('inviteClass', {
                        url: '/inviteClass',
                        templateProvider: function() { return lazyDeferred.promise; },
                        controller: 'inviteClassCtrl',
                        resolve: {
                            load: function($templateCache, $ocLazyLoad, $q, $http) {
                                loadFunction($templateCache, $ocLazyLoad, $q, $http,'app.trainingPaySuccessCtrl',
                                    ['js/controllers/business/inviteClassCtrl.js?ver='+ customerVersion],
                                    'views/business/inviteClass.html?ver=' + customerVersion);
                            }
                        }
                    })


                $urlRouterProvider.otherwise('/weixinOpenIdTest/1234')
            }])
})