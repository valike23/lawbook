(function() {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('homeCtrl', homeController);
    Ctrl.controller('libCtrl', libController);
    Ctrl.controller('booksCtrl', function($scope) {

        activate();
       
        function activate() {
            $scope.openBook = function (data) {
                alert(data);
            }
            new Splide('#splide--paid', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--paid', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
            new Splide('#splide--free', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--free', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
            new Splide('#splide--all', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--all', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();

            console.log("books loaded");
        }
    });
    Ctrl.controller('navCtrl', navController);
    Ctrl.controller('detailsCtrl', detailsController);
    Ctrl.controller('payCtrl', payController);

   // homeController.$inject = [''];
    function homeController($scope) {
        activate();
        function activate() {
            $scope.header = "lawbooks";
         }
    }
    function navController($scope) {
       
        activate();

        function activate() {
            $scope.title = "lawbook";
        }
    }

     
    function libController($scope) {
       
        activate();

        function activate() {
            console.log("lib loaded");
        }
    }
   

    function detailsController($scope) {
        $scope.pay = function () {
            location.href="/lib/pay";
        };
        activate();

        function activate() {
            new Splide('#splide--favorite', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--favorite', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
           
            console.log("details loaded");
        }
    }
  
    function payController($scope) {
        $scope.pay = function () {
            location.href = "/lib/pay"
        }
        activate();

        function activate() {
           
            console.log("pay loaded");
        }
    }


   
})();