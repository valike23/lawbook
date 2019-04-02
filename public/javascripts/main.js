/// <reference path="../js/angular.js" />
(function () {

    var app = angular.module("app", ["ui.router"]);
    app.run(function ($rootScope) {
        $rootScope.isLogged = false;
        var user = sessionStorage.getItem("user");
        console.log(user);
        if (user == null) {
            $rootScope.isLogged = false;
        }
        else {
            $rootScope.isLogged = true;
            $rootScope.user = JSON.parse(user);
        }
    })

})();