(function() {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('homeCtrl', homeController);
    Ctrl.controller('libCtrl', libController);

   // homeController.$inject = [''];
    function homeController($scope) {
        activate();

        function activate() {
            $scope.title= "lawbook";
         }
    }
    

    // homeController.$inject = [''];
    function libController($scope) {
        activate();

        function activate() {
            console.log("lib loaded");
        }
    }
})();