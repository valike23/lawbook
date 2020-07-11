/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('wallCtrl', blogController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope) {
        console.log('blog controller');
        $scope.user = {
            username: "valike23",
            profilePics: "images/user.jpg"
        }
    }
   

})();