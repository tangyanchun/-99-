/**
 * 建立angular.module
 */

define(['angular'], function (angular) {
    var app = angular.module('customerApp',['ngResource','ui.router','ngSanitize','ionic',
        'oc.lazyLoad','highcharts-ng','infinite-scroll','customerGlobal','ionic-datepicker'])
        .config(['$httpProvider','Global',function($httpProvider,Global) {

            $httpProvider.interceptors.push(function(){
                return {
                    request: function(config){
                        config.headers = config.headers || {};

                        if(window.location.href.indexOf("beautyAppoint")!=-1||window.location.href.indexOf("beautyUserCenter")!=-1) {
                            window.localStorage.setItem("userType",Global.userType.BEAUTY_USER);
                        }
                        else if(window.location.href.indexOf("trainingHome")!=-1||window.location.href.indexOf("shopHome")!=-1||
                            window.location.href.indexOf("shareHome")!=-1||window.location.href.indexOf("myselfCenter")!=-1||
                            window.location.href.indexOf("beautyTraining")!=-1)
                        {
                            window.localStorage.removeItem("userType");
                        }

                        if(window.localStorage.getItem("userType")!=undefined

                            &&window.localStorage.getItem("userType")!=null)
                        {
                            config.headers.usertype = window.localStorage.getItem("userType");
                        }

                        if(window.localStorage.getItem("logintoken")!=undefined){
                            config.headers.logintoken = window.localStorage.getItem("logintoken");
                        }
                        else{
                            if(sessionStorage.getItem("logintoken")!=undefined)
                            {
                                config.headers.logintoken = sessionStorage.getItem("logintoken");
                            }
                            else {
                                var name = "logintoken";
                                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                                if(arr=document.cookie.match(reg)){
                                    config.headers.logintoken = unescape(arr[2]);
                                }
                            }
                        }

                        if(window.localStorage.getItem("beautyUserLoginToken")!=undefined
                            &&window.localStorage.getItem("beautyUserLoginToken")!=null){
                            config.headers.beautyuserlogintoken = window.localStorage.getItem("beautyUserLoginToken");
                        }

                        if(window.localStorage.getItem("beautyBossLoginToken")!=undefined
                            &&window.localStorage.getItem("beautyBossLoginToken")!=null){
                            config.headers.beautybosslogintoken = window.localStorage.getItem("beautyBossLoginToken");
                        }

                        if(window.localStorage.getItem("beautyClerkLoginToken")!=undefined
                            &&window.localStorage.getItem("beautyClerkLoginToken")!=null){
                            config.headers.beautyclerklogintoken = window.localStorage.getItem("beautyClerkLoginToken");
                        }

                        return config;
                    }
                }
            });

        }])
        .run(function($rootScope){
            $rootScope.returnRootNative = function(){
            };
            $rootScope.shopAppointInfo = {
                clerkId : '',
                shopProjectIds:[],
                shopProjectDetail:'',
                appointValue:'',
                chooseWeekDate :"",
                shopUserInfo:{}
            }
        })
    return app;
});