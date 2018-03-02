<template>
  <div class="header container-fluid">
    <div id="header" class="row">
      <div id="header-left" class="col-xs-3 col-sm-3">
        <router-link to="/home">
        <img src="static/assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" class="img-responsive">
        </router-link>
      </div>
      <div id="header-right" class="col-xs-9 col-sm-9">
        <div id="right-container">
          <div id="menu-items">
            <router-link to="/campInfo">The Camp</router-link>
            <router-link to="/successStories">Success Stories</router-link>
            <router-link to="/volunteer">Get Involved</router-link>
            <router-link to="/login" v-if="(!this.loggedIn && !loginStatus)">Log In</router-link>
            <button
              class="btn btn-primary"
              v-on:click.prevent="submitLogout" v-if="(this.loggedIn || loginStatus)">Logout
            </button>
            <router-link to="/signup" v-if="(!this.loggedIn && !loginStatus)">Sign Up</router-link>
            <router-link to="/donate"> <button id="donate" class="btn btn-primary btn-md">Donate</button></router-link>
            <router-link to="/profile" v-html="profileImage"></router-link>
          </div>
          <img src="static/assets/hamburger-menu-icon.svg" alt="Menu Button" class="img-responsive" id="menu-button"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from 'axios'
  export default {
    name: 'wernxgHeader',
    methods :{
      submitLogout: function (evt) {
        this.$store.dispatch('logout', {router: this.$router})
        this.loggedIn = false
      }
    },
    data () {
      return {
        profileImage: '<span class="glyphicon glyphicon-user"></span>',
        loggedIn: false
      }
    },
    created () {
      localforage.getItem('X_TOKEN')
      .then(session => {
        if (session == null) {
        console.log('user not logged in')}
        else {
          axios.get('/api/v1/sessions/' + session, { 'headers': { 'x-token': session } })
          .then((response, err) => {
          this.loggedIn = true
          console.log(response.data)
        })
        .catch(err => {
          if (err.toString().includes('401')) {
            console.log('session does not correspond to logged in')
          }
          else {console.error(err)}
          })
        }
      })
      .catch(console.error)
    },
    computed: {
      loginStatus () {
        return this.$store.state.loginStatus
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    color: black;
  }
  #header {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
  #header-right {
    /* padding-left: 10px; */
  }
  #menu-items {
    /* padding-left: 30px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /* header right seems to wrap just under 945 width, need to change sizes or something */
/*//////////////////// */
  /*Header Styling*/
  /* #header_menu{
    list-style: none;
  } */
  /* #header_menu>li{
    display: inline-block;
    /* padding: 10px 2px; */
  /* } */
  #menu-button {
    display: none;
  }
  @media (max-width: 700px) {
    #menu-items {
      display: none;
      }
    #menu-button {
      display: inline-block;
      width: 30%;
    }
    #header-left {
      width: 60%
    }
    #header-right {
      width: 40%;
    }
    /* #right-container {
      padding-right: 20%;
      padding-top: 5px;
    } */
  }
  /* @media (min-width: 755px) {
    #header_menu>li{
    display: inline-block;
    padding: 10px 5px;
    }
  }
    @media (min-width: 850px) {
    #header_menu>li{
    display: inline-block;
    padding: 10px 10px;
    }
    #right-container {
      padding-right: 1.8%;
    }
  }
  @media (min-width: 1040px) {
    #header_menu>li{
    display: inline-block;
    padding: 10px 20px;
    }
    #right-container {
      padding-right: 3.5%;
    }
  } */

  #donate{
    background-color: #FF9327;
    color: white;
    border-color: #FF9327;
    font-size: 16px;
    font-weight: 700;
  }

</style>
