<template>
  <div class="boxes col" id="sideBar">
    <h3 class="profileNav" v-on:click="changeStatus('profile')" v-bind:class="status.profile" id="profile">Profile</h3>
    <h3 class="profileNav" v-on:click="changeStatus('camp')" v-bind:class="status.camp" id="camp">Camp Application</h3>
    <h3 class="profileNav" v-on:click="changeStatus('volunteer')" v-bind:class="status.volunteer" id="volunteer">Volunteer Application</h3>
    <h3 class="profileNav" v-on:click="changeStatus('partner')" v-bind:class="status.partner" id="partner">Partner Application</h3>
  </div>
</template>

<script>
import axios from 'axios';
import localforage from '../sessionUtils';
export default {
  name: 'profileSidebar',
  data() {
    return {
      status: {
        profile: 'active',
        camp: 'inactive',
        volunteer: 'inactive',
        partner: 'inactive'
      }
    };
  },
  methods: {
    changeStatus: function(link) {
      if (link === 'profile') {
        this.status.profile = 'active';
        this.status.camp = 'inactive';
        this.status.volunteer = 'inactive';
        this.status.partner = 'inactive';
      }
      if (link === 'camp') {
        this.status.camp = 'active';
        this.status.profile = 'inactive';
        this.status.volunteer = 'inactive';
        this.status.partner = 'inactive';
      }
      if (link === 'volunteer') {
        this.status.volunteer = 'active';
        this.status.camp = 'inactive';
        this.status.profile = 'inactive';
        this.status.partner = 'inactive';
      }
      if (link === 'partner') {
        this.status.partner = 'active';
        this.status.camp = 'inactive';
        this.status.volunteer = 'inactive';
        this.status.profile = 'inactive';
      }
    }
  },
  created() {
    localforage
      .getItem('X_TOKEN')
      .then(session => {
        this.sessionId = session;
        axios
          .get('/api/v1/profile/' + session, {
            headers: { 'x-token': this.sessionId }
          })
          .then(response => {
            this.sessionInfo = response.data;
          })
          .catch(e => {
            this.errors = e;
          })
          .then(application => {
            axios
              .get(`/api/v1/applications/${this.campApplication._id.$oid}`, {
                headers: { 'x-token': session }
              })
              .then(res => {
                this.campApplication = res.data;
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
};
</script>

<style scoped>
#sideBar {
  width: 25%;
  margin-right: 5%;
  vertical-align: top;
  padding-bottom: 15px;
}
.profileNav {
  padding-top: 15px;
  padding-bottom: 15px;
}
.profileNav:hover {
  cursor: pointer;
}
.active {
  background-color: rgb(140, 218, 192);
}
.inactive {
  background-color: white;
}
</style>
