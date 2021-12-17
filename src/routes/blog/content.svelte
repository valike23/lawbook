<script context="module" lang="ts">

  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload(page, session) {
    // the `slug` parameter is available because this file
    // is called [slug].svelte
    console.log("page items are shown here: ", page);

    // `this.fetch` is a wrapper around `fetch` that allows
    // you to make credentialled requests on both
    // server and client
    const res = await this.fetch(`api/blog/single?id=${page.query.id}`);

    const res2 = await this.fetch(`api/blog/comments?id=${page.query.id}&page=1`);
    const comments = await res2.json();
    const article = await res.json();
    console.log(comments);
    return { article, comments };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Iblog, Icomment } from "../../utils/models";

  import Footer from "../../components/Footer.svelte";
  import Header from "../../components/Header.svelte";
  let comment: Icomment = {};
  let win: any = {};
  export let article: Iblog;
  export let comments: Icomment[];
  onMount(() => {
    win = window;
    setTimeout(() => {
      win.$("#preloader").addClass("preloader-hide");
    }, 1000);
  });

  const createComment = () =>{
    alert(comment.comment);
    console.log(comment);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="css/style.css" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="lexerati" />
  <meta name="twitter:title" content={article.title} />
  <meta name="twitter:description" content={article.title} />
  <meta name="twitter:image" content={article.image} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={article.title} />
  <meta
    property="og:description"
    content="Senior Selachimorpha at DigitalOcean"
  />
  <meta property="og:url" content="https://lexerati.herokuapp.com/" />
  <meta property="og:image" content={article.image} />
</svelte:head>
<div id="preloader">
  <div class="spinner-border color-highlight" role="status" />
</div>

<div id="page">
  <!-- header and footer bar go here-->
  <Header />
  <Footer active={"blog"} />

  <!--start of page content, add your stuff here-->
  <div class="page-content header-clear-small mt-n2">
    <main class="blog-post-single">
      <div class="container">
        <div class="row">
          <div class="col-md-8 blog-post-wrapper">
            <div class="post-header wow fadeInUp">
              <img
                src="{article.image} "
                alt="blog post"
                class="post-featured-image"
              />
              <p class="post-date">
                {article.formatedDate}
                <span
                  ng-click="removeFavorite()"
                  ng-show="liked"
                  style="color:red"
                  class="fa fa-heart float-right"
                />
                <span
                  ng-click="addFavorite()"
                  ng-hide="liked"
                  class="fa fa-heart float-right"
                />
              </p>
            </div>
            <div class="post-content wow fadeInUp">
              <h4>{article.title}</h4>
              <div id="content">
                {@html article.content}
              </div>
            </div>

            <div class="comment-section wow fadeInUp">
              <h5 class="section-title">Leave a comment</h5>
              <form on:submit|preventDefault="{createComment}" class="oleez-comment-form">
                <div class="row">
                  <div class="form-group col-12">
                    <label for="message">*Message</label>
                    <textarea
                      bind:value="{comment.comment}"
                      name="message"
                      id="message"
                      rows="4"
                      class="oleez-textarea"
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button
                      
                      type="submit"
                      class="btn btn-submit">Send</button
                    >
                  </div>
                </div>
              </form>
             {#each comments as comment }
             <div class="media mb-4">
              <img
                class="d-flex mr-3 imr rounded-circle"
                src="{comment.profilePics}"
                alt="dp"
              />
              <div class="media-body">
                <h5 class="mt-0">{comment.username}</h5>
                {comment.comment}
                <div class="media mt-4" ng-repeat="reply in comment.replies">
                  <img
                    class="d-flex mr-3 imr rounded-circle"
                    ng-src="comment.dp"
                    alt="dp"
                  />
                  <div class="media-body">
                    <h5 class="mt-0">Commenter Name</h5>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum nunc
                    ac nisi vulputate fringilla. Donec lacinia congue felis in
                    faucibus.
                  </div>
                </div>
              </div>
              <div><i class="fa fa-" /></div>
            </div>
             {/each}
            </div>
          </div>
          <div class="col-md-4">
            <div class="sidebar-widget wow fadeInUp">
              <h5 class="widget-title">Tags</h5>
              <div class="widget-content">
                <p class="tag-body">
                  {#each article.tags as tag}
                    <span class={tag.class}> {tag.title} </span>
                  {/each}
                </p>
              </div>
            </div>
            <div class="sidebar-widget wow fadeInUp">
              
              <h5 class="widget-title">Share</h5>
<!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="shareToFacebook mb-3 icon icon-s bg-facebook rounded-xs text-uppercase font-900"
                ><i class="fab fa-facebook-f font-14" /></a
              >
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="shareToTwitter mb-3 icon icon-s bg-twitter rounded-xs text-uppercase font-900"
                ><i class="fab fa-twitter font-14" /></a
              >
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="shareToPinterest mb-3 icon icon-s bg-pinterest rounded-xs text-uppercase font-900"
                ><i class="fab fa-pinterest font-14" /></a
              >
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="shareToLinkedin mb-3 icon icon-s bg-linkedin rounded-xs text-uppercase font-900"
                ><i class="fab fa-linkedin-in font-14" /></a
              >
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="shareToWhatsApp mb-3 icon icon-s bg-whatsapp rounded-xs text-uppercase font-900"
                ><i class="fab fa-whatsapp font-14" /></a
              >
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="shareToMail mb-3 icon icon-s bg-blue2-dark rounded-xs text-uppercase font-900"
                ><i class="fa fa-envelope font-14" /></a
              >
            </div>
            <div class="sidebar-widget wow fadeInUp">
              <h5 class="widget-title">Related Posts</h5>
              <div class="widget-content">
                <div class="row">
                  <div
                    ng-click="gotoArticle(article)"
                    ng-repeat="article in articles"
                    class="col-12 muggy "
                  >
                    <div
                      class="card card-style  "
                      data-card-height="175"
                      style="height: 175px; background-image:url(article.image)"
                    >
                      <div class="card-top pt-2 pb-n1 ">
                        <p class="tag-body muggy">
                          <span
                            ng-repeat="tag in article.tags"
                            class="tag.class">tag.title</span
                          >
                        </p>
                      </div>
                      <div class="card-bottom">
                        <p class="color-white ml-3 muggy">article.title</p>
                        <p class="color-white opacity-60 ml-3">
                          article.createdDate | date:short | article.author
                        </p>
                      </div>
                      <div class="card-overlay bg-black opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sidebar-widget wow fadeInUp">
              <h5 class="widget-title">Categories</h5>
              <div class="widget-content">
                <ul class="category-list">
                  <li><a href="#!">Civil Law</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!--end of page content, off canvas elements here-->
  <!--end of div id page-->
</div>

<style>
  .imr {
    width: 50px;
    height: 50px;
  }
</style>
