

(()=> {
    (function() {
        'use strict';
    
        const APP = angular.module('app', ['LocalForageModule']);
        APP.run(($rootScope, $http, $localForage) => {
            const ROOT = $rootScope;
            ROOT.title = "Lawbook: Everything Law";
            ROOT.header = "Lawbook";
            ROOT.logOut = function(){
                $localForage.removeItem("user").then(function(res){
                    $localForage.removeItem("session").then(function(res){
                        ROOT.logged = false;
                        ROOT.user = {};
alert("logged out");
                    })
                })
            }
            ROOT.openBook = function (data) {
                alert(data)
            }
            $localForage.getItem("user").then(function (res) {
              
                if(res){
                    ROOT.logged = true;
                    ROOT.user = res;
                    console.log('user',res);

                }
               
                

              
            
            }, function () {
                    ROOT.logged = false;
                })
           

        
           // $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
        });

        
    })();

})();