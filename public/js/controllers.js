/// <reference path="pdf.js" />
(function() {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('homeCtrl', homeController);
    Ctrl.controller('libCtrl', libController);
    Ctrl.controller('accountsCtrl', accountsController);
    Ctrl.controller('booksCtrl', function($scope) {

        activate();
       
        function activate() {
            $scope.openBook = function (data) {
                alert(data);
            }
            new Splide('#splide--paid', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--paid', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
            new Splide('#splide--free', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--free', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
            new Splide('#splide--all', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--all', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();

            console.log("books loaded");
        }
    });
    Ctrl.controller('navCtrl', navController);
    Ctrl.controller('detailsCtrl', detailsController);
    Ctrl.controller('payCtrl', payController);
    Ctrl.controller('statusCtrl', statusController);
    Ctrl.controller('readCtrl', readController);
    Ctrl.controller('favoriteCtrl', favoriteController);

   // homeController.$inject = [''];
    function homeController($scope, $http, $localForage) {
        $localForage.setItem('myName', 'Olivier Combe').then(function () {
            $localForage.getItem('myName').then(function (data) {
                var myName = data;
                console.log(data);
            });
        });
        $scope.gotoArticle = function (article) {
            location.href = 'blog/content/' + article._id
        }
        activate();
        function activate() {

            $scope.header = "lawbooks";
            new Splide('#splide--free', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--testimonial', {
                type: 'loop',
                perPage: 1,
                autoplay: true,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--free', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
           
            $http.get('api/home/blog').then(function (res) {
                
                $http.get('api/home/personalities').then(function (res) {
                    $scope.personalities = res.data;
                    console.log('app');

                })
                let temp = res.data;
                $scope.articles = [];
                for (var i = 0; i < temp.length; i++) {
                    if (i < 3) {
                        $scope.articles.push(temp[i])
                    }
                }
                console.log('blogs');

            })
           

        }

        $scope.openPerson = function (data) {
            $('#personality').modal('show');
            $scope.person = data;
        }
    }

    function accountsController($scope, $http, $localForage) {
        (() => {
            $http.get('api/util/get_all_countries').then((res) => {
                console.log(res);
                $scope.countries = res.data;
            })
            console.log('accounts');
        })();
        $scope.user = {};
        $scope.loader = false;
        $scope.login = {};
        $scope.signIn = function () {
            console.log($scope.login);
            for (var property in $scope.login) {
                if (!$scope.login[property]) return;
            }
            console.log('sec', $scope.login);
            $scope.loader = true;
            $http.post('api/accounts/login', $scope.login).then(function (res) {
                let data = res.data;
                console.log(data);
                $localForage.setItem("user", data.user).then(function () {
                    $localForage.setItem("session", data.session).then(function () {
                    window.history.back();
                    })
                })
               
               
            }, function (err) {
                $scope.err = err.data;
                $scope.loader = false;
                $('#snackbar-3').toast('show');
                console.log(err);
                 
                })
        }
        $scope.register = function () {
            console.log($scope.user);
            for (var property in $scope.user) {
                if (!$scope.user[property]) return;
            }
            if ($scope.user.password !== $scope.confirm) return;
           // $scope.post('')

        }
       

    }

    function navController($scope) {
       
        activate();

        function activate() {
            $scope.title = "lawbook";
        }
    }

     
    function libController($scope) {
       
        activate();

        function activate() {
            console.log("lib loaded");
        }
    }
   

    function detailsController($scope) {
        $scope.pay = function () {
            location.href="/lib/pay";
        };
        activate();

        function activate() {
            new Splide('#splide--favorite', {
                type: 'loop',
                perPage: 4,
                focus: 'center',
            }).mount();
            new Splide('#splide--mobile--favorite', {
                type: 'loop',
                perPage: 2,
                focus: 'center',
            }).mount();
           
            console.log("details loaded");
        }
    }
  
    function payController($scope) {
        $scope.pay = function () {
            location.href = "/lib/pay"
        }
        activate();

        function activate() {
           
            console.log("pay loaded");
        }
    }
    function statusController($scope, $http, $localForage) {
        $scope.readStatus = (book) => {
            $localForage.setItem("book", book).then(function (res) {
                alert(JSON.stringify(res));
                location.href = '/lib/read';
            });
           
       }
        activate();

        function activate() {
            $http.get('api/lib/book/statuses').then(function (res) {
                $scope.statuses = res.data;
            })
           
            console.log("status loaded");
        }
    }
    function readController($scope, $localForage, $http, $rootScope) {
       
        $scope.$watch('page', function (oldValue, newValue) {
            console.log("new value", oldValue);
            if (oldValue > $scope.totalPage) {
                $scope.page = $scope.totalPage;
                return;
            };
             myState.currentPage = oldValue;

            render();
        });
        $scope.$watch('zoom', function (oldValue, newValue) {
            myState.zoom = $scope.zoom;
            render();
        })
        $scope.goForward = function () {
            $scope.page = $scope.page + 1; 
        }
        $scope.zoomIn = function () {
            $scope.zoom = $scope.zoom + 1;
        }
        $scope.zoomOut = function () {
            $scope.zoom = $scope.zoom - 1;
        }
        $scope.goBackward = function () {
            $scope.page = $scope.page -1;
        }
        $scope.toggleFav = function (data) {
            if ($scope.user) {
                if (data) {
                    $scope.favorite = false;
                }
                else {
                    $scope.favorite = true;
                }
            }
            else {
                alert("you have to be logged in ")
            }
          
        }
        var myState;
        (() => {
            $localForage.getItem('book').then(function (res) {
                $scope.book = res;
                $scope.zoom = 1;
                $scope.page = 1;
                myState = {
                    pdf: null,
                    currentPage: $scope.page,
                    zoom: $scope.zoom
                };
                pdfjsLib.getDocument($scope.book.secure_content).then((pdf) => {

                    $scope.totalPage = pdf.numPages;
                    myState.pdf = pdf;
                    render();
                    console.log("workign");
            })
             
            });
          
        })();

        function render() {
            myState.pdf.getPage(myState.currentPage).then((page) => {

                var canvas = document.getElementById("the-canvas");
                var ctx = canvas.getContext('2d');

                var viewport = page.getViewport(myState.zoom);
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                page.render({
                    canvasContext: ctx,
                    viewport: viewport
                });

            });
        }

    }
    function favoriteController($scope){
        let setAllBtnDefault = ( btn ) =>{
            allBtn.style.backgroundColor = "#f0d377";
            booksBtn.style.backgroundColor = "#f0d377";
            casesBtn.style.backgroundColor = "#f0d377";
            statutesBtn.style.backgroundColor = "#f0d377";
            btn.style.backgroundColor = "red"
            }
            
        let booksBtn, casesBtn, statutesBtn, allBtn;
       ( ()=>{
        allBtn = document.getElementById("all");
        booksBtn = document.getElementById("books");
        casesBtn = document.getElementById("cases");
        statutesBtn = document.getElementById("statutes");
        setAllBtnDefault(allBtn);
       })();

       $scope.toggleSearch = function( filter ){
switch (filter) {
    case 'all':
setAllBtnDefault( allBtn);
        
        break;
    case 'books':
        setAllBtnDefault( booksBtn);
                    
        break;
    case 'cases':
        setAllBtnDefault( casesBtn);
                                
        break;
    case 'statutes':
        setAllBtnDefault( statutesBtn);
                                    
    break;
    default:
        break;
}
       }
    }
   
})();