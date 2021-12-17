<script lang="ts">
import { onMount } from "svelte";

import Footer from "../../components/Footer.svelte";
import Header from "../../components/Header.svelte";
let win: any = {};
onMount(()=>{
    win = window;
    setTimeout(()=>{
        win.$('#preloader').addClass('preloader-hide');
    }, 2000)
   
})
</script>

 <div id="preloader"><div class="spinner-border color-highlight" role="status"></div></div>

 <div id="page">

     <!-- header and footer bar go here-->
     <Header/>
     <Footer active="{'blog'}"/>

     <!--start of page content, add your stuff here-->
     <div class="page-content header-clear-small mt-n2">
         <div>
            
             <div class="row text-center mb-0">
                 <a href='/blog/all' class="col-6 pr-0">
                     <div class="card card-style mr-2 mb-3">
                         <i class="fa fa-book color-magenta2-dark fa-3x mt-5"></i>
                         <h1 class="pt-4"> title </h1>
                         <p class="font-11 opacity-50 mt-n2">Read all blogs</p>
                         <p class="mb-0 pb-0 font-10 opacity-40">Tap to View</p>
                     </div>
                 </a>
                 <a href="/blog/top" class="col-6 pl-0">
                     <div class="card card-style ml-2 mb-3">
                         <i class="fa fa-star  color-highlight fa-3x mt-5"></i>
                         <h1 class="pt-4">TOP BLOG</h1>
                         <p class="font-11 opacity-50 mt-n2">Read top blogs</p>
                         <p class="mb-0 pb-0 font-10 opacity-40">Tap to View</p>
                     </div>
                 </a>
                 <a href="/blog/author" class="col-6 pr-0">
                     <div class="card card-style mr-2">
                         <i class="fa fa-user-edit color-green1-dark fa-3x mt-5"></i>
                         <h1 class="pt-4">AUTHOR PAGE</h1>
                         <p class="font-11 opacity-50 mt-n2">Become an Author </p>
                         <p class="mb-0 pb-0 font-10 opacity-40">Tap to View</p>
                     </div>
                 </a>
                 <a class="col-6 pl-0" href="/blog/favorites" data-menu="menu-listed-menus">
                     <div class="card card-style ml-2">
                         <i class="fa fa-bookmark color-yellow1-dark fa-3x mt-5"></i>
                         <h1 class="pt-4">FAVOURITES</h1>
                         <p class="font-11 opacity-50 mt-n2">Your bookmarked articles </p>
                         <p class="mb-0 pb-0 font-10 opacity-40">Tap to Expand</p>
                     </div>
                 </a>

             </div>
         </div>
     </div>


     <!--end of page content, off canvas elements here-->
     <!--end of div id page-->
 </div>

 <div id="menu-install-pwa-android" class="menu menu-box-bottom menu-box-detached rounded-l"
             data-menu-height="350"
             data-menu-effect="menu-parallax">
            <div class="boxed-text-l mt-4">
                <img class="rounded-l mb-3 " src="app/icons/icon-128x128.png" alt="img" width="90">
                <h4 class="mt-3">Add Sticky on your Home Screen</h4>
                <p>
                    Install Sticky on your home screen, and access it just like a regular app. It really is that simple!
                </p>
                <a href="#" class="pwa-install btn btn-s rounded-s shadow-l text-uppercase font-900 bg-highlight mb-2">Add to Home Screen</a><br>
                <a href="#" class="pwa-dismiss close-menu color-gray2-light text-uppercase font-900 opacity-60 font-10">Maybe later</a>
                <div class="clear"></div>
            </div>
        </div>