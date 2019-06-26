/**
 * Created by Administrator on 2018/3/1.
 */
angular.module('controllers',[]).controller('beansCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetTodayPunchClock','TodayPunchClock','GetUserInfo','$ionicLoading','$timeout','GetSevenDayPunchClock','GetUserInfoIncome','GetBonusPointsDetail','BusinessUtil','GetBonusActivityList','Global','GetBonusPointsRecordFromUser','GetAllAward','GetUserGift','GetUserInfoByOpenId','$ionicPopup',
        function ($scope,$rootScope,$stateParams,$state,GetTodayPunchClock,TodayPunchClock,GetUserInfo,$ionicLoading,$timeout,GetSevenDayPunchClock,GetUserInfoIncome,GetBonusPointsDetail,BusinessUtil,GetBonusActivityList,Global,GetBonusPointsRecordFromUser,GetAllAward,GetUserGift,GetUserInfoByOpenId,$ionicPopup) {

        $rootScope.title = "我的享豆";
        $scope.param={
            sign:false,
            bonusPointsDTO:{},
            data:[],
            isLogin:false,
        };
        $scope.bonusPointsProductInfo = []
        $scope.index='';
        $scope.productName='';
        /*初始化img图片，防止未加载，或者没有登录导致变形*/
            $scope.param.data= [
                {
                    "id": "9",
                    "name": "999享豆",
                    "url": "images/享豆_03.png",
                    "sort": 1,
                },
                {
                    "id": "11",
                    "name": "腮红唇彩",
                    "url": "images/享豆_03.png",
                    "sort": 2,

                },
                {
                    "id": "7",
                    "name": "666享豆",
                    "url": "images/享豆_03.png",
                    "sort": 3,
                },
                {
                    "id": "5",
                    "name": "300享豆",
                    "url": "images/享豆_03.png",
                    "sort": 4,
                },
                {
                    "id": "10",
                    "name": "谢谢参与",
                    "url": "images/享豆_03.png",
                    "sort": 5,
                },
                {
                    "id": "4",
                    "name": "200享豆",
                    "url": "images/享豆_03.png",
                    "sort": 6
,                },
                {
                    "id": "3",
                    "name": "100享豆",
                    "url": "images/享豆_03.png",
                    "sort": 7,
                },
                {
                    "id": "14",
                    "name": "精油皂",
                    "url": "images/享豆_03.png",
                    "sort": 8,
                },
                {
                    "id": "1",
                    "name": "洗发水",
                    "url": "images/享豆_03.png",
                    "sort": 9,
                },
                {
                    "id": "6",
                    "name": "500享豆",
                    "url": "images/享豆_03.png",
                    "sort": 10,
                },
                {
                    "id": "13",
                    "name": "遮瑕液",
                    "url": "images/享豆_03.png",
                    "sort": 11,

                },
                {
                    "id": "2",
                    "name": "10享豆",
                    "url": "images/享豆_03.png",
                    "sort": 12,

                },
                {
                    "id": "16",
                    "name": "谢谢参与",
                    "url": "images/享豆_03.png",
                    "sort": 13
                },
                {
                    "id": "15",
                    "name": "睫毛膏",
                    "url": "images/享豆_03.png",
                    "sort": 14
                },
                {
                    "id": "12",
                    "name": "指缘油",
                    "url": "images/享豆_03.png",
                    "sort": 15
                },
                {
                    "id": "8",
                    "name": "888享豆",
                    "url": "images/享豆_03.png",
                    "sort": 16,

                }
            ]

            $scope.$on('$ionicView.enter', function() {
            GetUserInfo.save(function (data) {
                if(data.result=='0x00001'){
                    $scope.param.isLogin=true;
                    /* 获取所有奖品信息*/
                    GetAllAward.save(function (data) {
                        $scope.param.data=data.responseData;
                    })
                    GetTodayPunchClock.save(function (data) {
                        if(data.result=="0x00001"){/*打卡成功显示已签到*/
                            $scope.param.sign=true
                        }else{
                            $scope.param.sign=false/*未打卡*/
                        }
                    });

                    /*连续七天打卡接口*/
                    $scope.days = ['1天', '2天', '3天', '4天', '5天', '6天', '7天'];
                    $scope.bounsImages=[
                        {
                            greyImg:"images/10_03.png",
                            redImg:"images/10-selected.jpg"
                        },
                        {
                            greyImg:"images/20_03.png",
                            redImg:"images/20-selected.jpg"
                        },
                        {
                            greyImg:"images/30_03.png",
                            redImg:"images/30-selected.jpg"
                        },
                        {
                            greyImg:"images/40_03.png",
                            redImg:"images/40-selected.jpg"
                        },
                        {
                            greyImg:"images/50_03.png",
                            redImg:"images/50-selected.jpg"
                        },
                        {
                            greyImg:"images/60_03.png",
                            redImg:"images/60-selected.jpg"
                        }, {
                            greyImg:"images/70_03.png",
                            redImg:"images/70-selected.png"
                        }
                    ];
                    GetSevenDayPunchClock.get(function (data) {
                        BusinessUtil.checkResponseData(data, 'beans');
                        /*一周签到情况*/
                        $scope.sevenDay = data.responseData.punchClockList;
                        /*连续签到天数*/
                        $scope.totlePunch = data.responseData.continuePunchClockDay;
                        $scope.sevenDay.map(function (item, index) {
                            item.days = $scope.days[index];
                            item.bounsImages=$scope.bounsImages[index]
                        });
                        seven($scope.totlePunch);
                    });
                    function seven(number) {
                        for (var i = 0; i < $scope.sevenDay.length; i++) {
                            $scope.sevenDay[i].punchClockStatus = "0";
                        }
                        if (number > 7) {
                            number = 7;
                        }
                        for (var i = 0; i < number; i++) {
                            $scope.sevenDay[i].punchClockStatus = "1";

                        }
                    }

                    /*总的享豆数量*/
                    $scope.bonusPoints = 0;
                    GetUserInfoIncome.get(function (data) {
                        if (data.responseData != null) {
                            GetBonusPointsDetail.get(function (data) {
                                if (data.result == '0x00001') {
                                    $scope.param.bonusPointsDTO = data.responseData;
                                    $scope.bonusPoints = data.responseData.bonusPoints;
                                }
                            });
                        }
                    });
                    /*点击签到*/
                    $scope.sign=function () {
                        TodayPunchClock.get(function (data) {
                            if(data.result=='0x00001'){
                                $scope.param.sign=true
                            }
                            $scope.totlePunch=$scope.totlePunch+1;
                            seven($scope.totlePunch);
                            GetUserInfoIncome.get(function(data){
                                if(data.responseData!=null){
                                    GetBonusPointsDetail.get(function (data) {
                                        if(data.result=='0x00001'){
                                            $scope.param.bonusPointsDTO =data.responseData;
                                            $scope.bonusPoints= data.responseData.bonusPoints;
                                        }
                                    });
                                }
                            })
                        });
                    };

                }else{
                    $scope.param.isLogin=false;
                }
            })

            /*交易类表页面*/
            $scope.transactions=function () {
             $state.go("listTransactions")
            };
            /*规则*/
            $scope.rule=function () {
               $state.go("signRule")
            };
            /*分享*/
            $scope.goShare=function () {
                GetUserInfoByOpenId.get(function(data){
                        if(data.responseData.userType=="business-A-1"||data.responseData.userType=="business-B-1"
                            ||data.responseData.userType=="business-C-1"){
                            $state.go("sharePage",{reload:true,userPhone:data.responseData.mobile});
                        }

                })
            }
            $scope.enterDetails=function (item) {
                if(!$scope.param.isLogin){
                    GetUserInfo.save(function (data) {
                         BusinessUtil.checkResponseData(data,'beans');
                    })
                }else{
                    if(item.bonusPointsNum > $scope.bonusPoints){
                        alert("抱歉，您的积分不足,此产品换购至少需要"+item.bonusPointsNum+"积分");
                        return;
                    }else{
                        $state.go("integralDetails",{bonusPointsId:item.id})
                    }
                }

            };
            $scope.isLoginClickEvent=function (tag,item) {
                GetUserInfo.save(function (data) {
                    if(data.result=='0x00001'){
                        $scope.param.isLogin=true;
                        if(tag=='sign'){
                            $scope.sign();
                        }else if(tag=='share'){
                            $scope.goShare();
                        }else if(tag=='transactions'){
                            $scope.transactions();
                        }else if(tag=='rule'){
                            $scope.rule();
                        }else if(tag=='finishSign'){
                            $scope.finishSign();
                        }else if(tag=='finishSign'){
                            $scope.finishSign();
                        }
                    }else if(data.result=='0x00002'){
                        BusinessUtil.checkResponseData(data,'beans');
                    }
                });
            }
            var lottery={
                index:-1,	//当前转动到哪个位置，起点位置
                count:0,	//总共有多少个位置
                timer:0,	//setTimeout的ID，用clearTimeout清除
                speed:20,	//初始转动速度
                times:0,	//转动次数
                cycle:10,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize:-1,	//中奖位置
                name:'',    //奖品的名称
                init:function(id){
                    if ($("#"+id).find(".lottery-unit").length>0) {
                        $lottery = $("#"+id);
                        $units = $lottery.find(".lottery-unit");
                        this.obj = $lottery;
                        this.count = $units.length;
                        $lottery.find(".lottery-unit-"+this.index).addClass("active");
                    };
                },
                roll:function(){
                    var index = this.index;
                    var count = this.count;
                    var lottery = this.obj;
                    $(lottery).find(".lottery-unit-"+index).removeClass("active");
                    index += 1;
                    if (index>count-1) {
                        index = 0;
                    };
                    $(lottery).find(".lottery-unit-"+index).addClass("active");
                    this.index=index;
                    return false;
                },
                stop:function(index){
                    this.prize=index;
                    return false;
                }
            };
            function roll(){
                lottery.times += 1;
                lottery.roll();
                if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
                    if(lottery.index==4||lottery.index==12){
                        $timeout(function (){
                            alert('抱歉您没有抽到奖励，再接再厉哦!')
                        },100)
                    }else if(lottery.index==1||lottery.index==7||lottery.index==8||lottery.index==10||lottery.index==13||lottery.index==14){
                        var proStr = "恭喜您，抽到了商品"+$scope.productName+'点击确定，填写个人信息，商品很快就会邮到哦！';
                        $timeout(function () {
                            alert(proStr);
                            $state.go('pointsRedemptAddress',{recordId:$scope.businessAwardUserRecord.id});
                        },100)

                    }else{
                        var str = "恭喜您，抽到了"+$scope.productName;
                        $timeout(function () {
                            GetUserInfoIncome.get(function (data) {
                                if (data.responseData != null) {
                                    GetBonusPointsDetail.get(function (data) {
                                        if (data.result == '0x00001') {
                                            $scope.param.bonusPointsDTO = data.responseData;
                                            $scope.bonusPoints = data.responseData.bonusPoints;
                                        }
                                    });
                                }
                            });
                            alert(str);
                        },100)
                    }
                    $timeout.cancel(lottery.timer);
                    lottery.prize=-1;
                    lottery.times=0;
                    $scope.click=false;
                }else{
                    if (lottery.times<lottery.cycle) {
                        lottery.speed -= 10;
                    }else if(lottery.times==lottery.cycle) {
                        //用户抽奖接口
                         lottery.prize = $scope.index;
                    }else{
                        if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==14) || lottery.prize==lottery.index+1)) {
                            lottery.speed += 110;
                        }else{
                            lottery.speed += 20;
                        }
                    }
                    if (lottery.speed<40) {
                        lottery.speed=40;
                    };
                    //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                    lottery.timer = $timeout(roll,lottery.speed);
                }

                return false;
            }
            //中奖记录
            $scope.businessAwardUserRecord = {}
             $scope.click=false;
                lottery.init('lottery');
                $(".start").click(function(){
                    if(!$scope.param.isLogin){
                        GetUserInfo.save(function (data) {
                            BusinessUtil.checkResponseData(data,'beans');
                        })
                    }else{
                        $(this).css({opacity:0.8});
                        var $this= $(this);
                        $timeout(function () {
                            $this.css({opacity:1});
                        },200);
                        if($scope.click) {
                            return false;
                        }
                        else{
                            lottery.speed=100;
                            $scope.click=true;
                            /*点击抽奖事件。触发判断*/
                            var p = new Promise(function (resolve,reject) {
                                GetUserGift.save(function (data) {
                                    $scope.businessAwardUserRecord = data.responseData
                                    if(data.result == '0x00022'){
                                        alert("积分不足无法抽奖！");
                                        $scope.click=false;

                                    }else if(data.result == '0x00023'){
                                        alert("您今日抽奖次数已用完！");
                                        $scope.click=false;

                                    }else if(data.result=='0x00001'){
                                        $scope.index = data.responseData.businessAward.sort-1;
                                        $scope.productName=data.responseData.businessAward.name;
                                        resolve();
                                    }
                                })
                            })
                            p.then(function (value) {
                                roll();
                                return false;
                            })
                        }
                    }

                });
        })

/*点击已签到按钮*/
        $scope.finishSign=function () {
           showToast("亲，你已经签到过啦");
           hideToast();
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
        $scope.PageParamVoDTO ={
            pageNo:0,
            pageSize:20,
            requestData:{
                activityStatus:'1'
            }
        }
        GetBonusActivityList.save(
            $scope.PageParamVoDTO
            ,function(data){
                if(data.result == Global.SUCCESS){
                    $scope.bonusPointsProductInfo = data.responseData.responseData
                }
            })

}]);
