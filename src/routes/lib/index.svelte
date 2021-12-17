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

   <Header/>
   <Footer active="lib"/>
    <!--start of page content, add your stuff here-->
    <div class="page-content header-clear-small">
        <div>
          
            <div class="row text-center mb-0">
                <a href='lib/books' class="col-6 pr-0">
                    <div class="card card-style mr-2 mb-3">
                        <i class="fa fa-book color-magenta2-dark fa-3x mt-5"></i>
                        <h1 class="pt-4">BOOKS</h1>
                        <p class="font-11 opacity-50 mt-n2">The very best legal writings</p>
                        <p class="mb-0 pb-0 font-10 opacity-40">Tap to View</p>
                    </div>
                </a>
                <a href="/lib/statutes" class="col-6 pl-0">
                    <div class="card card-style ml-2 mb-3">
                        <i class="fa fa-balance-scale color-highlight fa-3x mt-5"></i>
                        <h1 class="pt-4">STATUTES</h1>
                        <p class="font-11 opacity-50 mt-n2">Enactments and Rules</p>
                        <p class="mb-0 pb-0 font-10 opacity-40">Tap to View</p>
                    </div>
                </a>
                <a href="/lib/cases" class="col-6 pr-0">
                    <div class="card card-style mr-2">
                        <i class="fa fa-gavel color-green1-dark fa-3x mt-5"></i>
                        <h1 class="pt-4">CASES</h1>
                        <p class="font-11 opacity-50 mt-n2">Holdings of Courts</p>
                        <p class="mb-0 pb-0 font-10 opacity-40">Tap to View</p>
                    </div>
                </a>
                <a class="col-6 pl-0" href="/lib/shelf" data-menu="menu-listed-menus">
                    <div class="card card-style ml-2">
                        <i class="fa fa-star color-yellow1-dark fa-3x mt-5"></i>
                        <h1 class="pt-4">Book Shelf</h1>
                        <p class="font-11 opacity-50 mt-n2">Find all bought books here</p>
                        <p class="mb-0 pb-0 font-10 opacity-40">Tap to Expand</p>
                    </div>
                </a>

            </div>
        </div>
    </div>
</div>