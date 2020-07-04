/// <reference path="pdf.js" />
(function() {
    'use strict';

    const Ctrl = angular.module('app');
    Ctrl.controller('homeCtrl', homeController);
    Ctrl.controller('libCtrl', libController);
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
    function homeController($scope) {
        activate();
        function activate() {
            $scope.header = "lawbooks";
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
    function statusController($scope) {
       $scope.readStatus = ()=>{
           location.href= '/lib/read'
       }
        activate();

        function activate() {
           
            console.log("status loaded");
        }
    }
    function readController($scope){
        (()=> {
            var myState = {
                pdf: null,
                currentPage: 1,
                zoom: 1
            };
            pdfjsLib.getDocument('/pdf/Nigeria_1999.pdf').then((pdf) => {
                myState.pdf = pdf;
                render();
                console.log("workign");
             
            });
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
        })();
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