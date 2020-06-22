(function() {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('homeCtrl', homeController);
    Ctrl.controller('libCtrl', libController);
    Ctrl.controller('booksCtrl', booksController);
    Ctrl.controller('navCtrl', navController);

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
            new Splide( '#splide', {
                type   : 'loop',
                perPage: 3,
                focus  : 'center',
            } ).mount();
            console.log("books loaded");
        }
    }
})();