/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('wallCtrl', blogController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope, $localForage) {
        $localForage.getItem('myName').then(function (data) {
            var myName = data;
            console.log(data);
        }); 
        new Splide('#suggested__mobile', {
            
            perPage: 1,
            focus: 'center',
        }).mount();
        //new Splide('#suggested__desktop', {
        //    loop: true,
        //    perPage: 3,
        //    focus: 'center',
        //}).mount();

        console.log('wall controller');
        $scope.user = {
            username: "valike23",
            profilePics: "images/user.jpg"
        }
    }
   

})();