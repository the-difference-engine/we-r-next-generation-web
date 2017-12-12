<template>
<div class='home-page'>
  <div id='hero-image'>
    <img src="https://upload.wikimedia.org/wikipedia/en/8/88/Mermaid_Man_and_Barnacle_Boy.jpg">
    <h2 id="hero-words-positioning"><span id="hero-words">Text over image<br/>second line of text</span></h2>
  </div>
  <div class='row'>
    <h1>Who we are/ Why/ Cause</h1>
    <p id="who-paragraph">this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block hipatrick this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block </p>
  </div>
  <div id="read-button" class='row'>
    <button style="background-color:#FF4500" type="button" class="btn btn-primary btn-lg">Read more</button>
  </div>
  <div id='action-carousel'>
    <carousel navigationEnabled="true">
      <slide><span><img src="http://media.sbmania.net/pictures/69b/147.png" alt="sponge"></span></slide>
      <slide><span><img src="http://en.spongepedia.org/images/a/a9/53a_Patrick-SpongeBob.jpg" alt="bob"></span></slide>
      <slide><span>much e3r</span></slide>
      <slide><span>much e4er</span></slide>
    </carousel>
  </div>
  <div class='row' id='who-why-text'>
    who-why text
  </div>
  <div class='row' id='read-more'>
    read more button
  </div>

  <div class='row' id='testimonial-header'>
    Testimonials
  </div>
  <div class='row' id='testimonial-carousel'>
    carousel of 3 testimonials
  </div>
  <div id='partners'>
    <div class='row' id='partners-header'>
      Partners
    </div>
    <div class='row' id='partners-images'>
      images of partners
    </div>
    <div class='row' id='signup'>
      signup button
    </div>
  </div>

</div>

</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  export default {
    name: 'homePage',
    components: {
      Carousel,
      Slide
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  #hero-image {
    position: relative;
  }
  h2 {
    position: absolute;
    top: 100px;
    left: 35%;
  }
  h2 span {
    color: white;
    font: bold 24px/45px Helvetica, Sans-Serif;
    letter-spacing: -1px;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
  }
  /* h2 span.spacer{
    padding:0 5px;
  } */
  #who-paragraph {
    margin: auto;
    width: 80%;
  }
  #read-button {
    text-align: right;
    margin-right: 150px;
    padding: 10px 0px;
  }
  #action-carousel {
    width: 80%;
    margin: auto;
    text-align: center;
  }
</style>
