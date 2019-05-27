/// <reference path="../js/angular.js" />
(function () {

    var app = angular.module("app", ["ui.router"]);
    app.run(function ($rootScope) {
        $rootScope.isLogged = false;
        $rootScope.loader = false;
        var user = sessionStorage.getItem("user");
      
        console.log(user);
        if (user == null) {
            $rootScope.isLogged = false;
        }
        else {
            $rootScope.isLogged = true;
            console.log(user);
            $rootScope.user = JSON.parse(user);
        }
    });
   

    app.controller("navCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
        $scope.logout = function () {
            sessionStorage.removeItem("user");
            $rootScope.isLogged = false;
        }

    }]);

    app.controller("homeCtrl", ["$scope", function ($scope) {
        //write home controller code
    }])

})();