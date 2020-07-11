/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('blogCtrl', blogController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope) {
        console.log('blog controller');
    }
   

})();