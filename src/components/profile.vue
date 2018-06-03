<!--An empty component to replace the header and/or footer on pages where it is not required-->

<template>
  <div id="wrapper">
    <div class="row" id="boxHolder">
      <div class="boxes col" id="sideBar">
        <h3 class="profileNav" v-on:click="changeStatus('profile')" v-bind:class="status.profile" id="profile">Profile</h3>
        <h3 class="profileNav" v-on:click="changeStatus('camp')" v-bind:class="status.camp" id="camp">Camp Application</h3>
        <h3 class="profileNav" v-on:click="changeStatus('volunteer')" v-bind:class="status.volunteer" id="volunteer">Volunteer Application</h3>
        <h3 class="profileNav" v-on:click="changeStatus('partner')" v-bind:class="status.partner" id="partner">Partner Application</h3>
      </div>
      <div class="boxes col" id="main">
        <div id="mainHeader">
          <div id="titleDiv">
            <h2 id="mainTitle" class="text-left gray">Profile Page</h2>
          </div>
          <div id="editDiv">
            <button id="editButton" class="btn btn-primary">Edit Profile</button>
          </div>
        </div>
        <div id="mainMid">
          <div id="userInfo">
            <h2 class="bold">{{ sessionInfo.full_name }}</h2>
            <h3 class="bold">Address: {{ sessionInfo.address }}</h3>
            <h3 id="email" class="bold">Email: {{ sessionInfo.email }}</h3>
            <h3 id="phone" class="bold">Phone #: {{ sessionInfo.phone }}</h3>
          </div>
          <img src="\static\assets\saturn1.jpg" alt="image not found">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils';
  import axios from 'axios';
  export default {
    name: 'profile',
    data () {
      return {
        sessionId: "",
        sessionInfo: {},
        status: {
          profile: "active",
          camp: "inactive",
          volunteer: "inactive",
          partner: "inactive",
        }
      }
    },
    methods: {
      changeStatus: function(link) {
        if (link === 'profile') {
          this.status.profile = "active";
          this.status.camp = "inactive";
          this.status.volunteer = "inactive";
          this.status.partner = "inactive";
        }
        if (link === 'camp') {
          this.status.camp = "active";
          this.status.profile = "inactive";
          this.status.volunteer = "inactive";
          this.status.partner = "inactive";
        }
        if (link === 'volunteer') {
          this.status.volunteer = "active";
          this.status.camp = "inactive";
          this.status.profile = "inactive";
          this.status.partner = "inactive";
        }
        if (link === 'partner') {
          this.status.partner = "active";
          this.status.camp = "inactive";
          this.status.volunteer = "inactive";
          this.status.profile = "inactive";
        }
      }
    },
    created() {
      localforage.getItem('X_TOKEN').then(session => {
        this.sessionId = session
        axios.get('/api/v1/profile/' + session, { 'headers': { 'x-token': this.sessionId } }).then(response => {
          this.sessionInfo = response.data
          console.log("INFO", this.sessionInfo);
        }).catch(e => {
          this.errors = e
        })

      }).catch(err => console.error(err))
    }
  }

</script>

<style scoped>
  #wrapper {
    background: radial-gradient(rgb(252, 166, 109), hsla(34, 96%, 68%, 0.78));
    justify-content: center;
    padding-bottom: 60px;
  }
  .boxes {
    background-color: white;
    border: 5px solid rgb(140, 218, 192);
    border-radius: 12px;
    display: inline-block;
  }
  #sideBar {
    width: 25%;
    margin-right: 5%;
    vertical-align: top;
    padding-bottom: 15px;
  }
  #main {
    width: 60%;
    justify-content: center;
  }
  #boxHolder {
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 60px;
  }
  #mainMid {
    display: flex;
    justify-content: space-between;
    padding-left: 5%;
    border-bottom: 2px solid rgb(190, 190, 190);
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  #mainHeader {
    border-bottom: 2px solid rgb(190, 190, 190);
    display: flex;
    justify-content: space-between;
  }
  .gray {
    color: gray;
  }
  .bold {
    font-weight: bold;
  }
  #editButton {
    background-color: white;
    color: rgb(140, 218, 192);
    font-weight: bolder;
    border: 2px solid rgb(140, 218, 192);
    border-radius: 7px;
  }
  img {
    width: 35%;
    height: 35%;
    border-radius: 10px;
    margin-right: 5%;
  }
  #userInfo {
    display: inline-block;
  }
  #titleDiv {
    display: inline-block;
    margin-left: 5%;
  }
  #editDiv {
    padding-top: 15px;
    margin-right: 5%;
  }
  .profileNav {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .active {
    background-color: rgb(140, 218, 192);
  }
  .inactive {
    background-color: white;
  }
</style>
