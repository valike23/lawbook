/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('blogCtrl', blogController);
    Ctrl.controller('topCtrl', topController);
    Ctrl.controller('allCtrl', allController);
    Ctrl.controller('navCtrl', blogController);
    Ctrl.controller('favoritesCtrl', favoriteController);
    Ctrl.controller('contentCtrl', contentController);

    function blogController($scope, $http) {
        $scope.navigate = function (area) {
            try {
                var user = document.cookie;
                user = user.split(';')[1];
                             
                console.log('user', user);
                
                location.href = "/blog/author/" + user;
            }
            catch (err) {
                console.log(err);
              
                
                location.href = "/blog/author/" + 'string';
            }
            
            
        
            
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
        $scope.gotoArticle = function (article) {
           location.href= 'blog/content/'+ article._id
        }
    }
    function favoriteController($scope, $http) {
        (()=>{
            $http.get('api/blog/favorite/1/1' ).then(function (res) {
                console.log(res.data.length);
                $scope.articles = res.data;

            }, function(err){
console.log(err);
$scope.articles = [];
            })
        })()
    }
    function contentController($scope, $http) {
        $http.get('api/blog/content/' + (location.pathname).split('/')[3]).then(function (res) {
            console.log(res.data);
            $scope.content = res.data;
        });
        $http.get('api/blog/related/' ).then(function (res) {
            console.log(res.data);
            $scope.articles = res.data;
        })
    }

})();