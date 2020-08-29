(()=> {
    (function() {
        'use strict';
    
        const APP = angular.module('app', ['LocalForageModule']);
        APP.run(($rootScope, $http, $localForage) => {
            const ROOT = $rootScope;
            ROOT.title = "Lawbook: Everything Law";
            ROOT.header = "Lawbook";
            ROOT.openBook = function (data) {
                alert(data)
            }
            $localForage.getItem("session").then(function (res) {
              
                
                $http.get('/api/accounts/is_logged/' + res).then(function (resd) {
                    console.log("sessions", resd);
                        if (resd.data) {
                            ROOT.logged = true;
                            ROOT.user = {};
                            console.log(ROOT.user);
                            return;
                        }
                        else {
                            ROOT.logged = false;
                            $localForage.removeItem("user").then(function () { });
                            $localForage.removeItem("session").then(function () { });

                            return;
                        }
                    }, function (rej) {

                    })
                

              
            
            }, function () {
                    ROOT.logged = false;
                })
           

        
           // $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
        });

        
    })();

})();