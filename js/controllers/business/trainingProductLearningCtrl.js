angular.module('controllers',[]).controller('trainingProductLearningCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetTrainingProductDetail','$sce','CreateBusinessOrder',
        'BusinessUtil','PutNeedPayOrderListToRedis','Global','GetTrainingBusinessOrder','AddTrainingProductPlayNum','$ionicLoading','$ionicPopup',
        'GetAttentionTeacherorderStatus',
        'AttentionTeacher','LoginGlobal',
        function ($scope,$rootScope,$stateParams,$state,GetTrainingProductDetail,$sce,CreateBusinessOrder,
                  BusinessUtil,PutNeedPayOrderListToRedis,Global,GetTrainingBusinessOrder,AddTrainingProductPlayNum,$ionicLoading,$ionicPopup,
                  GetAttentionTeacherorderStatus,AttentionTeacher,LoginGlobal) {

            $rootScope.title = "美享商学院";
            $scope.isMember = false;
            $scope.param = {
                tabType : 'catalog',
                playURL:'',
                playPassword:'',
                coursePassword:'course',
                inputPasswordValue:'',
                firstEnter:false,
                productId:$stateParams.productId,
                backgroudurl : ''
            }

            if($scope.param.productId=='20190121016730386764')
            {
                $scope.param.backgroudurl = "images/motherManagement.jpg";
            }
            else if($scope.param.productId!='20190121016730386764')
            {
                $scope.param.backgroudurl = "images/experienceBanner.jpg";
            }

            $scope.chooseTab = function (type) {
                $scope.param.tabType = type;
            }

            $scope.laterAdd = function(){
                $scope.addWeChat = false;
            }
            $scope.mineAdd = function(){
                AttentionTeacher.save(function(data){
                    GetAttentionTeacherorderStatus.save(function(data){

                        if(data.responseData=="true")
                        {
                            $scope.addWeChat = false;
                        }
                        else{
                            $scope.addWeChat = true;
                        }
                    })
                })
            }

            $scope.playCourse = function(name,item2,item,index)
            {
                $scope.flag = 'a'+item2.toString()+item.toString();
                BusinessUtil.twoParameters(LoginGlobal.MX_YX_YXABF,item,item2);
                $scope.param.firstEnter = true;

                //点击每一节小课查看是否购买视频
                GetTrainingBusinessOrder.get({productId:$stateParams.productId},function(data){
                    BusinessUtil.checkResponseData(data, 'trainingProductLearning&' + $scope.param.product.productId);
                    if(data.result==Global.FAILURE){
                        if(data.errorInfo=='member'){

                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">请先成为店主，在观看视频</span>',

                                buttons: [
                                    {
                                        text: '不用啦'
                                    },
                                    {
                                        onTap: function() {
                                            $state.go("shopHome")
                                        },
                                        text: '成为店主',
                                        type: 'button-calm'
                                    }
                                ]
                            });

                        }else{
                            var alertPopup = $ionicPopup.alert({
                                template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">请先购买课件，在观看视频</span>',
                                okText:'确定'
                            });
                        }

                    }
                    else if(data.result==Global.SUCCESS){
                        $("video").attr("controls","controls");

                        angular.forEach($scope.param.product.productDetail.listCourse,function(data,index,array){
                            var firstName = data.name;
                            angular.forEach(data.list,function(data2,index2,array2){
                                console.log(firstName+'&'+data2.name)
                                if(name==(firstName+'&'+data2.name))
                                {
                                    $scope.currentId = name;

                                    console.log($scope.currentId)

                                    $scope.param.playURL = angular.copy($sce.trustAsResourceUrl(data2.url));
                                    $scope.param.statisticPlayUrl = angular.copy(data2.url);
                                }
                            })
                        })
                        AddTrainingProductPlayNum.get({productId:$stateParams.productId,playURL:$scope.param.statisticPlayUrl},function(data){
                            console.log(data)
                        })
                    }
                })
            }

            $scope.inputPassword = function(){
                $scope.param.playPassword = angular.copy($scope.param.inputPasswordValue);
                $scope.param.inputPasswordValue='';
            }

            $scope.goMember = function(){
                $state.go("shopHome");
            }

            $scope.goPay = function()
            {
                BusinessUtil.twoParameters(LoginGlobal.MX_YX_SZCJ,$scope.param.product.productId);

                $scope.param.productSpec = "training";

                //先将此商品生成订单
                CreateBusinessOrder.save({businessProductId:$scope.param.product.productId,productSpec:$scope.param.productSpec,type:'training'},function (data) {
                    BusinessUtil.checkResponseData(data, 'trainingProductLearning&' + $scope.param.product.productId);

                    if (data.result == Global.FAILURE) {
                        //alert("直接购买失败");
                    }else {
                        //生成订单后再直接前往支付页面
                        var needPayOrderList = [];
                        var payOrder = {
                            orderId: data.responseData,
                            productFirstUrl: $scope.param.product.firstUrl,
                            productId: $scope.param.product.productId,
                            productName: $scope.param.product.productName,
                            productNum: 1,
                            productPrice: $scope.param.product.price,
                            productSpec: $scope.param.productSpec
                        }
                        needPayOrderList.push(payOrder);
                        //将needPayOrderList数据放入后台list中
                        PutNeedPayOrderListToRedis.save({needPayOrderList: needPayOrderList}, function (data) {
                            if (data.result == Global.SUCCESS) {
                                window.location.href = "orderPay.do?productType=trainingProduct&random=" + Math.random();
                            }
                        })
                    }
                })
            }

            $scope.$on('$ionicView.enter', function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.curriculum=true;
                GetTrainingProductDetail.get({productId:$stateParams.productId},function(data){
                    $scope.param.product = data.responseData;
                    GetTrainingBusinessOrder.get({productId:$stateParams.productId},function(data){
                        BusinessUtil.checkResponseData(data, 'trainingProductLearning&' + $scope.param.product.productId);
                        $ionicLoading.hide();
                        if(data.result==Global.SUCCESS){
                            $scope.curriculum=false;
                        }else{
                            if(data.errorInfo=='member'){
                                $scope.curriculum=false;
                                $scope.isMember = true;
                            }
                        }
                        console.log(data);
                    })
                })

                GetAttentionTeacherorderStatus.save(function(data){
                    if(data.responseData=="true") {
                        $scope.addWeChat = false;
                    }
                    else{
                        $scope.addWeChat = true;
                    }
                })

            })
        }])
