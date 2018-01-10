<template>
  <div class="header">
    <div id="header" class="row">
      <div id="header_left" class="col-sm-12 col-lg-4">
        <router-link to="/home">
        <img src="src/assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" width="200px">
        </router-link>
      </div>
      <div id="header_right" class="col-sm-12 col-lg-6 col-lg-offset-2">
        <ul id="header_menu">
          <li><router-link to="/">The Camp</router-link></li>
          <li><router-link to="/volunteer">Get Involved</router-link></li>
          <li><router-link to="/login">Log In</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
          <li ><router-link to="/donate" id="donate">Donate</router-link></li>
          <li><router-link to="/profile" v-html="profileImage"></router-link></li>
          <li><button
            class="btn btn-primary"
            v-on:click.prevent="submitLogout">Logout
          </button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    methods :{
      submitLogout: function (evt) {
        this.$store.dispatch('logout', {router: this.$router})
      }
    },
    data () {
      return {
        profileImage: '<span class="glyphicon glyphicon-user"></span>'
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
    padding-bottom: 10px;
  }

  /*Header Styling*/
  #header_menu{
    list-style: none;
  }

  #header_menu>li{
    display: inline-block;
    margin: 10px 15px;
  }


  #donate{
    color: #FFC843;
  }

</style>
