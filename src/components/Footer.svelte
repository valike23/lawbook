
<script lang="ts">
    export let active: string;
</script>
<div id="footer-bar" class="footer-bar-1">
    
    <a href="/" class:active-nav={active == 'home'} ><i class="fa fa-home" aria-hidden="true"></i><span>Home</span></a>
  
    <a class:active-nav={active == 'blog'} href="/blog"><i class="fa fa-newspaper" aria-hidden="true"></i><span>Blog</span></a>
 
    <a class:active-nav={active == 'lib'} href="/lib"><i class="fa fa-book"></i><span>E-Library</span></a>

</div>