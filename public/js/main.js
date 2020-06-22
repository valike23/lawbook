(()=> {
    (function() {
        'use strict';
    
    const APP = angular.module('app', []);
     APP.run(($rootScope)=>{
        const ROOT = $rootScope;
         ROOT.title = "Lawbook: Everything Law";
         ROOT.header = "Lawbook";
     })
    })();

})();