<template>
<div class='home-page'>
  <div class='row' id='hero-image'>
    hero image with tagline on it
  </div>
  <div class='row' id='who-why-header'>
    Who we are/ Why/ Cause
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
  #action-carousel {
    width: 80%;
    margin: auto;
    text-align: center;
  }
</style>
