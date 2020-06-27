(function() {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('homeCtrl', homeController);
    Ctrl.controller('libCtrl', libController);
    Ctrl.controller('booksCtrl', booksController);
    Ctrl.controller('navCtrl', navController);
    Ctrl.controller('detailsCtrl', detailsController);

   // homeController.$inject = [''];
    function homeController($scope) {
        activate();
        function activate() {
            $scope.title= "lawbook";
         }
    }
    function navController($scope) {
       
        activate();

        function activate() {
            $scope.title = "lawbook";
        }
    }

    // homeController.$inject = [''];
    function libController($scope) {
       
        activate();

        function activate() {
            console.log("lib loaded");
        }
    }
    function booksController($scope) {
        
        activate();

        function activate() {
            new Splide( '#splide--paid', {
                type   : 'loop',
                perPage: 4,
                focus  : 'center',
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
    }
    function detailsController($scope) {

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
})();