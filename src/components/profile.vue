<!--An empty component to replace the header and/or footer on pages where it is not required-->

<template>
  <div id="wrapper">
    <div class="row" id="boxHolder">
      <div class="boxes col" id="sideBar">
        <h3 id="sideHeader">Profile</h3>
        <a href="">Camp Application</a>
        <a href="">Volunteer Application</a>
        <a href="">Partner Application</a>
      </div>
      <div class="boxes col" id="main">
        <div id="mainBox">
          <div id="mainHeader" class="row">
            <div id="titleDiv" class="text-left col-md-6">
              <h2 id="mainTitle" class="text-left gray">Profile page</h2>
            </div>
            <div id="editDiv" class="text-right col">
              <button id="editButton" class="btn btn-primary">Edit Profile</button>
            </div>
          </div>
          <div id="mainMid" class="row">
            <div id="userInfo" class="text-left col-md-6">
              <h2 class="bold">{{ sessionInfo.full_name }}</h2>
              <h5 class="gray bold">Address:</h5>
              <p class="bold">{{ sessionInfo.address }}</p>
              <h5 id="email" class="gray bold">Email:</h5>
              <h5 id="phone" class="gray bold">Phone #:</h5>
            </div>
            <div id="profilePic" class="col">
              <img src="\static\assets\saturn1.jpg" alt="">
            </div>
          </div>
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
        sessionInfo: {}
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
  #mainHeader {
    border-bottom: 2px solid rgb(190, 190, 190);
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
  }
  #mainTitle {
    display: inline-block;
  }
  #editDiv {
    vertical-align: bottom;
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
    margin-top: 5%;
  }
  img {
    width: 35%;
    border-radius: 10px;
  }
  #userInfo {
    display: inline-block;
    vertical-align: top;
  }
  #mainBox {
    width: 90%;
    margin-left: 5%;
  }
</style>
