(() => {
    'use strict';
    const AccountsCtrl = angular.module('app');
   let accountsController = ['$scope', '$http', '$localForage', function ($scope, $http, $localForage) {
       $scope.signIn = function () {
            console.log("something",$scope.login);
            for (var property in $scope.login) {
                if (!$scope.login[property]) return;
            }
            console.log('sec', $scope.login);
            $('#toast-1').toast('show');
            $http.post('api/accounts/login', $scope.login).then(function (res) {
                let data = res.data;
                if (res.data.user) {
                    $localForage.setItem("user", res.data.user);
                    $localForage.setItem("session", res.data.session);
                    location.reload();
                }
                else {
                    $('#toast-4').toast('show');
                    $('#toast-1').toast('hide');
                }
                
            })
        }
    }]
    AccountsCtrl.controller('accountsCtrl', accountsController);
   
})()