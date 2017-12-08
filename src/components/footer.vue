<template>
  <div class="footer">
    <div id="footer" class="row">
      <div id="footer_top" class="col-lg-12">
        <div class="row">
          <div id="footer_left" class="col-sm-12 col-lg-4">
            <h4>Contact Us</h4>
            <a href="mailto:info@wearenextgeneration.org?Subject=Contact%20from%20website">info@wearenextgeneration.org</a>
            <p>Address</p>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
          </div>
          <div id="footer_center" class="col-sm-12 col-lg-4">
            <h4>The Company</h4>
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">Participate</a></li>
              <li><a href="">Sign Up</a></li>
              <li><a href="">Login</a></li>
              <li><a href="">Donate</a></li>
              <li><a href="">FAQ</a></li>
            </ul>
          </div>
          <div id="footer_right" class="col-sm-12 col-lg-4">
            <h4>Connect</h4>
            <div class="row">
              <p><span class="glyphicon glyphicon-record"></span>&nbsp&nbsp<span class="glyphicon glyphicon-record"></span>&nbsp&nbsp<span class="glyphicon glyphicon-record"></span></p>
            </div>

          </div>
        </div>
      </div>
      <div id="footer_bottom">
        <p><img src="assets/WeRNextGeneration.png" alt="WeRNextGeneration Logo" width="100px">&nbsp&nbsp&nbsp&copy&nbspCopyright 2017</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {

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
