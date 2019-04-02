/// <reference path="../js/angular.js" />
(function () {
    var app = angular.module("app", []);
    app.controller("loginCtrl", function ($scope, $http) {
        $scope.error = false;
        $scope.loading = true;
        $scope.login = function () {
            $scope.access = false;
            $scope.error = false;
            $scope.loading = true;
            $('#myModal').modal('show')
           
            var data = {
                email: $scope.email,
                pass: $scope.pass
            }
            $http.post('/api/login', data).then(function (res) {
             
                if (res.data[0] == undefined) {
                    $scope.error = false;
                    $scope.loading = false;
                    $scope.access = true;
                }
                else {
                    sessionStorage.setItem("user", JSON.stringify(res.data[0]));
                    location.href = "/";
                }
              
            }, function (err) {
                console.log(err);
                $scope.error = true;
                $scope.loading = false;
                $scope.access = false;
                });
        }
    })

})()