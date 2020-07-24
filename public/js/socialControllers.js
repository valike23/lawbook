/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('wallCtrl', blogController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope) {
        new Splide('#suggested__mobile', {
            
            perPage: 2,
            focus: 'center',
        }).mount();
        console.log('wall controller');
        $scope.user = {
            username: "valike23",
            profilePics: "images/user.jpg"
        }
    }
   

})();