/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.run(function ($localForage, $rootScope) {
        var data = $localForage.getItem('session');
        data.then(function (result) {
            console.log("data", result);
            if (!result) {
                $("#menu-signin").addClass('menu-active'); $('#footer-bar').addClass('footer-menu-hidden'); setTimeout(function () { $('.menu-hider').addClass('menu-active'); }, 250);
            } else {
                $('#toast-8').toast('show');
                $rootScope.user = $localForage.getItem('user');
                $rootScope.user.then((res) => {
                    $rootScope.user = res;
                    console.log($rootScope.user)
                })

            }
           
        })
       
      })
    Ctrl.controller('wallCtrl', wallController);
    Ctrl.controller('navCtrl', wallController);

    function wallController($scope, $localForage, $rootScope, $http) {
        $scope.uploadPost = function () {
            if ($scope.text) {
                $('#toast-1').toast('show');

                $http.post("/api/social/create", { post: $scope.text }, {
                    headers: { Authorization: $scope.session }
                }).then(function (res) {
                    $scope.text = "";
                    $('#toast-1').toast('hide');
                    $('#toast-5').toast('show');
                }, function (err) {
                    console.log(err);
                    $('#toast-1').toast('hide');
                    $('#toast-4').toast('hide');
                    })
            }
           
        }
        $localForage.getItem("session").then(function (res) {
            $scope.retrieve = true;
            $scope.session = res;
            console.log('rash',res);
            $http.get('/api/social/all/1', {
                headers: { Authorization: res}}).then(function (res) {
                $scope.retrieve = false;
                $scope.posts = res.data;
                console.log($scope.posts);
                }, function (err) {
                    $scope.retrieve = false;
                $('#toast-4').toast('show');
            })
        })
        console.log($rootScope.user);
        new Splide('#suggested__mobile', {
            
            perPage: 1,
            focus: 'center',
        }).mount();
        new Splide('#request__mobile', {

            perPage: 1,
            focus: 'center',
        }).mount();
        

        console.log('wall controller');
       
    }
   

})();