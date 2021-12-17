<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Footer from "../../components/Footer.svelte";
  import Header from "../../components/Header.svelte";
  import type { Iblog } from "../../utils/models";
  let win: any = {};
  let blogs: Iblog[] = [];
  const search = () => {};
  const gotoArticle = (blog: Iblog) => {
      location.href = `blog/content?title=${blog.title}&id=${blog._id}`;
  };
  onMount(async () => {
    win = window;
    blogs = (await (
      await axios.get(`api/blog?page=1`)
    ).data) as unknown as Iblog[];
    console.log(blogs);
    if (blogs) {
      win.$("#preloader").addClass("preloader-hide");
    }
  });
</script>

<div id="preloader">
  <div class="spinner-border color-highlight" role="status" />
</div>

<div id="page">
  <!-- header and footer bar go here-->
  <Header />
  <Footer active={"blog"} />

  <!--start of page content, add your stuff here-->
  <div class="page-content header-clear-small mt-n2">
    <form on:submit|preventDefault={search} id="search-bar">
      <div class="search-box search-header bg-theme card-style mr-3 ml-3">
        <i class="fa fa-search" />
        <input
          type="text"
          id="searched"
          class="border-0"
          placeholder="Search All Blog Directory "
          data-search=""
        />
        <a href="#" class="disabled"
          ><i class="fa fa-times-circle color-red2-dark" /></a
        >
      </div>
    </form>
    <div id="blog-list" class="container-fluid">
      <h1>All Blog Post</h1>
      <div class="row">
          {#each blogs as blog}
          <div on:click={()=>{gotoArticle(blog)}} class="col-12 col-sm-6 col-md-6 col-lg-4">
           
            <div
              class="card card-style "
              data-card-height="175"
              style="height: 175px; background-image:url('{blog.image}')"
            >
              <div class="card-top pt-1">
               {#each blog.tags as tag}
               <p class="tag-body">
                <span class="{tag.class}"> {tag.title} </span>
              </p>
               {/each}
              </div>
              <div class="card-bottom">
                <h4 class="color-white ml-3 mb-1">{blog.title}</h4>
                <p class="color-white opacity-60 ml-3">
                  {blog.formatedDate} | {blog.author}
                </p>
              </div>
              <div class="card-overlay bg-black opacity-50" />
            </div>
          </div>
          {/each}
      

      </div>
      <div class="text-center">
        <button ng-click="loadMore()" class="btn btn-primary btn-lg"
          ><span ng-if="!loader">Load More</span></button
        >
      </div>
    </div>
  </div>

  <!--end of page content, off canvas elements here-->
  <!--end of div id page-->
</div>
