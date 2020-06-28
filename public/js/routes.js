(function() {
    'use strict';

   const ROUTES = angular.module('app');
    ROUTES.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.htm',
      controller: 'homeCtrl'
           })
       .state('lib', {
      url: '/lib',
      templateUrl: 'templates/lib.htm',
      controller: 'libCtrl'
    })
  
  
  
       $urlRouterProvider.otherwise('/home');
       
  
  
  });

})();