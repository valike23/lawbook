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
    app.controller("profileCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
        if ($rootScope.isLogged == false) {
            console.log(location);
            location.href = '/';
        }
    }])

    app.controller("bookCtrl", ["$scope", "$http", function ($scope, $http) {
        console.log("we are ok");
        $http.get("/api/books").then(function (res) {

            if (res.data.length > 0) {

                $scope.books = res.data;
            }
            else {
                console.log("no available book in store");
            }

        }, function (err) {
            console.log("failed to load books");
            console.log(err);
            });

    }])

})();