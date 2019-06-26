var income ='/business/income/';
var bonus ='/business/bonus/product/';
var product = '/business/product/';
var account = '/business/account/';
var withdraw = '/business/withdraw/';
var transaction = '/business/transaction/';
var bonusOrder = '/business/bonus/order/';
var userType = '/business/userType/';
var bonusPoints = '/business/bonus/'
var bannerList = '/system/banner/';
var suggest = '/system/feedback/';
var customer  = '/user/customer/';
var user = '/user/';
var weixin = '/weixin/customer/';
var projectInfo = '/beauty/projectInfo/';
var appointInfo = '/beauty/appointmentInfo/';
var clerkSchedule = '/beauty/clerkSchedule/';
var mine = '/beauty/mine/';
var beauty = '/beauty/';
var userIP = '/user/';
var cardInfo = '/beauty/cardInfo/';
var seckillProduct = '/business/seckillProduct';
var seckillOrder = '/business/seckillOrder';
var collage = '/business/collage/';
var gift = '/business/gift/';
var bargain = '/business/bargain/product/';
var bargains = '/business/bargain/order/';
var collages = '/business/crossBorder/order/';
var classPay='/business/schoolPay/';


define(['appCustomer'], function (app) {
    app

        .factory('GetUserValidateCode',['$resource',function ($resource){
            return $resource(user + 'getUserValidateCode')
        }])
        .factory('UserLogin',['$resource',function ($resource){
            return $resource(user + 'userLogin')
        }])

         //获取积分详情
        .factory('GetBonusPointsDetail',['$resource',function ($resource){
            return $resource(income + 'getBonusPointsDetail');
        }])

        //获取积分换购活动详情
        .factory('GetBonusActivityDetail',['$resource',function ($resource){
            return $resource(bonus + 'getBonusActivityDetail');
        }])

        //获取积分换购信息
        .factory('GetBonusActivityList',['$resource',function ($resource){
            return $resource(bonus + 'getBonusActivityList');
        }])

        //根据产品编号查询换购信息
        .factory('GetBonusActivityDetailByProductId',['$resource',function ($resource){
            return $resource(bonus + 'getBonusActivityDetailByProductId');
        }])

        //获取所有奖品
        .factory('GetAllAward',['$resource',function ($resource){
            return $resource(gift + 'getAllAward');
        }])
        //获取所有奖品
        .factory('UpdateBusinessAwardUserRecord',['$resource',function ($resource){
            return $resource(gift + 'updateBusinessAwardUserRecord');
        }])

            /*获取美享课堂专属二维码*/
        .factory('GetSchoolQRCode',['$resource',function ($resource){
            return $resource(classPay + 'getSchoolQRCode');
        }])
        //用户抽奖接口
        .factory('GetUserGift',['$resource',function ($resource){
            return $resource(gift + 'getUserGift');
        }])

        .factory('UserLoginOut',['$resource',function ($resource){
            return $resource(user + 'userLoginOut')
        }])
        .factory('BeautyUserLogin',['$resource',function ($resource){
            return $resource(user + 'beautyLogin')
        }])
        .factory('BeautyUserLoginOut',['$resource',function ($resource){
            return $resource(user + 'beautyLoginOut')
        }])
        .factory('GetUserInfo',['$resource',function ($resource){
            return $resource(customer + 'getUserInfo')
        }])
        .factory('GetUserInfoByOpenId',['$resource',function ($resource){
            return $resource(customer + 'getUserInfoByOpenId')
        }])
        .factory('GetUserNextLevelStruct',['$resource',function ($resource){
            return $resource(userType + 'getUserNextLevelStruct')
        }])

        //更新获取用户信息
        .factory('GetUserInfoIncome',['$resource',function ($resource){
            return $resource(income + 'getUserInfo');
        }])

        .factory('GetHomeBannerList',['$resource',function ($resource){
            return $resource(bannerList + 'getHomeBannerList')
        }])

        //获取跨境商品列表
        .factory('FindSpecialProductList',['$resource',function ($resource){
             return $resource(product + 'findSpecialProductList')
        }])

        .factory('GetTrainingProductDetail',['$resource',function ($resource){
            return $resource(product + 'getTrainingProductDetail')
        }])
        .factory('GetBusinessProductInfo',['$resource',function ($resource){
            return $resource(product + 'getBusinessProductInfo')
        }])
        .factory('GetTrainingProductPlayNum',['$resource',function ($resource){
            return $resource(product + 'getTrainingProductPlayNum')
        }])
        .factory('GetOfflineProductList',['$resource',function ($resource){
            return $resource(product + 'getOfflineProductList')
        }])
        .factory('GetTrainingProductListNeedPay',['$resource',function ($resource){
            return $resource(product + 'getTrainingProductListNeedPay')
        }])
        .factory('GetTrainingProductListNoNeedPay',['$resource',function ($resource){
            return $resource(product + 'getTrainingProductListNoNeedPay')
        }])
        .factory('GetOfflineProductDetail',['$resource',function ($resource){
            return $resource(product + 'getOfflineProductDetail')
        }])
        .factory('AddTrainingProductPlayNum',['$resource',function ($resource){
            return $resource(product + 'AddTrainingProductPlayNum')
        }])
        //发票
        .factory('AddInvoiceInfo',['$resource',function ($resource){
            return $resource( product+ 'addInvoiceInfo')
        }])
        /*获取一级类目*/
        .factory('GetOneProductClassList',['$resource',function ($resource){
            return $resource( product+ 'getOneProductClassList')
        }])
        /*获取二级类目*/
        .factory('GetTwoProductClassList',['$resource',function ($resource){
            return $resource( product+ 'getTwoProductClassList')
        }])
        .factory('GetAttentionTeacherorderStatus',['$resource',function ($resource){
            return $resource( transaction+ 'getAttentionTeacherStatus')
        }])
        .factory('AttentionTeacher',['$resource',function ($resource){
            return $resource( transaction+ 'attentionTeacher')
        }])
        .factory('BuriedPoint',['$resource',function ($resource){
            return $resource( "http://mx99test1.kpbeauty.com.cn:3000/dotLog");
        }])
        .factory('GetOrderAddressDetail',['$resource',function ($resource){
            return $resource( transaction+ 'orderAddressDetail')
        }])
        .factory('GetOrderDetailInfo',['$resource',function ($resource){
            return $resource( transaction+ 'orderDetailInfo')
        }])
        .factory('GetTripleMonthBonus',['$resource',function ($resource){
            return $resource( transaction+ 'getTripleMonthBonus')
        }])
        //获取
        .factory('QueryOrderCopRelationById',['$resource',function ($resource){
            return $resource(transaction+'queryOrderCopRelationById')
        }])
        .factory('GetBusinessOrderByProductId',['$resource',function ($resource){
            return $resource(transaction + 'getBusinessOrderByProductId')
        }])
        .factory('CheckTripleMonthBonus',['$resource',function ($resource){
            return $resource( transaction + 'checkTripleMonthBonus');
        }])
        // 点击查看是否购买视频
         .factory('GetTrainingBusinessOrder',['$resource',function ($resource){
             return $resource(transaction + 'getTrainingBusinessOrder')
         }])

        .factory('AddProduct2BuyCart',['$resource',function ($resource){
            return $resource('/business/transaction/addProduct2BuyCart')
        }])
        .factory('MinusProduct2BuyCart',['$resource',function ($resource){
            return $resource('/business/transaction/minusProduct2BuyCart')
        }])



        .factory('MinusProduct2BuyCart',['$resource',function ($resource){
            return $resource(transaction + 'minusProduct2BuyCart')
        }])
        .factory('GetProductNumFromBuyCart',['$resource',function ($resource){
            return $resource(transaction + 'getProductNumFromBuyCart')
        }])
        .factory('GetBuyCartInfo',['$resource',function ($resource){
            return $resource(transaction + 'buyCart')
        }])
        .factory('DeleteOrderFromBuyCart',['$resource',function ($resource){
            return $resource(transaction + 'deleteOrderFromBuyCart')
        }])
        .factory('PutNeedPayOrderListToRedis',['$resource',function ($resource){
            return $resource(transaction + 'putNeedPayOrderListToRedis')
        }])
        .factory('GetUserAddressList',['$resource',function ($resource){
            return $resource(transaction + 'userAddressList')
        }])
        .factory('AddUserAddress',['$resource',function ($resource){
            return $resource(transaction + 'addUserAddress')
        }])
        .factory('UpdateUserAddress',['$resource',function ($resource){
            return $resource(transaction + 'updateUserAddress')
        }])
        .factory('DeleteUserAddress',['$resource',function ($resource){
            return $resource(transaction + 'deleteUserAddress')
        }])
        .factory('GetTransactionList',['$resource',function ($resource){
            return $resource(transaction + 'getTransactionList')
        }])
        .factory('GetUserTransactionDetail',['$resource',function ($resource){
            return $resource(transaction + 'getUserTransactionDetail')
        }])
        .factory('GetBusinessOrderList',['$resource',function ($resource){
            return $resource(transaction + 'businessOrderList')
        }])
        .factory('UpdateBusinessOrderStatus',['$resource',function ($resource){
            return $resource(transaction + 'updateBusinessOrderStatus')
        }])
        .factory('CreateBusinessOrder',['$resource',function ($resource){
            return $resource(transaction + 'createBusinessOrder')
        }])
        .factory('CreateBonusOrder',['$resource',function ($resource){
            return $resource(bonusOrder + 'createBonusOrder')
        }])
        .factory('FindUserAddressById',['$resource',function ($resource){
            return $resource(transaction + 'findUserAddressById')
        }])
        .factory('GetOctoberTeamList',['$resource',function ($resource){
            return $resource(transaction+'getOctoberTeamList')
        }])

        .factory('GetUserAccountInfo',['$resource',function ($resource){
            return $resource(account + 'getUserAccountInfo')
        }])

        //获取用户充值记录列表
        .factory('FindRechargeAccountRecordList',['$resource',function ($resource){
            return $resource(account + 'findRechargeAccountRecordList')
        }])

        //获取用户充值账户详情
        .factory('GetUserRechargeAccountDetail',['$resource',function ($resource){
            return $resource(account + 'getUserRechargeAccountDetail')
        }])

        .factory('WithDrawMoneyFromAccount',['$resource',function ($resource){
            return $resource( withdraw+'withDrawMoneyFromAccount')
        }])

        .factory('SuggestionDetail',['$resource',function ($resource){
            return $resource(suggest + 'suggestionDetail')
        }])

        /*.factory('GetlogisticsQuery',['$resource',function ($resource){
            return $resource('http://47.100.102.37:3000/logisticsQuery')
        }])*/

        //获取用户的推广二维码
        .factory('GetCustomerQRCode',['$resource',function ($resource){
            return $resource(weixin + 'getUserQRCode')
        }])

        //获取用户的推广二维码
        .factory('GetSpecialProductList',['$resource',function ($resource){
            return $resource(product + 'getSpecialProductList')
        }])

        .factory('GetSpecialShopInfo',['$resource',function ($resource){
            return $resource(product + 'getSpecialShopInfo')
        }])
        //
        .factory('FindProductById',['$resource',function ($resource){
            return $resource(product + 'findProductById');
        }])

        .factory('FindProductBargainPriceTimeById',['$resource',function ($resource){
            return $resource(product + 'findProductBargainPriceTimeById');
        }])

        .factory('GetSpecialBossCondition',['$resource',function ($resource){
            return $resource(customer + 'getSpecialBossCondition');
        }])

        .factory('GetUserIsBoss',['$resource',function ($resource){
                return $resource(account + 'isShopKeeper');
         }])

         .factory('FindShopKeeperOrderS',['$resource',function ($resource){
                return $resource(account + 'findShopKeeperOrderS');
         }])
         .factory('FindOrderByTransactionId',['$resource',function ($resource){
                return $resource(account + 'findOrderByTransactionId');
          }])
         .factory('IsLogin',['$resource',function ($resource){
              return $resource(account + 'isLogin');
         }])

        //美容院用户侧接口
        .factory('GetUserClientShopProjectList',['$resource',function ($resource){
            return $resource(projectInfo + 'getUserClientShopProjectList')
        }])
        .factory('GetShopClerkList',['$resource',function ($resource){
            return $resource(appointInfo + 'getShopClerkList')
        }])
        .factory('GetClerkScheduleInfo',['$resource',function ($resource){
            return $resource(clerkSchedule + 'getClerkScheduleInfo')
        }])
        .factory('GetBeautyShopInfo',['$resource','$http','$q',function ($resource,$http,$q){
                return {
                    clerkInfo: function (clerkId) {
                        lazyClerkDeferred = $q.defer();
                        $http({
                            url: user + 'clerkInfo/' + clerkId,
                            method: 'GET'
                        }).success(function (response, status, header, config, statusText) {
                            //成功处理
                            lazyClerkDeferred.resolve(response);
                        });
                        return lazyClerkDeferred.promise;
                    },
                    shopProjectInfo: function (shopProjectId) {
                        lazyProjectDeferred = $q.defer();
                        $http({
                            url: '/beauty/projectInfo/' + shopProjectId,
                            method: 'GET'
                        }).success(function (response, status, header, config, statusText) {
                            //成功处理
                            lazyProjectDeferred.resolve(response);
                        });
                        return lazyProjectDeferred.promise;
                    }
                }
        }])
        .factory('SaveUserAppointInfo',['$resource',function ($resource){
            return $resource(appointInfo + 'saveUserAppointInfo')
        }])
        .factory('GetAppointmentInfoById',['$resource',function ($resource){
            return $resource(appointInfo + 'getAppointmentInfoById')
        }])
        .factory('GetMyAppointInfoList',['$resource',function ($resource){
            return $resource(appointInfo + 'getMyAppointInfoList')
        }])
        .factory('GetUserClientInfo',['$resource',function ($resource){
            return $resource(mine + 'getUserClientInfo')
        }])
        .factory('ChangeUserShop',['$resource',function ($resource){
            return $resource(mine + 'changeUserShop')
        }])
        .factory('GetUserRechargeCardList',['$resource',function ($resource){
            return $resource(cardInfo + 'getUserRechargeCardList')
        }])
        .factory('GetUserCourseProjectList',['$resource',function ($resource){
            return $resource(projectInfo + 'getUserCourseProjectList')
        }])
        .factory('GetCurrentLoginUserInfo',['$resource',function ($resource){
            return $resource(mine + 'getCurrentLoginUserInfo')
        }])
        .factory('BeautyLoginOut',['$resource',function ($resource){
            return $resource(userIP + 'beautyLoginOut')
        }])
        .factory('GetProjectCardConsumeByFlowId',['$resource',function ($resource){
            return $resource('/beauty/consume/getUserConsumeByFlowId')
        }])
        .factory('GetProjectCardConsume',['$resource',function ($resource){
            return $resource('/beauty/consume/consumeFlowNo')
        }])
        .factory('GetUserQrCode',['$resource',function ($resource){
            return $resource(mine + 'getUserQrCode')
        }])
        .factory('GetProjectConsumes',['$resource',function ($resource){
            return $resource('/beauty/consumes')
        }])
        .factory('GetRankingsList',['$resource',function ($resource){
            return $resource('/business/income/getIncomeRanking')
        }])
         /*用户端选择项目 查看项目详情接口*/
        .factory('ProjectInfo',['$resource',function ($resource){
            return $resource(projectInfo+"/:id", { id: '@id' })
        }])
        .factory('SeckillList',['$resource',function ($resource){
            return $resource(seckillProduct+"/getSeckillProductList")
        }])
        .factory('SeckillInfo',['$resource',function ($resource){
            return $resource(seckillProduct+"/getseckillProductDetailById")
        }])
        .factory('CreateSeckillOrder',['$resource',function ($resource){
            return $resource(seckillOrder+"/createSeckillOrder")
        }])
        //获取活动列表
        .factory('FindCollageActivityList',['$resource',function ($resource){
            return $resource(collage + 'product/getCollageProductList');
        }])
        .factory('GetCollageActivityDetail',['$resource',function ($resource){
            return $resource(collage + 'product/getCollageActivityDetail');
        }])
        /*获得拼团数据接口*/
        .factory('GetRemainCollageOrder',['$resource',function ($resource){
            return $resource(collage + 'order/getRemainCollageOrder');
        }])
        .factory('CreateCollageOrder',['$resource',function ($resource){
            return $resource(collage + 'order/createCollageOrder');
        }])

        //二维码地址获取
        .factory('GetCollageQRCode',['$resource',function ($resource){
            return $resource('/weixin/customer/getCollageQRCode');
        }])
        //分享信息
        .factory('GetCollageActivityRQCode',['$resource',function ($resource){
            return $resource(collage+'product/getCollageActivityRQCode');
        }])
        /*跨境搜索页面接口*/
        .factory('FindSpecialProductList',['$resource',function ($resource){
            return $resource(product + 'findSpecialProductList')
        }])
        /*跨境订单接口*/
        .factory('GetBorderSpecialOrderListByStauts',['$resource',function ($resource){
            return $resource(collages + 'getBorderSpecialOrderListByStauts')
        }])
        /*跨境购个人的数值接口*/
        .factory('SpecialBusinessOrderNum',['$resource',function ($resource){
            return $resource(transaction + 'specialBusinessOrderNum')
        }])
        .factory('SaveSpreadCustomerInfo',['$resource',function ($resource){
            return $resource(beauty+'/spread/saveSpreadCustomerInfo')
        }])
        //获取物流信息
        .factory('GetLogisticsInfoByLogisticsNo',['$resource',function ($resource){
            return $resource(transaction + 'getLogisticsInfoByLogisticsNo')
        }])
       /*砍价列表*/
        .factory('GetBargainProductList',['$resource',function ($resource){
            return $resource(bargain + 'getBargainProductList')
        }])
      /*砍价详情*/
        .factory('GetBargainActivityDetail',['$resource',function ($resource){
            return $resource(bargain + 'getBargainActivityDetail')
        }])

      /*立即砍价*/
        .factory('CreateBargainOrder',['$resource',function ($resource){
            return $resource(bargains + 'createBargainOrder')
        }])
      /*获取砍价列表*/
        .factory('GetBargainOrderList',['$resource',function ($resource){
            return $resource(bargains + 'getBargainOrderList')
        }])
        /*好友帮砍价*/
        .factory('UserBargain',['$resource',function ($resource){
            return $resource(bargains + 'userBargain')
        }])
        .factory('GetBargainOrderDetail',['$resource',function ($resource){
            return $resource(bargains + 'getBargainOrderDetail')
        }])
        .factory('GetUserOrderByBargain',['$resource',function ($resource){
            return $resource(bargains + 'getUserOrderByBargain')
        }])
        .factory('GetBargainActivityRQCode',['$resource',function ($resource){
            return $resource(bargain + 'getBargainActivityRQCode')
        }])
        .factory('SaveShopUserOrderInfo',['$resource',function ($resource){
            return $resource(beauty + 'joinMeetting/saveShopUserOrderInfo')
        }])
        //获取用户当天打卡信息，不需要带任何参数
        .factory('GetTodayPunchClock',['$resource',function ($resource){
            return $resource(bonusPoints + 'getTodayPunchClock')
        }])
        //用户当天进行打卡，不需要带任何参数
        .factory('TodayPunchClock',['$resource',function ($resource){
            return $resource(bonusPoints + 'todayPunchClock')
        }])
        .factory('GetSevenDayPunchClock',['$resource',function ($resource){
            return $resource(bonusPoints + 'sevenDayPunchClock')
        }])
        .factory('GetSevenDayPunchClock',['$resource',function ($resource){
            return $resource(bonusPoints + 'sevenDayPunchClock')
        }])
        .factory('GetBonusPointsRecordFromUser',['$resource',function ($resource){
            return $resource(bonusPoints + 'getBonusPointsRecordFromUser')
        }])
        .factory('GetOrderTypeByTransactionId',['$resource',function ($resource){
            return $resource(transaction + 'getOrderTypeByTransactionId')
        }])
        //退款
        .factory('OrderRefundApply',['$resource',function ($resource){
            return $resource(transaction + 'orderRefundApply')
        }])
        .factory('RefundOrderDetail',['$resource',function ($resource){
            return $resource(transaction + 'refundOrderDetail')
        }])
});
