(() => {
    const DIRECTIVES = angular.module('app'); 

    DIRECTIVES.directive('myFooter', [function () {
        return {
            restrict: 'E',
            template:` <div id="footer-bar" class="footer-bar-1">
            <a id='home'  href="/"><i class="fa fa-home"></i><span>Home</span></a>
            <a id='lib' href="/lib"><i class="fa fa-book"></i><span>E-Library</span></a>
            <a href="#" id='chamber'><i class="fa fa-balance-scale"></i><span>E-chamber</span></a>
 <a id='social' ng-show="user.type == 'law'" href="/social"><i class="fa fa-users"></i><span>social</span></a>
            <a id='blog' href="/blog"><i class="fa fa-newspaper"></i><span>Blog</span></a>
           
            
        </div>`,
            link: function (scope, element, attr) {
                const active = attr.active;
                let home = document.getElementById("home");
                let lib = document.getElementById("lib");
                let blog = document.getElementById("blog");
                let social = document.getElementById("social");
                switch (active) {
                    case 'home': home.classList.add("active-nav"); break;
                    case 'lib': lib.classList.add("active-nav"); break;
                    case 'blog': blog.classList.add("active-nav"); break;
                    case 'social': social.classList.add("active-nav"); break;
                    default: break;
                }

            }
        }
    }])
    DIRECTIVES.directive('myHeader', [function () {
        return {
            restrict: 'E',
            template: ` <div class="header header-demo header-logo-center mb-1">
        <a href="/" class="header-logo">Lawbook<span class="color-highlight"> Mobile</span></a>
 <a href="#" class="back-button header-icon header-icon-1"><i class="fas fa-arrow-left"></i></a>
        <a href="#" class="header-icon header-icon-2"><i class="fas fa-envelope"></i><span class="badge bg-blue2-dark">5</span></a>
        <a data-menu="menu-sidebar-left-3" href="#" class="header-icon header-icon-4"><i class="fas fa-bars"></i></a>
        <a href="#" data-toggle-theme class="header-icon header-icon-3"><i class="fas fa-lightbulb"></i></a>
       
    </div>`,
            link: function (scope, element, attr) {
                //const active = attr.active;
                //let home = document.getElementById("home");
                //let lib = document.getElementById("lib");
                //let blog = document.getElementById("blog");
                //let social = document.getElementById("social");
                //switch (active) {
                //    case 'home': home.classList.add("active-nav"); break;
                //    case 'lib': lib.classList.add("active-nav"); break;
                //    case 'blog': blog.classList.add("active-nav"); break;
                //    case 'social': social.classList.add("active-nav"); break;
                //    default: break;
                //}

            }
        }
    }])
    DIRECTIVES.directive('mySidebar', [function () {
        return {
            restrict: 'E',
            template: ` <div id="menu-sidebar-left-3" class="bg-white menu menu-box-left " data-menu-width="320" data-menu-effect="menu-parallax" style="width: 320px; display: block;">
        <div class="d-flex">
            <a href="#" class="flex-fill icon icon-m text-center color-facebook border-bottom border-right"><i class="fab font-12 fa-facebook-f"></i></a>
            <a href="#" class="flex-fill icon icon-m text-center color-twitter border-bottom border-right"><i class="fab font-12 fa-twitter"></i></a>
            <a href="#" class="flex-fill icon icon-m text-center color-instagram border-bottom border-right"><i class="fab font-12 fa-instagram"></i></a>
            <a href="#" class="flex-fill icon icon-m text-center color-whatsapp border-bottom border-right"><i class="fab font-12 fa-whatsapp"></i></a>
            <a href="#" class="flex-fill icon icon-m text-center color-linkedin border-bottom border-right"><i class="fab font-12 fa-linkedin-in"></i></a>
            <a href="#" class="close-menu flex-fill icon icon-m text-center color-red2-dark border-bottom"><i class="fa font-12 fa-times"></i></a>
        </div>
        <div class="pl-3 pr-3 pt-3 mt-4 mb-2">
            <div class="d-flex">
                <div class="mr-3 mt-n4">
                    <img src="images/logo.png" style="width: 100px; height:100px">
                </div>
                <div class="flex-grow-1">
                    <h1 class="font-22 font-700 mb-0">Law Book</h1>
                    <p class="mt-n2  font-10 font-400">Everything Law...</p>
                </div>
            </div>
        </div>

        <div class="mr-3 ml-3">
            <span class="text-uppercase font-900 font-11 opacity-30">User's Management</span>
            <div class="list-group list-custom-small">
                <a ng-hide="logged" href="/login">
                    <i class="fa font-14 fa-sign-in-alt rounded-s bg-yellow1-dark"></i>
                    <span>Sign In</span>
                    <i class="fa fa-angle-right"></i>
                </a>        
                <a ng-show="logged" href="#">
                    <i class="fa font-14 fa-bell rounded-s bg-blue2-dark"></i>
                    <span>Notifications</span>
                    <span class="badge bg-red2-dark">5</span>
                    <i class="fa fa-angle-right"></i>
                </a>        
                    
                <a ng-hide="logged" href="/register">
                    <i  class="fa font-14 fa-registered rounded-s bg-green1-dark"></i>
                    <span>Register</span>
                    <i class="fa fa-angle-right"></i>
                </a>        
                <a ng-show="logged" ng-click="logOut()" href="#" class="border-0">
                    <i class="fa font-14 fa-sign-out-alt rounded-s bg-red2-dark"></i>
                    <span>Sign Out</span>
                    <i class="fa fa-angle-right"></i>
                </a>        
            </div>
        </div>
        
              
        
        <div class="mr-3 ml-3 mt-4 pt-2">
            <span class="text-uppercase font-900 font-11 opacity-30">Account Settings</span>
            <div class="list-group list-custom-small">
                <a data-toggle-theme="" data-trigger-switch="sidebar-31-switch-2" href="#">
                    <i class="fa font-14 fa-moon rounded-s bg-gray2-dark"></i>
                    <span>Dark Mode</span>
                    <div class="custom-control scale-switch ios-switch">
                        <input type="checkbox" class="ios-input" id="sidebar-31-switch-2">
                        <label class="custom-control-label" for="sidebar-31-switch-2"></label>
                    </div>
                    <i class="fa fa-angle-right"></i>
                </a>        
                <a data-trigger-switch="sidebar-31-switch-2" href="#">
                    <i class="fa font-14 fa-circle rounded-s bg-green1-dark"></i>
                    <span>Active Mode</span>
                    <div class="custom-control scale-switch ios-switch">
                        <input type="checkbox" class="ios-input" id="sidebar-31-switch-2" checked="">
                        <label class="custom-control-label" for="sidebar-31-switch-2"></label>
                    </div>
                    <i class="fa fa-angle-right"></i>
                </a>        
                <a data-trigger-switch="sidebar-31-switch-3" href="#" class="border-0">
                    <i class="fa font-14 fa-bell rounded-s bg-blue2-dark"></i>
                    <span>Notifications</span>
                    <div class="custom-control scale-switch ios-switch">
                        <input type="checkbox" class="ios-input" id="sidebar-31-switch-3" checked="">
                        <label class="custom-control-label" for="sidebar-31-switch-3"></label>
                    </div>
                    <i class="fa fa-angle-right"></i>
                </a>        
            </div>
        </div>
    </div>`,
            link: function (scope, element, attr) {
                const active = attr.active;
                
                //let home = document.getElementById("home");
                //let lib = document.getElementById("lib");
                //let blog = document.getElementById("blog");
                //let social = document.getElementById("social");
                //switch (active) {
                //    case 'home': home.classList.add("active-nav"); break;
                //    case 'lib': lib.classList.add("active-nav"); break;
                //    case 'blog': blog.classList.add("active-nav"); break;
                //    case 'social': social.classList.add("active-nav"); break;
                //    default: break;
                //}

            }
        }
    }])
})()