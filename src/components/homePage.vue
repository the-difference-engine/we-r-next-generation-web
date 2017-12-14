<template>
<div class='container'>
  <div id='hero-image' class='row'>
    <img src="https://upload.wikimedia.org/wikipedia/en/8/88/Mermaid_Man_and_Barnacle_Boy.jpg" class="fit-image">
    <h2 id="hero-words-positioning"><span id="hero-words">Text over image<br/>second line of text</span></h2>
  </div>
  <div class='row'>
    <h1>Who we are/ Why/ Cause</h1>
    <p id="who-paragraph">this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block hipatrick this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block this is a test text block </p>
  </div>
  <div id="read-button-div" class='row'>
    <button id="read-button" type="button" class="btn btn-primary btn-lg">Read more</button>
  </div>
  <div id='action-carousel' class='row'>
    <carousel navigationEnabled="true" perPage="1">
      <slide>
        <div class="pad-slide">
          <img src="http://media.sbmania.net/pictures/69b/147.png" alt="sponge" class="fit-image">
        </div>
      </slide>
      <slide>
        <div class="pad-slide">
          <img src="http://en.spongepedia.org/images/a/a9/53a_Patrick-SpongeBob.jpg" alt="bob" class="fit-image">
        </div>
      </slide>
      <slide>
        <div class="pad-slide">
          <img src="http://media.sbmania.net/pictures/69b/147.png" alt="sponge" class="fit-image">
        </div>
      </slide>
      <slide>
        <div class="pad-slide">
          <img src="http://en.spongepedia.org/images/a/a9/53a_Patrick-SpongeBob.jpg" alt="bob" class="fit-image">
        </div>
      </slide>
    </carousel>
  </div>
  <div class='row' id='testimonial-header'>
    <h1>Testimonials</h1>
  </div>
  <div class='row' id='testimonial-carousel'>
    <carousel navigationEnabled="true" perPage="3">

      <slide>
        <div class="pad-slide">
          <p> several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here</p>
          <img src="http://i.dailymail.co.uk/i/pix/2016/04/20/13/335C67BD00000578-3549607-image-m-90_1461154788790.jpg" class="fit-image"/>
        </div>
      </slide>
      <slide>
        <div class="pad-slide">
          <p> several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here</p>
          <img src="http://i.dailymail.co.uk/i/pix/2016/04/20/13/335C67BD00000578-3549607-image-m-90_1461154788790.jpg" class="fit-image"/>
        </div>
      </slide>
      <slide>
        <div class="pad-slide">
          <p> several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here</p>
          <img src="http://i.dailymail.co.uk/i/pix/2016/04/20/13/335C67BD00000578-3549607-image-m-90_1461154788790.jpg" class="fit-image"/>
        </div>
      </slide>
      <slide>
        <div class="pad-slide">
          <p> several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here several lines of text here</p>
          <img src="http://i.dailymail.co.uk/i/pix/2016/04/20/13/335C67BD00000578-3549607-image-m-90_1461154788790.jpg" class="fit-image"/>
        </div>
      </slide>
    </carousel>
  </div>
  <div id='partners'>
    <div class='row' id='partners-header'>
      <h1>Partners</h1>
    </div>
    <div class='row' id='partners-images'>
      <div class="partners">
        <img src="https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg" class="fit-image"/>
      </div>
      <div class="partners">
        <img src="https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg" class="fit-image"/>
      </div>
      <div class="partners">
        <img src="https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg" class="fit-image"/>
      </div>
      <div class="partners">
        <img src="https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg" class="fit-image"/>
      </div>
      <div class="partners">
        <img src="https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg" class="fit-image"/>
      </div>
    </div>
    <div class='row' id='signup'>
      <img src="https://img00.deviantart.net/b793/i/2016/151/f/5/the_spongebob_gang_by_822peppermintpatty66-da4h254.jpg" class="fit-image"/>
      <button id="signup-button" type="button" class="btn btn-primary btn-lg">Sign Up</button>
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
  #read-button-div {
    text-align: right;
    margin-right: 150px;
    padding: 10px 0px;
  }
  #read-button {
    background-color:#FF4500;
  }

  #action-carousel {
    width: 80%;
    margin: auto;
    text-align: center;
  }
  #testimonial-carousel {
    width:80%;
    margin: auto;
    text-align: center;
  }
  .pad-slide {
    width: 90%;
    text-align: center;
    margin: auto
  }
  .fit-image {
    width: 100%;
  }
  .partners {
    width: 19%;
    display: inline-block;
    margin: auto;
    padding: 20px;
  }
  #signup {
    position: relative;
  }
  #signup-button {
    position: absolute;
    bottom: 100px;
    background-color:#FF4500;
  }
</style>
