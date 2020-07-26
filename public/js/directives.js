(() => {
    const DIRECTIVES = angular.module('app'); 

    DIRECTIVES.directive('myFooter', [function () {
        return {
            restrict: 'E',
            template:` <div id="footer-bar" class="footer-bar-1">
            <a id='home'  href="/"><i class="fa fa-home"></i><span>Home</span></a>
            <a id='lib' href="/lib"><i class="fa fa-book"></i><span>E-Library</span></a>
            <a href="#" id='chamber'><i class="fa fa-balance-scale"></i><span>E-chamber</span></a>
 <a id='social' href="/social"><i class="fa fa-users"></i><span>social</span></a>
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
        <a href="#" class="header-icon header-icon-4"><i class="fas fa-bars"></i></a>
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

})()