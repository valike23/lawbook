/// <reference path="../js/angular.js" />
(function () {
    var app = angular.module("app", []);
    app.controller("loginCtrl", function ($scope, $http) {

        $scope.login = function () {
            var data = {
                email: $scope.email,
                pass: $scope.pass
            }
            $http.post('/api/login', data).then(function (res) {
                alert(res.data[0]);
            });
        }
    })

})()