<template>
  <div class="opportunities">
    <h1>Opportunities</h1>
    <h3>...to foster creativity in our kids</h3>
    <div class="opportunity">
      <div class="row">
        <div class="col-sm-5 col-xs-offset-1 col-xs-10"><img :src="pageContent.camper.imgSrc" :alt="pageContent.camper.imgAlt" class="img-responsive"></div>
        <div class="col-sm-5 col-sm-offset-0 col-xs-10 col-xs-offset-1 caption">
          <h3>{{ pageContent.camper.headline }}</h3>
          <p>{{ pageContent.camper.caption }}</p>
          <p>{{ pageContent.camper.callToAct }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 col-xs-offset-1 col-xs-10"><img :src="pageContent.volunteer.imgSrc" :alt="pageContent.volunteer.imgAlt" class="img-responsive"></div>
        <div class="col-sm-5 col-sm-offset-0 col-xs-10 col-xs-offset-1 caption">
          <h3>{{ pageContent.volunteer.headline }}</h3>
          <p>{{ pageContent.volunteer.caption }}</p>
          <p>{{ pageContent.volunteer.callToAct }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 col-xs-offset-1 col-xs-10"><img :src="pageContent.partner.imgSrc" :alt="pageContent.partner.imgAlt" class="img-responsive"></div>
        <div class="col-sm-5 col-sm-offset-0 col-xs-10 col-xs-offset-1 caption">
          <h3>{{ pageContent.partner.headline }}</h3>
          <p>{{ pageContent.partner.caption }}</p>
          <p>{{ pageContent.partner.callToAct }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
        <h3>If you are interested in helping children embrace their creative side, sign up and submit an application</h3>
        <router-link to="/signup">
          <button id="getInvolved" type="button" class="btn btn-primary btn-lg">Sign Up</button>
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
        pageContent: {camper: {imgSrc: ""},
                      volunteer: {imgSrc: ""},
                      partner: {imgSrc: ""}},

      }
    },
    created() {
      axios.get('/api/v1/resources/applicationsPage')
      .then(res => {
        this.pageContent = res.data
        console.log(this.pageContent)
      })
      .catch(console.log)
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

  .opportunity{
    margin-bottom: 50px;
    margin-top: 45px;
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
