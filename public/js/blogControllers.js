/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('blogCtrl', blogController);
    Ctrl.controller('topCtrl', topController);
    Ctrl.controller('navCtrl', blogController);

    function blogController($scope) {
        console.log('blog controller');
    }
    function topController($scope) {
        
        activate();
        function activate() {
            console.log('top blog controller');
            $scope.articles = [
                {
                    title:'Law school students makes first class',
                    image: 'images/blog/school.jpg', 
                    author: 'Emmanuel Valentine',
                    tags: [{
                        title: 'family law',
                        class: 'bg-primary tags'
                    },
                        {
                            title: 'Law School',
                            class: 'bg-secondary tags'
                        }]
                },
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
                },
                {
                    title: 'Nigeria Senate passes electoral act into law overriding the President',
                    image: 'images/blog/senate.jpg',
                    author: 'Kelvin Law',
                    tags: [{
                        title: 'Constitutional law',
                        class: 'bg-green1-dark tags'
                    }]
                }
            ]
        }
    }
   

})();