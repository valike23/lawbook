(()=> {
    (function() {
        'use strict';
    
        const APP = angular.module('app', ['LocalForageModule']);
        APP.run(($rootScope, $http) => {
            const ROOT = $rootScope;
            ROOT.title = "Lawbook: Everything Law";
            ROOT.header = "Lawbook";
            ROOT.openBook = function (data) {
                alert(data)
            }
           // $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
        });

        
    })();

})();