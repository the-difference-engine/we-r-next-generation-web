<template>
  <div class="container-fluid" id="carousel-container">
    <div class="row" id="jumbotron">
      <img class="image hero" src="http://res.cloudinary.com/wernextgeneration/image/upload/v1528160064/hero1.jpg" />
    </div>
    <div class="row" id="header">
      <h1>About Student's Experience</h1>
    </div>
    <div class="container-fluid row">
      <div id='action-carousel' class='row'>
        <carousel :navigationEnabled="true" :perPage="1">
          <slide v-for="story in stories" :key="story._id.$oid" style="width: 100%;">
            <div class="container-fluid">
              <div class="row">
                <div class="about col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <p class="text-overflow"><span v-html="story.about"></span></p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <div class="story-pic-border">
                    <img class="story-pic" :src="story.image" :alt="'Child Story'"/>
                  </div>
                  <p id="student-name">{{story.name}}</p>
                </div>
              </div>
              <div class="row lower-row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <img class="artwork" :src="story.artwork" :alt="'Child Artwork'"/>
                </div>
                <div class="learned col-xs-12 col-sm-6 col-md-6 col-lg-6">
                  <h2>What did I learn?</h2>
                  <p class="text-overflow"><span v-html="story.learned"></span></p>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
    <div id="camp-lagos-2015" class="row">
      <h1>Camp Lagos 2015</h1>
      <div id="camp-image-container" class="col-xs-12">
        <img class="image" src="http://res.cloudinary.com/wernextgeneration/image/upload/v1522972807/wernextgen-login.jpg" />
      </div>
      <h2>This photo was taken July 1 2015.</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'successStories',
  data() {
    return {
      stories: []
    };
  },
  components: {
    Carousel,
    Slide
  },
  created() {
    axios
      .get('/api/v1/successStories')
      .then(res => (this.stories = res.data))
      .catch(err => console.error(err));
  }
};
</script>

<style scoped>
#header {
  padding-top: 15px;
}
.hero {
  max-height: 100%;
}
#camp-lagos-2015 {
  color: white;
  background-color: #7ddbd4;
  padding: 20px 40px;
}
#student-name {
  background-color: #7ddbd4;
  color: white;
  font-size: 24px;
  padding: 10px 0;
  font-weight: bold;
}
#camp-image-container {
  border: 20px solid white;
  background-color: white;
  padding: 20px 10px;
  margin: 30px 0;
  height: auto;
}
.image {
  width: 100%;
}
#action-carousel {
  width: 90%;
  margin: auto;
  margin-top: 2.5%;
  text-align: center;
}
.pad-slide {
  width: 100%;
  text-align: center;
}
#carousel-container {
  margin: auto !important;
}
.text-overflow {
  overflow-y: scroll;
  max-height: 300px;
}
.about {
  font-size: 22px;
  line-height: 36px;
  text-align: left;
}
.lower-row {
  padding-top: 50px;
}
.learned {
  font-size: 22px;
  line-height: 40px;
}
.learned > p {
  text-align: left;
}
.story-pic-border {
  background-color: #7ddbd4;
  padding-top: 20px;
}
.story-pic {
  max-width: 325px;
  max-height: 300px;
}
.artwork {
  max-width: 300px;
  max-height: 300px;
}
@media screen and (max-width: 825px) and (min-width: 769px) {
  .story-pic,
  .artwork {
    max-width: 275px;
  }
}
@media screen and (max-width: 768px) and (min-width: 426px) {
  .story-pic,
  .artwork {
    max-width: 225px;
  }
  .text-overflow {
    font-size: 20px;
  }
}
@media screen and (max-width: 425px) and (min-width: 386px) {
  .story-pic,
  .artwork {
    max-width: 225px;
  }
  .text-overflow {
    font-size: 18px;
    line-height: 36px;
  }
}
@media (max-width: 385px) {
  .story-pic,
  .artwork {
    max-width: 150px;
  }
  .text-overflow {
    font-size: 18px;
    line-height: 34px;
  }
}
</style>
