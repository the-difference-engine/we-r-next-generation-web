<template>
  <div class="campInfo">
    <div id="hero-image">
      <img src="static/assets/camp_info_hero_image.jpg" alt="Group photo of active campers and volunteer" width="80%">
      <h2><span>Every Child Needs An Audience | Young Dreams, Our Pride</span></h2>
    </div>
    <div class="row" v-for="entry in pageContent">
      <h1>{{ entry.title }}</h1>
      <div class="col-sm-offset-1 col-sm-10">
        <div v-if="Array.isArray(entry.content)">
          <p v-for="item in entry.content">{{ item }}</p>
        </div>
        <div v-else>
          <p>{{ entry.content }}</p>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'campinfo',
    data () {
      return {
        pageContent: [],
      }
    },
    created() {
      axios.get('/api/v1/campinfo').then(response => {
        this.pageContent = response.data
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
