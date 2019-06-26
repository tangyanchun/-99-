/**
 * Created by Administrator on 2018/9/5.
 */
angular.module('controllers',[]).controller('searchSpecialCtrl',
    ['$scope','$rootScope','$stateParams','$state',"FindSpecialProductList","$ionicPopup",
        function ($scope,$rootScope,$stateParams,$state,FindSpecialProductList,$ionicPopup) {
            $scope.$on('$ionicView.enter', function() {
                $scope.param={
                    productName:"",
                    productList:[],
                    commodityArray:[],
                    record:false,
                    productShow:false
                };

                $("#searchbox").focus();

                /*点击商品进入商品详情*/
                $scope.enterDetails=function(item){
                    $state.go("offlineProductDetail",{productId:item})
                };
                $scope.checkInput=function () {
                    if(localStorage.getItem("historyText")!=undefined){
                        $scope.param.commodityArray=JSON.parse(localStorage.getItem("historyText"))
                    }
                    if($scope.param.commodityArray.length>=1){
                        $scope.param.record=true;
                    }

                    $scope.param.productShow=false;
                };
                /*清楚历史记录*/
                $scope.clearText=function () {
                    var alertPopup = $ionicPopup.alert({
                        title: '<span style="font-family: PingFang-SC-Bold;font-size: 20px;letter-spacing: 0.47px;line-height: 16px;">提示</span>',
                        template: '<span style="font-size:16px;color: #4A4A4A;"> 你确定清空历史搜索记录</span>',
                        buttons: [
                            {
                                text: '否'
                            },
                            {
                                onTap: function() {
                                    localStorage.removeItem("historyText");
                                    $scope.param.commodityArray=[];
                                    $scope.param.record=false;
                                },
                                text: '是',
                                type: 'button-assertive'
                            }

                        ]

                    });

                }
            });
            $scope.search=function () {
                $scope.PageParamDTO ={
                    pageNo:0,
                    pageSize:100,
                    requestData:{
                        productName:$scope.param.productName
                    }
                };
                FindSpecialProductList.save($scope.PageParamDTO,function (data) {
                    $scope.param.productList=data.responseData;
                    $scope.param.productShow=true;
                });
                if($scope.param.productName!=""){
                    $scope.param.commodityArray.push($scope.param.productName);
                    localStorage.setItem('historyText',JSON.stringify($scope.param.commodityArray));
                }
            };
        }]);