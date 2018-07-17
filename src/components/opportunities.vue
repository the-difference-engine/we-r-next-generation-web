<template>
  <div class="opportunities">
    <h1>Opportunities</h1>
    <h3 id="subtitle">...to foster creativity in our kids</h3>
    <div class="opportunity">
      <div class="row">
        <div class="col-sm-5 col-xs-offset-1 col-xs-10"><img :src="pageContent.camper.imgSrc" :alt="pageContent.camper.imgAlt" class="img-responsive"></div>
        <div class="col-sm-5 col-sm-offset-0 col-xs-10 col-xs-offset-1 caption">
          <h3>{{ pageContent.camper.headline }}</h3>
          <p>{{ pageContent.camper.caption }}</p>
          <p>{{ pageContent.camper.callToAct }}</p>
          <div class="button-wrapper">
            <router-link class="btn btn-primary appButtons" to="/application/camper/1">Sign up a Camper</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="opportunity">
      <div class="row">
        <div class="col-sm-5 col-xs-offset-1 col-xs-10"><img :src="pageContent.volunteer.imgSrc" :alt="pageContent.volunteer.imgAlt" class="img-responsive"></div>
        <div class="col-sm-5 col-sm-offset-0 col-xs-10 col-xs-offset-1 caption">
          <h3>{{ pageContent.volunteer.headline }}</h3>
          <p>{{ pageContent.volunteer.caption }}</p>
          <p>{{ pageContent.volunteer.callToAct }}</p>
          <div class="button-wrapper">
            <router-link id="volunteer" class="btn btn-primary appButtons" to="application/volunteer/1">Volunteer</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="opportunity">
      <div class="row">
        <div class="col-sm-5 col-xs-offset-1 col-xs-10"><img :src="pageContent.partner.imgSrc" :alt="pageContent.partner.imgAlt" class="img-responsive"></div>
        <div class="col-sm-5 col-sm-offset-0 col-xs-10 col-xs-offset-1 caption">
          <h3>{{ pageContent.partner.headline }}</h3>
          <p>{{ pageContent.partner.caption }}</p>
          <p>{{ pageContent.partner.callToAct }}</p>
          <div class="button-wrapper">
            <router-link class="btn btn-primary appButtons" to="/partner">Become a Partner</router-link>
          </div>
        </div>
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
      })
      .catch(console.log)
    },
  }
</script>

<style scoped>

  p {
    font-size: larger
  }

  h3{
    margin-top: 0;
    font-weight: bolder;
  }
  #subtitle {
    margin-top: 10px;
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
  .appButtons {
    background-color: #5FAAF6;
    border-color: #5FAAF6;
  }
  .button-wrapper {
    text-align: center;
  }

</style>
