<template>
<div class='container'>
  <div id='hero-image' class='row'>
    <img :src="homePageData.heroImage" alt="top-image" class="fit-image">
    <h2 id="hero-words-positioning"><span id="hero-words">{{homePageData.heroText}}</span></h2>
  </div>
  <div class='row'>
    <h1>Who we are/ Why/ Cause</h1>
    <p id="who-we-are-paragraph">{{homePageData.whoWeAreText}} </p>
  </div>
  <div id="read-button-div" class='row'>
    <router-link to="/campinfo" >
      <button type="button" class="btn btn-primary btn-lg read-button">Read more</button>
    </router-link>
  </div>
  <div class='row' id='success-carousel'>
    <carousel :navigationEnabled="true" :perPage="1">
      <slide v-for="(sStory, index) in homePageData.sStories" :key="index">
          <div class="row" id="success-row">
            <div class="col-6" id="success-left">
              <h1>Success Stories</h1>
              <p class="">{{sStory.text}}</p>
              <button type="button" class="btn btn-primary btn-md read-button">Read more</button>
            </div>
            <div class="col-6" id="success-right">
              <img :src="sStory.imageUrl" :alt="'success story image 1' + index" class="fit-image"/>
            </div>
          </div>
      </slide>
    </carousel>
  </div>
  <div id='action-carousel' class='row'>
    <carousel :navigationEnabled="true" :perPage="1">
      <slide v-for="(action, index) in homePageData.actionCarousel" :key="index">
        <div class="pad-slide">
          <img :src="action" :alt="'carousel image 1' + index" class="fit-image"/>
        </div>
      </slide>
    </carousel>
  </div>
  <div class='row' id='testimonial-header'>
    <h1>Testimonials</h1>
  </div>
  <div class='row' id='testimonial-carousel'>
    <carousel :navigationEnabled="true" :perPage="3">
      <slide v-for="(testimonial, index) in homePageData.testimonials" :key="index">
        <div class="pad-slide">
          <p class="testimonial-text">{{testimonial.text}}</p>
          <img :src="testimonial.imageUrl" :alt="'testimonial image 1' + index" class="fit-image"/>
        </div>
      </slide>
    </carousel>
  </div>
  <div id='partners'>
    <div class='row' id='partners-header'>
      <h1>Partners</h1>
    </div>
    <div class='row' id='partners-images'>
      <div v-for="(partner, index) in homePageData.partners" :key="index" class="partners">
        <img :src="partner" :alt="'partner image 1' + index" class="fit-image"/>
      </div>
    </div>
    <div class='row' id='signup'>
      <img :src="homePageData.signupPic" alt="sign-up pic" class="fit-image"/>
      <router-link to="/signup">
        <button id="signup-button" type="button" class="btn btn-primary btn-lg">Sign Up</button>
      </router-link>
    </div>
  </div>

</div>

</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import axios from 'axios';
  export default {
    name: 'homePage',
    components: {
      Carousel,
      Slide
    },
    data () {
      return {
        homePageData: {}
      }
    },
    created() {
      axios.get('http://localhost:4567/api/v1/resources/homepage')
      .then(res => {
        this.homePageData = res.data
      })
      .catch(error => console.log)
    }
  }
</script>

<style scoped>
  #hero-image {
    position: relative;
    width: 95%;
    text-align: center;
    margin: auto;
  }
  h2 {
    position: absolute;
    top: 40px;
    left: 33%;
  }
  h2 span {
    color: white;
    font: bold 24px/45px Helvetica, Sans-Serif;
    letter-spacing: -1px;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
  }
  #who-we-are-paragraph {
    margin: auto;
    width: 80%;
  }
  #read-button-div {
    text-align: right;
    margin-right: 150px;
    padding: 10px 0px;
  }
  .read-button {
    background-color:#EF7C27;
  }
  #success-carousel{
    margin: auto;
    width: 90%;
  }
  #success-left {
    padding: 5%;
    float: left;
    width: 50%;
  }
  #success-right{
    padding: 5%;
    width: 50%;
    float: right;
  }
  #action-carousel {
    width: 80%;
    margin: auto;
    text-align: center;
  }
  #testimonial-carousel {
    width:90%;
    margin: auto;
    text-align: center;
  }
  .testimonial-text {
    min-height: 100px;
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
    margin: auto;
    width: 95%;
    margin-bottom: 20px;
  }
  #signup-button {
    position: absolute;
    bottom: 12px;
    background-color:#EF7C27;
    font-size: 24px;
    font-weight: 700;
  }
</style>
