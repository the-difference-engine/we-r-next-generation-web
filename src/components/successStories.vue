<template>
  <div class="container" id="carousel-container">
    <div class="row" id="jumbotron">
    </div>
    <div class="row" id="header">
      <h1>About Student's Experiences</h1>
    </div>
    <div id='action-carousel' class='row'>
      <carousel :navigationEnabled="true" :perPage="1">
        <slide v-for="story in stories" :key="story._id.$oid">
          <div class="container-fluid">
            <div class="row">
              <div class="about col-xs-12 col-sm-6 col-md-6">
                <p>{{story.about}}</p>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <img class="pic" :src="story.image" :alt="'Child Story id: ' + story._id.$oid"/>
              </div>
              <div class="learned col-xs-12">
                <p>{{story.learned}}</p>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { Carousel, Slide } from 'vue-carousel';
  export default {
    name: 'successStories',
    data () {
      return {
        stories: []
      }
    },
    components: {
      Carousel,
      Slide
    },
    created() {
      axios.get('/api/v1/successStories')
      .then(res => this.stories = res.data)
      .catch(err => console.error(err))
    }
  }
</script>

<style scoped>
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
.about {

}
.pic {
  max-width: 300px;
  max-height: 300px;
}
.learned {
  padding-top: 50px;
}
@media (max-width:385px) {
  .pic {
    max-width:150px;
  }
}
</style>
