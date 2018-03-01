<template>
  <div class="opportunities">
    <h1>Opportunities</h1>
    <h3>...to foster creativity in our kids</h3>
    <div v-for="entry in pageContent">
      <div class="row">
        <div class="col-lg-5 col-lg-offset-1"><img :src="entry.imgSrc" :alt="entry.imgAlt" width="80%"></div>
        <div class="col-lg-4 caption">
          <h3>{{ entry.headline }}</h3>
          <p>{{ entry.caption }}</p>
          <p>{{ entry.callToAct }}</p>
        </div>
      </div>
      <br>
    </div>
    <div class="row">
      <div class="col-lg-6 col-lg-offset-3">
        <h3>If you are interested in helping children embrace their creative side, sign up and submit an application</h3>
        <router-link to="/signup">
          <button id="getInvolved" type="button" class="btn btn-primary btn-lg">Get Involved</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'opportunities',
    data () {
      return {
        pageContent: [],
      }
    },
    created() {
      axios.get('/api/v1/opportunities').then(response => {
        this.pageContent = response.data
      }).catch(e => {
        this.errors = e
      })
    },
  }
</script>

<style scoped>

  p {
    font-size: larger
  }

  h2{
    font-weight: bolder
  }

  .caption{
    text-align: justify
  }

  #getInvolved {
    background-color:#7DDBD4;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4%;
    border: none;
  }

</style>
