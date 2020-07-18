/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('blogCtrl', blogController);
    Ctrl.controller('topCtrl', topController);
    Ctrl.controller('allCtrl', allController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope, $http) {
        $scope.navigate = function(area){
            var user = JSON.parse(sessionStorage.getItem('user'));
            location.href = "/blog/author/" + 'mysession';
        }
    }
    function topController($scope, $http) {
        
        activate();
        function activate() {
            console.log('top blog controller');
            $http.get('/api/blog/top/1').then(function (res) {
                $scope.articles = res.data;
                console.log($scope.articles);
            }, function (err) {

            })
        }
    }
    function allController($scope, $http) {

        activate();
        function activate() {
            $http.get('/api/blog/all/1').then(function (res) {
                $scope.articles = res.data;
                console.log($scope.articles);
            }, function (err) {

            })
            console.log('all blog controller');
            $scope.article = [
              
                {
                    title: 'Law school produces 147 first class',
                    image: 'images/blog/bar.jpg',
                    author: 'Akpros Law',
                    tags: [{
                        title: 'family law',
                        class: 'bg-primary tags'
                    },
                    {
                        title: 'Law School',
                        class: 'bg-secondary tags'
                    }]
                }
               
            ]
        }
    }


})();