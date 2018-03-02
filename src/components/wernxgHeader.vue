<template>
  <div class="header container-fluid">
    <div id="header" class="row">
      <div id="header-left" class="col-sm-3 col-xs-8">
        <router-link to="/home">
        <img src="static/assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" class="img-responsive">
        </router-link>
      </div>
      <div id="header-right" class="col-sm-9 col-xs-4">
        <div id="right-container">
          <ul id="header_menu">
            <li><router-link to="/campInfo">The Camp</router-link></li>
            <li><router-link to="/successStories">Success Stories</router-link></li>
            <li><router-link to="/volunteer">Get Involved</router-link></li>
            <li v-if="(!this.loggedIn && !loginStatus)"><router-link to="/login">Log In</router-link></li>
            <li v-if="(this.loggedIn || loginStatus)"><button
              class="btn btn-primary"
              v-on:click.prevent="submitLogout">Logout
            </button></li>
            <li v-if="(!this.loggedIn && !loginStatus)"><router-link to="/signup">Sign Up</router-link></li>
            <li ><router-link to="/donate"> <button id="donate" class="btn btn-primary btn-md">Donate</button></router-link></li>
            <li><router-link to="/profile" v-html="profileImage"></router-link></li>
          </ul>
          <div id="menu-button">
            <img src="static/assets/hamburger-menu-icon.svg" alt="Menu Button"/>
          </div>
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
  }
  #header-left {
    padding-left: 30px;
  }
  #header-right {
    /* padding-left: 30px; */
    display: flex;
    justify-content: flex-end;
  }
  /* header right seems to wrap just under 945 width, need to change sizes or something */
/*//////////////////// */
  /*Header Styling*/
  #header_menu{
    list-style: none;
  }
  #header_menu>li{
    display: inline-block;
    padding: 10px 2px;
  }
  #menu-button {
    display: none;
  }
  @media (max-width: 700px) {
    #header_menu {
      display: none;
      }
    #menu-button {
      display: inline-block
    }
    #right-container {
      padding-right: 20%;
      padding-top: 5px;
    }
  }
  @media (min-width: 755px) {
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
  }

  #donate{
    background-color: #FF9327;
    color: white;
    border-color: #FF9327;
    font-size: 16px;
    font-weight: 700;
  }

</style>
