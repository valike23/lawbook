/// <reference path="pdf.js" />
(function () {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('blogCtrl', blogController);
    Ctrl.controller('topCtrl', topController);
    Ctrl.controller('allCtrl', allController);
    Ctrl.controller('navCtrl', blogController);
    Ctrl.controller('createCtrl', createController);
    Ctrl.controller('favoritesCtrl', favoriteController);
    Ctrl.controller('contentCtrl', contentController);

    function blogController($scope, $http, $localForage) {
        $scope.navigate = function (area) {
            try {
                $localForage.getItem("session").then(function (result) {
                    console.log("result", result);
                    if (result) {
                        location.href = "/blog/author/" + result;
                    }
                    else {
                        location.href = '/login';
                    }
                })
                //var user = document.cookie;
                //user = user.split(';')[1];
                             
                //console.log('user', user);
                
                
            }
            catch (err) {
                console.log(err);
              
                
                location.href = "/blog/author/" + 'string';
            }
            
            
        
            
        }
    }
    function topController($scope, $http) {
        $scope.gotoArticle = function (article) {
            location.href = 'blog/content/' + article._id
        }
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
    function createController($scope, $http, $localForage) {
       
        class Article {
            constructor(title, image, author) {
                this.title = title;
                this.tags = [];
                this.authorId = 0;
                this.image = image;
                this.author = author;
                this.content = [];
            };
         addTag = (tag) => {
             this.tags.push(tag);
            }
            addContent = (content) => {
                this.content.push(content);
            }
            

        
        }
        class Tag {
            constructor(title, myClass) {
                this.class = myClass;
                this.title = title;
            }
        }
        class Content {
            constructor(type, data) {
                this.type = type;
                this.data = data;
            }
        }
        $scope.loader = false;
        $scope.article = new Article("", "", "");
        $scope.tag = new Tag("", "");
        $scope.content = new Content("", "");
        $scope.openTag = function () {
            $('#openTag').showMenu();
        }
        $scope.openContent = function () {
            $('#openContent').showMenu();
        }
        $scope.addTag = function () {
            $('#openTag').hideMenu();
            $scope.article.addTag($scope.tag);
            alert(`tag title is ${$scope.tag.title} and tag class is ${$scope.tag.class}`);
            console.log($scope.article);
            $scope.tag = new Tag("", "");
        }
        $scope.addContent = function () {
            $('#openContent').hideMenu();
            $scope.article.addContent($scope.content);
          //  alert(`tag title is ${$scope.tag.title} and tag class is ${$scope.tag.class}`);
            console.log($scope.article);
            $scope.content = new Content("", "");
        }
        var uploadFile = $('.upload-file');
        function activate_upload_file() {
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.article.image = e.target.result;
                        $('.file-data img').attr('src', e.target.result);
                        $('.file-data img').attr('class', 'img-fluid rounded-xs mt-4');
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
            $(".upload-file").change(function (e) {
                readURL(this);
                var fileName = e.target.files[0].name;
                $('.upload-file-data').removeClass('disabled');
                $('.upload-file-name').html(e.target.files[0].name)
                $('.upload-file-modified').html(e.target.files[0].lastModifiedDate);
                $('.upload-file-size').html(e.target.files[0].size / 1000 + 'kb')
                $('.upload-file-type').html(e.target.files[0].type)
            });
        };
        if (uploadFile.length) { activate_upload_file(); }
        $scope.submitPost = function () {
            delete ($scope.article.addContent);
            delete ($scope.article.addTag);
           
            $localForage.getItem("user").then(function (res) {
                $scope.article.author = res.firstname + " " + res.lastname;
                $scope.article.authorId = res.id;
                console.log($scope.article);
                $http.post('api/blog/create', $scope.article).then(function (res) {
                    alert("blog post created");
                    $scope.loader = true;
                    $scope.article = new Article("","","")
                }, function () {
                    alert("something went wrong");
                    $scope.loader = true;
                })
            })
            $scope.loader = true;
        }
        $scope.gotoArticle = function (article) {
            location.href = 'blog/content/' + article._id
        }
    }
})();