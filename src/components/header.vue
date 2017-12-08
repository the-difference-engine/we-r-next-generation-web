<template>
  <div class="header">
    <div id="header" class="row">
      <div id="header_left" class="col-sm-12 col-lg-4">
        <img src="src/assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" width="200px">
      </div>
      <div id="header_right" class="col-sm-12 col-lg-6 col-lg-offset-2">
        <ul id="header_menu">
          <li><router-link to="/info">The Camp</router-link></li>
          <li><a href="">Get Involved</a></li>
          <li><router-link to="/login">Log In</router-link></li>
          <li><a href="">Sign Up</a></li>
          <li ><a href="" id="donate">Donate</a></li>
          <li><a href="" v-html="profileImage"></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
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

  /*Footer Styling*/
  #footer{
    background-color:#CAC8C8;
    color: white;
    position : fixed;
    bottom: 0;
    height: auto;
    width: 100%;
  }

  #footer_left>a, #footer_center>ul>li>a{
    color:white;
  }

  #footer_center>ul{
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
    list-style: none;
    margin-left:-40px;
  }

  #footer_right{
    vertical-align: bottom;
    text-align: center;
  }

  #footer_bottom{
    text-align: center;
  }
</style>
