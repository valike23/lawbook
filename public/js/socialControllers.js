/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.run(function ($localForage, $rootScope) {
        var data = $localForage.getItem('session');
        data.then(function (result) {
            console.log("data", result);
            if (!result) {
                $("#menu-signin").addClass('menu-active'); $('#footer-bar').addClass('footer-menu-hidden'); setTimeout(function () { $('.menu-hider').addClass('menu-active'); }, 250);
            } else {
                $('#toast-8').toast('show');
                $rootScope.user = $localForage.getItem('user');
                $rootScope.user.then((res) => {
                    $rootScope.user = res;
                    console.log($rootScope.user)
                })

            }
           
        })
       
      })
    Ctrl.controller('wallCtrl', blogController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope, $localForage, $rootScope) {
        console.log($rootScope.user);
        new Splide('#suggested__mobile', {
            
            perPage: 1,
            focus: 'center',
        }).mount();
        new Splide('#request__mobile', {

            perPage: 1,
            focus: 'center',
        }).mount();
        //new Splide('#suggested__desktop', {
        //    loop: true,
        //    perPage: 3,
        //    focus: 'center',
        //}).mount();

        console.log('wall controller');
       
    }
   

})();