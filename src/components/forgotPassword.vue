<template>
  <div id="background-img">
    <div id="forgot-pwsd" class="container">
      <h2 id="forgot-pswd-header">Forgot Password</h2>
      <p id="description">Enter the email address you use to login and we'll send you an email with instructions on how to reset your password.</p>
      <form id="forgot-pswd-form" class="container-fluid">
        <div class="row">
          <span id="email">Email</span>
          <input name="email" class="form-control form-highlight" />
          <div id="remembered-pswd">
            <span>Just Remembered?</span>
            <router-link id="remembered-tag" to="/login">Log In</router-link>
          </div>
          <input class="green-btn btn btn-primary" id="forgot-pswd-submit" type="submit" value="Log In" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'forgotPassword',
    methods: {},
    data () {
      return {}
    }
}
</script>

<style scoped>
  #description {
    color: gray;
  }
  #remembered-tag {
    color: #ff9327;
  }
  span {
    color: gray;
  }
  #email-tag {
    float: left;
  }
  .form-highlight{
    width: 100%;
    font-size: 20px;
    height: 45px;
    border-color: gray;
  }
  .form-highlight:focus{
    border-color: #7ddbd4;
  }
  .green-btn {
    background-color: #7ddbd4;
    color: white;
    border: none;
    margin-bottom: 20px;
  }
  #background-img {
    background: white url("http://www.jsums.edu/education/files/2012/12/bigstock-Four-Children-At-Computer-Term-3917429.jpg?x56568") no-repeat fixed center;
    opacity: 0.7;
    width: 100%;
    height: 100vh;
  }
  #forgot-pwsd {
    /* desktop */
    width: 33%;
    padding: 20px 70px;
    /* all sizes */
    height: auto;
    opacity: 1 !important;
    margin: auto;
    border-radius: 10px;
    border: 4px solid #ea8432;
    background-color: white;
    text-align: center;
    font-family: helvetica;
    position: relative;
    top: 40px;
  }
  /* mobile */
  @media screen and (max-width: 320px) and (min-width: 0px) {
    #forgot-pwsd {
      width: 95%;
      padding: 10px 30px;
    }
  }
  /* extra breakpoint between mobile and tablet */
  @media screen and (max-width: 440px) and (min-width: 320px) {
    #forgot-pwsd {
      width: 85%;
      padding: 10px 35px;
    }
  }
  /* tablet */
  @media screen and (max-width: 768px) and (min-width: 441px) {
    #forgot-pwsd {
      width: 70%;
      padding: 15px 55px;
    }
  }
  /* laptop */
  @media screen and (max-width: 1024px) and (min-width: 769px) {
    #forgot-pwsd {
      width: 55%;
      padding: 15px 55px;
    }
  }
</style>
