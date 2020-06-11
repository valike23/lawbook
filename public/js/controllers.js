(function() {
    'use strict';

    const Ctrl = angular.module('app');
       Ctrl.controller('homeCtrl', homeController);

   // homeController.$inject = [''];
    function homeController($scope) {
        activate();

        function activate() {
            $scope.title= "lawbook";
         }
    }
})();