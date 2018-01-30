<template>
  <div class="campInfo">
    <div id="hero-image">
      <img src="static/assets/camp_info_hero_image.jpg" alt="Group photo of active campers and volunteer" width="80%">
      <h2><span>Every Child Needs An Audience | Young Dreams, Our Pride</span></h2>
    </div>
    <div class="row">
      <h1>How it Works/Brief History</h1>
      <div class="col-sm-offset-1 col-sm-10">
        <p>iCreativity Camp is a platform for an enchanting adventure in which every 10-12yr-old dreamer encounters failures and thrives for success through build confidence, resourcefulness and leadership.
        Although, he was a brilliant student, 11 year old Adebo Ifesanya (founder of We R NextGeneration Inc.) was a clueless young dreamer. He had attempted couple of times to launch his prototype homemade rockets into space, at his home in Lagos Nigeria but failed as a boy. He had dreamed of becoming one of African’s first space-exploration pioneers.
        Decades later, he had acquired his master degree and became employed as an electrical engineer with the U.S. Navy but realizes the young Adebo had failed due not to a lack of resources. Rather it was the lack of both confidence in his innate creativity and the resourcefulness to lead his dream.
        We R NextGeneration, Inc. was founded in 2012 to bring every 10-12yr-old pupil the suitable platform with an audience, namely iCreativity Camp, on which to exhibit individual creativity while also growing in confidence, resourcefulness and leadership.</p>
      </div>
    </div>
    <div class="row" id="curriculum">
      <h1>Curriculum</h1>
      <div class="col-sm-offset-1 col-sm-10">
        <p>The iCreativity Camp event is an enchanting adventure of dramatic but fun eight-episode weekly activities. These activities are created from both a young dreamer’s imagination and her or his acquired iCreativity Camp resources.
          At the iCreativity Camp event, the young dreamer’s goal is to create an original idea and exhibit it as an innovation for a Showcase event finale.
          Each episode of the iCreativity Camp event is just enough guide, but with room for limitless imagination, self-learning and growing iCreativity.</p>
        <div class="row">
          <h1>The iCreativity Camp event’s Guides:</h1>
          <div class="col-sm-offset-1 col-sm-4">
            <p>Episode 1 – ABOUT YOU</p>
            <p>Episode 2 – SPOT THE PROBLEM</p>
            <p>Episode 3 – IMAGINE THAT</p>
            <p>Episode 4 – HOW NOW</p>
          </div>
          <div class="col-sm-offset-1 col-sm-4">
            <p>Episode 5 – DO AND BUILD</p>
            <p>Episode 6 – CHECK, CHECK</p>
            <p>Episode 7 – REHEARSAL</p>
            <p>Episode 8 – SHOWCASE</p>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'faq',
    data () {
      return {
        category_set: new Set(),
        curr_category: "all",
        faqs: [],
      }
    },
    generate_categories() {

    },
    created() {
      axios.get('/api/v1/faq').then(response => {
        this.faqs = response.data
        for (let faq of response.data) {
          this.category_set.add(faq.category)
        }
        this.categories = Array.from(this.category_set)
      }).catch(e => {
        this.errors = e
      })
    },
  }
</script>

<style scoped>
  #hero-image {
    position: relative;
    text-align: center;
    margin: auto;
  }
  h2 {
    position: absolute;
    top: 70%;
    left: 15%;
  }
  h2 span {
    color: white;
    font: bold 24px/45px Helvetica, Sans-Serif;
    letter-spacing: -1px;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
  }
</style>
