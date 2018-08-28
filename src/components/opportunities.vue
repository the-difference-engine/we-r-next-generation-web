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
            <button v-on:click.self="noLoginClick('/application/camper/1')" class="btn btn-primary appButtons">Sign up a Camper</button>
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
            <button v-on:click.self="noLoginClick('/application/volunteer/1')" class="btn btn-primary appButtons">Volunteer</button>
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
            <button v-on:click.self="noLoginClick('/partner')" class="btn btn-primary appButtons">Become a Partner</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import localforage from '../sessionUtils';
export default {
  name: 'opportunities',
  data() {
    return {
      pageContent: {
        camper: { imgSrc: '' },
        volunteer: { imgSrc: '' },
        partner: { imgSrc: '' }
      }
    };
  },
  methods: {
    noLoginClick: async function(value) {
      let session = await localforage.getItem('X_TOKEN');
      if (session) {
        this.$router.push(value);
      } else {
        swal({
          title: 'Please register',
          text:
            'You must be registered with the site to fill out an application.  You are being redirected now.',
          type: 'info',
          showCloseButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Sign Up'
        }).then(res => {
          if (res.value) {
            this.$router.push('/signup');
          }
        });
      }
    }
  },
  created() {
    axios
      .get('/api/v1/resources/applicationsPage')
      .then(res => {
        this.pageContent = res.data;
      }).catch(console.log);
  }
};
</script>

<style scoped>
p {
  font-size: larger;
}

h3 {
  margin-top: 0;
  font-weight: bolder;
}
#subtitle {
  margin-top: 10px;
}

.opportunity {
  margin-bottom: 50px;
  margin-top: 45px;
}

.caption {
  text-align: justify;
}

#getInvolved {
  background-color: #7ddbd4;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4%;
  border: none;
}
.appButtons {
  background-color: #5faaf6;
  border-color: #5faaf6;
}
.button-wrapper {
  text-align: center;
}
</style>
