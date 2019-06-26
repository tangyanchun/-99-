/**
 * Created by Administrator on 2018/11/9.
 */
angular.module('controllers',[]).controller('registrationCtrl',
    ['$scope','$rootScope','$stateParams','$state','SaveShopUserOrderInfo',
        function ($scope,$rootScope,$stateParams,$state,SaveShopUserOrderInfo) {
            var phoneReg=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|147|177)\d{8}$/;
           $scope.param={
                  SaveShopUserOrderInfo:{
                      name:"",
                      sex:"",
                      mobile:"",
                      idNo:"",
                      area:"",
                      escortName:"",
                      escortSex:"",
                      escortMobile:"",
                      escortIdNo:"",
                      investBrandLevel:"",
                      industry:""
               }
           };
           $scope.comit=function () {
               if($scope.param.SaveShopUserOrderInfo.name==""||$scope.param.SaveShopUserOrderInfo.sex==""||$scope.param.SaveShopUserOrderInfo.idNo==""||$scope.param.SaveShopUserOrderInfo.area==""||$scope.param.SaveShopUserOrderInfo.escortName==""||$scope.param.SaveShopUserOrderInfo.escortSex==""||$scope.param.SaveShopUserOrderInfo.escortIdNo==""||$scope.param.SaveShopUserOrderInfo.investBrandLevel==""||$scope.param.SaveShopUserOrderInfo.industry==""||$scope.param.SaveShopUserOrderInfo.mobile==""||$scope.param.SaveShopUserOrderInfo.escortMobile==""){
                   alert("还有信息未填哦！");
                   return;
               }
               else{
                   SaveShopUserOrderInfo.save($scope.param.SaveShopUserOrderInfo,function (data) {
                       alert("亲，报名成功");
                       $state.go("shopHome")
                   })
               }
           }
        }]);
