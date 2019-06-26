/**
 * Created by Administrator on 2018/7/27.
 */
angular.module('controllers',[]).controller('classificationCtrl',
    ['$scope','$rootScope','$stateParams','$state',"$ionicLoading","GetOneProductClassList","GetTwoProductClassList",'Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetOneProductClassList,GetTwoProductClassList,Global) {
            $scope.getInfo=function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.productClassDTO={
                };
                $scope.arr=[
                    {
                        "name":"护肤类",
                        smallArr:[]
                    },
                    {
                        "name":"美妆类",
                        smallArr:[]
                    },
                    {
                        "name":"代餐类",
                        smallArr:[]
                    },
                    {
                        "name":"套组系列",
                        smallArr:[]
                    },
                    {
                        "name":"家居美肤仪",
                        smallArr:[]
                    },
                    {
                        "name":"个人护理类",
                        smallArr:[]
                    }

                ];
                GetOneProductClassList.save($scope.productClassDTO,function (data) {
                    $ionicLoading.hide();
                    if(data.result==Global.SUCCESS&&data.responseData!=null)
                    {
                        $scope.param.firstList=data.responseData;
                    }
                    $scope.checkBox(0,$scope.param.firstList[0].productClassId)
                });

                $scope.checkBox=function(index,productClassId) {
                    $scope.param.selection=index;
                    GetTwoProductClassList.get({productClassId:productClassId},function (data) {
                        console.log(data);
                        if(data.result==Global.SUCCESS&&data.responseData!=null)
                        {
                            $scope.param.twoList=data.responseData;
                        }
                        if($scope.param.selection == 6){
                            $scope.arr=[
                                {
                                    "name":"护肤类",
                                    smallArr:[]
                                },
                                {
                                    "name":"美妆类",
                                    smallArr:[]
                                },
                                {
                                    "name":"代餐类",
                                    smallArr:[]
                                },
                                {
                                    "name":"套组系列",
                                    smallArr:[]
                                },
                                {
                                    "name":"家居美肤仪",
                                    smallArr:[]
                                },
                                {
                                    "name":"个人护理类",
                                    smallArr:[]
                                }

                            ];
                            console.log($scope.param.selection);
                            for(var j=0;j<$scope.param.firstList.length;j++){
                                for(var i=0;i<$scope.param.twoList.length;i++){
                                    if($scope.param.firstList[j].productClassId==$scope.param.twoList[i].parentId){
                                        $scope.arr[j].smallArr.push($scope.param.twoList[i]);
                                        /* console.log(j)
                                         console.log(i)*/
                                    }
                                }}
                            console.log( $scope.arr)
                        }
                    });

                };

            };

            $scope.$on('$ionicView.enter', function() {
                $scope.param={
                    firstList:{},
                    twoList:{},
                    selection:"0"
                };
                $scope.getInfo();
            });
            /*点击 搜索进入搜索页面*/
            $scope.search=function () {
                $state.go("searchPage")
            };
            /*点击二级类目商品跳转到具体页面*/
            $scope.specific=function (id) {
                $state.go("specificGoods",{id:id})
            }
        }]);