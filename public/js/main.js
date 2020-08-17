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
                let session = isLoggedIn($http, res);
                if (session) {
                    ROOT.logged = true;
                    ROOT.user = session;
                }
                else {
                    ROOT.logged = false;
                    $localForage.removeItem("user").then(function () { });
                    $localForage.removeItem("session").then(function () { });
                    return;
                }

            }, function () {
                    ROOT.logged = false;
                })
           

            function isLoggedIn(http, session) {
                http.get('/api/accounts/is_logged/' + session).then(function (res) {
                    console.log(res);
                    return res.data;
                }, function (rej) {

                })
            }

           // $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
        });

        
    })();

})();