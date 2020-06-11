(()=> {
    (function() {
        'use strict';
    
    const APP = angular.module('app', [
        'ui.router'
     ]);
     APP.run(($rootScope)=>{
        const ROOT = $rootScope;
        ROOT.title = "Lawbook: Everything Law";
     })
    })();

})();