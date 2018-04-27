<template>
  <div id="background-img">
    <div id="forgot-pwsd" class="container">
      <div v-if="requestMade" id="reset-popup">
        <h2>Check Your Email!</h2>
        <p>A link to reset your password has been sent to the email address you provided. Click through and confirm so you can create a new password!</p>
        <button v-on:click="requestMade = false" class="btn btn-primary">Exit</button>
      </div>
      <h2 id="forgot-pswd-header">Forgot Password</h2>
      <p id="description">Enter the email address you use to login and we'll send you an email with instructions on how to reset your password.</p>
      <p id="reset-pswd-error" v-if="resetError">The request was could not be processed! Please try again.</p>
      <form v-on:submit.prevent="resetPassword" id="forgot-pswd-form" class="container-fluid">
        <div class="row">
          <span id="email">Email</span>
          <input name="email" id="email-input" class="form-control form-highlight" />
          <div id="remembered-pswd">
            <span>Just Remembered?
            <router-link id="remembered-tag" to="/login">Log In</router-link>
            </span>
          </div>
          <input class="green-btn btn btn-primary" id="forgot-pswd-submit" type="submit" value="Reset Password" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'forgotPassword',
    methods: {
      resetPassword: function(evt) {
        this.$store.dispatch('resetPassword', {
          email: evt.target.email.value,
          that: this
          })
      }
    },
    data () {
      return {
        requestMade: false,
        resetError: false
      }
    }
}
</script>

<style scoped>
  #reset-pswd-error {
    color: red;
    background-color: #ededed;
    border-radius: 10px;
    padding: 12px 0;
  }
  #reset-popup {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    background-color: #fff;
    border-radius: 10px;
    width: 65%;
    min-width: 150px;
    height: auto;
    text-align: center;
    padding: 2rem;
    margin: auto;
    border: 1px solid #000;
    box-shadow: 0 0 0 2038px rgba(0,0,0,.5);
    z-index: 1;
  }
  #forgot-pswd-form {
    margin-top: 20px;
  }
  #forgot-pswd-header {
    font-weight: bold;
    margin-bottom: 25px;
  }
  #description {
    color: gray;
    font-size: 16px;
  }
  #remembered-tag {
    color: #ff9327;
  }
  #remembered-pswd {
    font-size: 12px;
  }
  span {
    color: gray;
    float: left;
  }
  #email-input {
    margin-bottom: 25px;
    margin-top: 7px;
  }
  #email {
    font-size: 15px;
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
  #forgot-pswd-submit {
    width: 100%;
    margin-top: 5px;
  }
  #background-img {
    background: white url("http://res.cloudinary.com/wernextgeneration/image/upload/v1522972807/wernextgen-login.jpg") no-repeat fixed center;
    opacity: 0.8;
    width: 100%;
    height: 100vh;
    min-width: 180px;
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
