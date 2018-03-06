<template>
  <div class="header container-fluid">
    <div id="header" class="row">
      <div id="header-left" class="col-xs-3 col-sm-3">
        <router-link to="/home">
        <img src="static/assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" class="img-responsive">
        </router-link>
      </div>
          <div alt="Menu Button" class="col-xs-4" id="menu-button">
            <button v-on:click.prevent="toggleMenu" v-bind:class="{'is-active': menuClicked}" class="hamburger hamburger--collapse" type="button">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
          <div id="header-right" class="menu-items col-xs-9 col-sm-9" v-bind:class="{ showMenu: menuClicked }">
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
      },
      toggleMenu: function(){
        this.menuClicked = !this.menuClicked
        console.log('oohoooo!')
      }
    },
    data () {
      return {
        profileImage: '<span class="glyphicon glyphicon-user"></span>',
        loggedIn: false,
        menuClicked: false
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
    flex-wrap: wrap;
  }
  .menu-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .3s linear;
  }
  #menu-button {
    display: none;
  }
  @media (max-width: 700px) {
    .menu-items {
      visibility: hidden;
      height:1px;
      width:100%;
      display: flex;
    }
    #menu-button {
      display: inline-block;
      width: 30%;
    }
    #header-left {
      width: 60%
    }
    .showMenu {
    width: 100%;
    visibility: visible;
    height: 50px;
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
