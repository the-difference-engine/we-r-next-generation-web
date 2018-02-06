<template>
  <div class="footer">
    <div id="footer" class="row">
      <div id="footer_top" class="col-lg-12">
        <div class="row">
          <div id="footer_left" class="col-sm-12 col-lg-4">
            <h4>The Company</h4>
            <ul>
              <li><router-link to="/home">Home</router-link></li>
              <li><router-link to="/volunteer">Participate</router-link></li>
              <li><router-link to="/signup">Sign Up</router-link></li>
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/donate">Donate</router-link></li>
              <li><router-link to="/faq">FAQ</router-link></li>
            </ul>
          </div>
          <div id="footer_center" class="col-sm-12 col-lg-4">
            <h5>Thank you for your interest in We R NextGeneration, the Charity that Inspires.</h5>
            <h4>Contact Us:</h4>
            <p>16501 Shady Grove Road, #8656, Gaithersburg, MD 20898</p>
            <p>Tel. 1-240-224-3430</p>
            <a href="mailto:info@wearenextgeneration.org?Subject=Contact%20from%20website">info@wearenextgeneration.org</a>
          </div>

          <div id="footer_right" class="col-sm-12 col-lg-4">
            <h4>Connect</h4>
            <div class="row">
              <p><span class="fa fa-facebook"></span>&nbsp&nbsp<span class="fa fa-instagram""></span>&nbsp&nbsp<span class="fa fa-twitter"></span></p>
            </div>

          </div>
        </div>
      </div>
      <div id="footer_bottom">
        <p><img src="static/assets/WeRNextGeneration_white.png" alt="WeRNextGeneration Logo" width="100px">&nbsp&nbsp&nbsp&copy&nbspCopyright 2017</p>
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

  /*Footer Styling*/
  #footer{
    background-color:#CAC8C8;
    color: white;
    height: auto;
    width: 100%;
  }

  #footer_center>a, #footer_left>ul>li>a{
    color:white;
  }

  #footer_left>ul{
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
