<template>
<div class='container'>
  <div id='hero-image' class='row'>
    <img :src="heroImage" class="fit-image">
    <h2 id="hero-words-positioning"><span id="hero-words">{{heroText}}</span></h2>
  </div>
  <div class='row'>
    <h1>Who we are/ Why/ Cause</h1>
    <p id="who-paragraph">{{whoWeAreText}} </p>
  </div>
  <div id="read-button-div" class='row'>
    <button id="read-button" type="button" class="btn btn-primary btn-lg">Read more</button>
  </div>
  <div id='action-carousel' class='row'>
    <carousel navigationEnabled="true" perPage="1">
      <slide v-for="(action, index) in actionCarousel" :key="index">
        <div class="pad-slide">
          <img :src="action" class="fit-image"/>
        </div>
      </slide>
    </carousel>
  </div>
  <div class='row' id='testimonial-header'>
    <h1>Testimonials</h1>
  </div>
  <div class='row' id='testimonial-carousel'>
    <carousel navigationEnabled="true" perPage="3">
      <slide v-for="(text, imageUrl, index) in testimonials" :key="index">
        <div class="pad-slide">
          <p class="testimonial-text">{{text}}</p>
          <img :src="imageUrl" class="fit-image"/>
        </div>
      </slide>
    </carousel>
  </div>
  <div id='partners'>
    <div class='row' id='partners-header'>
      <h1>Partners</h1>
    </div>
    <div class='row' id='partners-images'>
      <div v-for="(partner, index) in partners" :key="index" class="partners">
        <img :src="partner" class="fit-image"/>
      </div>
    </div>
    <div class='row' id='signup'>
      <img :src="signupPic" class="fit-image"/>
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
        heroImage: `https://s3.us-east-2.amazonaws.com/wernextheneration/StJohnHomePANA.jpg`,
        heroText: `We R NextGeneration, Inc. | Every Child Needs an Audience`,
        whoWeAreText: `It’s amazing what a child can do, and even more amazing, who the child can be, when the child believes in his or her self. However, in our community, for a child beneath the invisible shadow of norms or indiscipline, the odds of being amazing are barely obtainable when that child’s ability, needed for growing her or his innate creativity (referred as iCreativity), has been neglected.
We R NextGeneration is a 501(C)(3) charity that inspires. We help every 10-12 yr-old dreamers, of our community’s primary schools, with being inspired by her or his own innate creativity (iCreativity) to create fulfilling life.
We believe recognizing a child’s unnoticed dreams and helping the child to appreciate her or his innate creativity (iCreativity) is the most precious gift for every young dreamer to thrive as a young citizen.`,
        actionCarousel: [`https://s3.us-east-2.amazonaws.com/wernextheneration/expressingYCs+copy.jpeg`, `https://s3.us-east-2.amazonaws.com/wernextheneration/our_cause_YD1.jpg`, `https://s3.us-east-2.amazonaws.com/wernextheneration/DSC_0509.JPG`, `https://s3.us-east-2.amazonaws.com/wernextheneration/_MG_2086.jpg`],
        testimonials: {'https://s3.us-east-2.amazonaws.com/wernextheneration/_DSC0041.JPG':`“I am so glad and I appreciate all the effort that brought positive change and confidence to my children.” – Mr. Blessing Adiele (iCreativity Camp Participant’s Parent)`,'https://s3.us-east-2.amazonaws.com/wernextheneration/DSC_0026.jpg':`“My daughter is so excited about expressing her ideas, and nonstop about finding resources and building ideas.” – Mrs. Bakare-Kolawole (iCreativity Camp Participant’s Parent)`,'https://s3.us-east-2.amazonaws.com/wernextheneration/ourTeam.jpeg':`“Thank you, We'R'NextGeneration for being such a good listener to me; helping me to understand who I am, my dreams and myself.” – Rafael, 12 (iCreativity Camp Participant)`,'https://s3.us-east-2.amazonaws.com/wernextheneration/DSC_0936.JPG':`“What a great contribution iCreativity Camp is to Young Dreamers and our community. Thank you, Child Inspirer.” – Mr. Conor Gallogly (a community member)                                                    `},
        partners: [`https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg`,`https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg`,`https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg`,`https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg`,`https://i.ytimg.com/vi/EjexPWJTaGo/hqdefault.jpg`],
        signupPic: `https://s3.us-east-2.amazonaws.com/wernextheneration/safeplace_YD1.jpeg`
      }
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
    background-color:#EF7C27;
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
