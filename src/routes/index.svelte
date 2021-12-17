

<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		
		const res = await this.fetch(`api/home`);
		const article = await res.json();

		return { article };
	}

</script>

<script lang="ts">
import { onMount } from "svelte";
import Footer from "../components/Footer.svelte";
import Header from "../components/Header.svelte";
import type { Ihome } from "../utils/models";
export let article: Ihome;
console.log(article);
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
<Footer active="{'home'}"/>
        <!--start of page content, add your stuff here-->
        <div class="page-content header-clear-small">
            <div id="home">
                <div class="single-slider slider-boxed owl-carousel owl-no-dots d-xl-none ">
                    <div class="card rounded-m shadow-l">
                        <div class="card-bottom text-center mb-0">
                            <h1 class="color-white font-700 mb-n1">Social Media</h1>
                            <p class="color-white opacity-80 mb-4">Worlds First Specialized Legal Social Network.</p>
                        </div>
                        <div class="card-overlay bg-gradient"></div>
                        <img class="img-fluid" alt="" src="images/pictures/13.jpg">
                    </div>
                    <div class="card rounded-m shadow-l">
                        <div class="card-bottom text-center mb-0">
                            <h1 class="color-white font-700 mb-n1">E-Library</h1>
                            <p class="color-white opacity-80 mb-4">Flexibility, Speed, Ease of Use.</p>
                        </div>
                        <div class="card-overlay bg-gradient"></div>
                        <img class="img-fluid" alt="" src="images/home/lib.jpg">
                    </div>

                    <div class="card rounded-m shadow-l">
                        <div class="card-bottom text-center mb-0">
                            <h1 class="color-white font-700 mb-n1">E- Chamber</h1>
                            <p class="color-white opacity-80 mb-4">Featuring a Comprehensive Legal Directory of Lawyers Across the entire Globe.</p>
                        </div>
                        <div class="card-overlay bg-gradient"></div>
                        <img class="img-fluid" alt="" src="images/home/lady.jpg">
                    </div>
                </div>
                <div id="jumby" class="jumbotron p-3 p-md-5 text-white rounded bg-dark d-none d-xl-block">
                    <div class="col-md-6 px-0">
                        <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>
                        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
                        <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
                    </div>
                </div>
                <div class="m-2"><span class="h2">Blog</span><span class="float-right"><a href="/blog/top_post">show all</a></span></div>
                <div class="row">
                    {#each article.articles as  article }
                    <div  class="col-12 col-sm-6 col-md-6 col-lg-4">
                        <a style="display: none;" href="blog/content/"></a>
                        <div class="card card-style " data-card-height="175" style="height: 175px; background-image:url({article.image})">

                            <div class="card-top pt-1">
                                <p class="tag-body">
                                    
                                    <span class="">Tag Title</span>
                                   
                                </p>
                               

                            </div>
                            <div class="card-bottom">

                                <h4 class="color-white ml-3 mb-1">{article.title}</h4>
                                <p class="color-white opacity-60 ml-3">{article.createdDate}</p>
                            </div>
                            <div class="card-overlay bg-black opacity-50"></div>
                        </div>

                    </div>
                    {/each}
                 

                </div>

                <div id="books">
                    <div id="splide--free" class="splide d-none d-sm-block">
                        <div class="splide__track">
                            <ul class="splide__list ">
                               
                                <li  class="splide__slide rounded-m ml-sm-n2 mr-sm-n2">

                                    <div class="item">
                                        <div data-card-height="400" class="card  shadow-l" style="height: 400px;background-image: url();background-size:cover">


                                        </div>
                                        <div style="line-height:10px;margin-top:-22px">
                                            <h4 class="color-black">title</h4>
                                            <p>by author</p>
                                            <div class="ml-sm-0" style="margin-top:-18px">
                                                <i class="fa fa-star  color-yellow1-dark"></i>
                                                <i class="fa fa-star  color-yellow1-dark"></i>
                                                <i class="fa fa-star  color-yellow1-dark"></i>
                                                <i class="fa fa-star  color-yellow1-dark"></i>
                                                <i class="fa fa-star  color-plum-dark"></i>
                                            </div>
                                            <p><small></small></p>

                                        </div>


                                    </div>

                                </li>
                               


                            </ul>
                        </div>
                    </div>
                    <div id="splide--mobile--free" class="splide d-sm-none d-block">
                        <div class="splide__track">
                            <ul class="splide__list ">
                            
                             {#each article.books as book}
                             <li class="splide__slide rounded-m ml-sm-n2 mr-sm-n2">

                                <div class="item">
                                    <div data-card-height="200" class="card  shadow-l" style="height: 200px;background-image: url('{book.secured_picture}');background-size:cover">


                                    </div>
                                    <div style="line-height:10px;margin-top:-22px">
                                        <h4 class="color-black">{book.title}</h4>
                                        <p>by {book.title}</p>
                                        <div class="ml-sm-0" style="margin-top:-18px">
                                            <i class="fa fa-star  color-yellow1-dark"></i>
                                            <i class="fa fa-star  color-yellow1-dark"></i>
                                            <i class="fa fa-star  color-yellow1-dark"></i>
                                            <i class="fa fa-star  color-yellow1-dark"></i>
                                            <i class="fa fa-star  color-plum-dark"></i>
                                        </div>
                                        <p><small></small></p>

                                    </div>


                                </div>

                            </li>
                             {/each}
                              

                            </ul>
                        </div>
                    </div>

                </div>
                <div id="wall_of_fame">
                    <div class="card card-style">

                        <div class="content mb-0 pb-n2">
                            <h1 class="text-center mb-0">Wall of Fame</h1>
                            <p class=" mt-0">
                                Lawyers are some of the most outstanding individuals in the world.
                                In the past month, these six persons have been even more outstanding
                                in their respective capacities. Why do we deem them so?
                                Click on the pictures to find out why.
                            </p>
                            <div class="row">
                                <div ng-click="openPerson(personality)" class="col-6 col-sm-4 card" ng-repeat="personality in personalities">
                                   
                                    <img alt="" class="rounded-l" style="height:152px" ng-src="" />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div id="contact">
                    <div class="card card-style">
                        <div class="content">
                            <h2 class="text-uppercase text-center mb-2 ">contact us and follow us everywhere</h2>
                            <div class="row pl-2 pr-2 pr-sm-5 mt-3">
                                <div class="col-3 col-sm-2 offset-sm-3" style="padding-right: -10px">
                                    <img alt="" src="images/social/twitter_black.png" style="height:50px; width:50px" />
                                    <br />
                                    <small class="color-blue2-dark">Twitter</small>
                                </div>
                                <div class="col-3 col-sm-2" style="padding-right: -10px">
                                    <img alt="" src="images/social/facebook_black.png" style="height:50px; width:50px" />
                                    <br />
                                    <small class="color-blue2-light">Facebook</small>
                                </div>
                                <div class="col-3 col-sm-2" style="padding-right: -10px">
                                    <img alt="" src="images/social/linkedin_black.png" style="height:50px; width:50px" />
                                    <br />
                                    <small class="color-black">linkedin</small>
                                </div>
                                <div class="col-3 col-sm-2" style="padding-right: -10px">
                                    <img alt="" src="images/social/instagram-black.png" style="height:50px; width:50px" />
                                    <br />
                                    <small class="color-brown1-light">instagram</small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="testimonials">
                    <div class="card card-style">
                        <div class="content mb-3 pt-2">
                            <h6 class="color-highlight text-center text-uppercase font-700 font-13">Our customers say we rock</h6>
                            <h1 class="text-uppercase text-center font-900 mt-n1 font-30">Testimonials</h1>
                            <p class="text-center mt-4">
                                <i class="fa font-16 fa-star color-yellow1-dark"></i>
                                <i class="fa font-24 ml-2 fa-star color-yellow1-dark"></i>
                                <i class="fa font-38 mr-2 ml-2 fa-star color-yellow1-dark"></i>
                                <i class="fa font-24 mr-2 fa-star color-yellow1-dark"></i>
                                <i class="fa font-16 fa-star color-yellow1-dark"></i>
                            </p>
                            <div id="splide--testimonial" class="splide">


                                <div class="splide__track">
                                    <div class="splide__list" style="transform: translate3d(-954px, 0px, 0px); transition: all 0.25s ease 0s; width: 1908px;">
                                        <div class="splide__slide" style="width: 298px; margin-right: 20px;">
                                            <h2 class="text-center font-300 pl-3 pr-3 line-height-xl">
                                                The code is always great with any Enabled template, the customer support that wins me over always.
                                            </h2>
                                            <p class="text-center color-red2-light font-18">- Lionel Messi</p>
                                        </div>
                                        <div class="splide__slide" style="width: 298px; margin-right: 20px;">
                                            <h2 class="text-center font-300 pl-3 pr-3 line-height-xl">
                                                The best support I have ever had, it's so good I purchased another theme. Highlighy Recommended.
                                            </h2>
                                            <p class="text-center color-red2-light font-18">- Lionel Messi</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="newsletter">
                    <div class="card card-style" style="background-color: grey">
                        <div class="content">
                            <h4 class="text-uppercase color-white mb-3">subscribe to our newsletter</h4>
                            <div class="row">
                                <div class="col-12 col-sm-6 mb-2">
                                    <input class="rounded-m form-control" placeholder="NAME" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input class="rounded-m form-control" placeholder="E-MAIL ADDRESS" />
                                </div>
                            </div>
                            <button class="btn btn-success btn-block rounded-m color-white font-700">submit</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>

        <div id="personality" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content" style="background-color:black">

                    <div class="modal-body">
                        <h2 class="text-center text-capitalize color-white">person</h2>
                        <p class="text-center color-white">bio</p>
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img style="height: 400px; width:100%" ng-src="" />
                        <div class="text-center">
                            <span class="fa fa-times fa-3x" style="color:red" data-dismiss="modal"></span>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!--end of page content, off canvas elements here-->

        <div id="menu-share" class="menu menu-box-bottom menu-box-detached rounded-m" data-menu-height="345" data-menu-effect="menu-over">
            <div class="menu-title mt-n1"><h1>Share the Love</h1><p class="color-highlight">Just Tap the Social Icon. We'll add the Link</p><a href="#" class="close-menu"><i class="fa fa-times"></i></a></div>
            <div class="content mb-0">
                <div class="divider mb-0"></div>
                <div class="list-group list-custom-small list-icon-0">
                    <a href="#" class="shareToFacebook">
                        <i class="font-18 fab fa-facebook color-facebook"></i>
                        <span class="font-13">Facebook</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    <a href="#" class="shareToTwitter">
                        <i class="font-18 fab fa-twitter-square color-twitter"></i>
                        <span class="font-13">Twitter</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    <a href="#" class="shareToLinkedIn">
                        <i class="font-18 fab fa-linkedin color-linkedin"></i>
                        <span class="font-13">LinkedIn</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    <a href="#" class="shareToWhatsApp">
                        <i class="font-18 fab fa-whatsapp-square color-whatsapp"></i>
                        <span class="font-13">WhatsApp</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    <a href="#" class="shareToMail border-0">
                        <i class="font-18 fa fa-envelope-square color-mail"></i>
                        <span class="font-13">Email</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>


        <!-- All Menus, Action Sheets, Modals, Notifications, Toasts get Placed outside the <div class="page-content"> -->
        <div id="menu-settings" class="menu menu-box-bottom menu-box-detached rounded-m" data-menu-height="300">
            <div class="menu-title"><h1>Settings</h1><p class="color-highlight">Flexible and Easy to Use</p><a href="#" class="close-menu"><i class="fa fa-times"></i></a></div>
            <div class="divider divider-margins mb-n2"></div>
            <div class="content">
                <div class="list-group list-custom-small">
                    <a href="#" data-toggle-theme data-trigger-switch="switch-4" class="pb-2">
                        <i class="fa font-12 fa-moon rounded-s bg-highlight color-white mr-3"></i>
                        <span>Dark Mode</span>
                        <div class="custom-control scale-switch ios-switch">
                            <input data-toggle-theme-switch type="checkbox" class="ios-input" id="switch-4">
                            <label class="custom-control-label" for="switch-4"></label>
                        </div>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
                <div class="list-group list-custom-large">
                    <a data-menu="menu-highlights" href="#">
                        <i class="fa font-14 fa-tint bg-green1-dark rounded-s"></i>
                        <span>Page Highlight</span>
                        <strong>16 Colors Highlights Included</strong>
                        <span class="badge bg-highlight color-white">HOT</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                    <a data-menu="menu-backgrounds" href="#" class="border-0">
                        <i class="fa font-14 fa-cog bg-blue2-dark rounded-s"></i>
                        <span>Background Color</span>
                        <strong>10 Page Gradients Included</strong>
                        <span class="badge bg-highlight color-white">NEW</span>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>


        <div id="menu-highlights" class="menu menu-box-bottom menu-box-detached rounded-m" data-menu-height="380" data-menu-effect="menu-over">
            <div class="menu-title"><h1>Highlights</h1><p class="color-highlight">Any Element can have a Highlight Color</p><a href="#" class="close-menu"><i class="fa fa-times"></i></a></div>
            <div class="divider divider-margins mb-n2"></div>
            <div class="content">
                <div class="highlight-changer">
                    <a href="#" data-change-highlight="blue2"><i class="fa fa-circle color-blue2-dark"></i><span class="color-blue2-light">Default</span></a>
                    <a href="#" data-change-highlight="red2"><i class="fa fa-circle color-red1-dark"></i><span class="color-red2-light">Red</span></a>
                    <a href="#" data-change-highlight="orange"><i class="fa fa-circle color-orange-dark"></i><span class="color-orange-light">Orange</span></a>
                    <a href="#" data-change-highlight="pink2"><i class="fa fa-circle color-pink2-dark"></i><span class="color-pink2-light">Pink</span></a>
                    <a href="#" data-change-highlight="magenta2"><i class="fa fa-circle color-magenta2-dark"></i><span class="color-magenta2-light">Purple</span></a>
                    <a href="#" data-change-highlight="aqua"><i class="fa fa-circle color-aqua-dark"></i><span class="color-aqua-light">Aqua</span></a>
                    <a href="#" data-change-highlight="teal"><i class="fa fa-circle color-teal-dark"></i><span class="color-teal-light">Teal</span></a>
                    <a href="#" data-change-highlight="mint"><i class="fa fa-circle color-mint-dark"></i><span class="color-mint-light">Mint</span></a>
                    <a href="#" data-change-highlight="green2"><i class="fa fa-circle color-green2-dark"></i><span class="color-green2-light">Green</span></a>
                    <a href="#" data-change-highlight="green1"><i class="fa fa-circle color-green1-dark"></i><span class="color-green1-light">Grass</span></a>
                    <a href="#" data-change-highlight="yellow2"><i class="fa fa-circle color-yellow2-dark"></i><span class="color-yellow2-light">Sunny</span></a>
                    <a href="#" data-change-highlight="yellow1"><i class="fa fa-circle color-yellow1-dark"></i><span class="color-yellow1-light">Goldish</span></a>
                    <a href="#" data-change-highlight="brown1"><i class="fa fa-circle color-brown1-dark"></i><span class="color-brown1-light">Wood</span></a>
                    <a href="#" data-change-highlight="dark1"><i class="fa fa-circle color-dark1-dark"></i><span class="color-dark1-light">Night</span></a>
                    <a href="#" data-change-highlight="dark2"><i class="fa fa-circle color-dark2-dark"></i><span class="color-dark2-light">Dark</span></a>
                    <div class="clearfix"></div>
                </div>
                <a href="#" data-menu="menu-settings" class="btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4">Back to Settings</a>
            </div>
        </div>
        <!-- Menu Settings Backgrounds-->
        <div id="menu-backgrounds" class="menu menu-box-bottom menu-box-detached rounded-m" data-menu-height="310" data-menu-effect="menu-over">
            <div class="menu-title"><h1>Backgrounds</h1><p class="color-highlight">Change Page Color Behind Content Boxes</p><a href="#" class="close-menu"><i class="fa fa-times"></i></a></div>
            <div class="divider divider-margins mb-n2"></div>
            <div class="content">
                <div class="background-changer">
                    <a href="#" data-change-background="none"><i class="bg-theme"></i><span>Default</span></a>
                    <a href="#" data-change-background="plum"><i class="body-plum"></i><span class="color-plum-dark">Plum</span></a>
                    <a href="#" data-change-background="magenta3"><i class="body-magenta3"></i><span class="color-magenta3-dark">Magenta</span></a>
                    <a href="#" data-change-background="dark3"><i class="body-dark3"></i><span class="color-dark3-dark">Dark</span></a>
                    <a href="#" data-change-background="violet"><i class="body-violet"></i><span class="color-violet-dark">Violet</span></a>
                    <a href="#" data-change-background="red3"><i class="body-red3"></i><span class="color-red3-dark">Red</span></a>
                    <a href="#" data-change-background="green3"><i class="body-green3"></i><span class="color-green3-dark">Green</span></a>
                    <a href="#" data-change-background="sky"><i class="body-sky"></i><span class="color-sky-dark">Sky</span></a>
                    <a href="#" data-change-background="pumpkin"><i class="body-pumpkin"></i><span class="color-pumpkin-dark">Orange</span></a>
                    <a href="#" data-change-background="yellow3"><i class="body-yellow3"></i><span class="color-yellow3-dark">Yellow</span></a>
                    <div class="clearfix"></div>
                </div>
                <a href="#" data-menu="menu-settings" class="btn btn-full btn-m rounded-sm bg-highlight shadow-xl text-uppercase font-900 mt-4">Back to Settings</a>
            </div>
        </div>

      
    </div>