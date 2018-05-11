<template>
  <div id="background-img">
    <div id="login-container" class="container">
      <h1 id="login-header">Log In</h1>
      <div class="row">
        <div id="sign-up-div" class="col-xs-12 col-sm-6"><span id="sign-up"><i>Aren't a member yet?</i></span></div>
        <div class="col-xs-12 col-sm-6"><router-link to="/signup"><button class="green-btn btn btn-primary" id="sign-up-btn">Sign Up</button></router-link></div>
      </div>
      <p id="login-err" v-if="loginErr">You were unable to login with the information provided.</p>
      <div class="row">
        <form v-on:submit.prevent="submitLogin" class="container-fluid" id="login-form">
          <div class="row" id="form-row">
            <span id="email-tag">Email</span>
            <input class="form-control form-highlight" name="email" id="email" />
            <div id="password-container">
              <span id="password-tag">Password</span>
              <div>
                <span id="toggle-container">{{toggleText}}</span>
                <button id="password-toggle" type="button" v-on:click="switchVisibility"><i :class="toggleClass" aria-hidden="true"></i></button>
              </div>
            </div>
              <input class="form-control form-highlight" name="password" :type="passwordFieldType" />
            <p><router-link id="password-reminder" to="/forgotPassword">I forgot my password</router-link></p>
            <input class="green-btn btn btn-primary" id="login-submit" type="submit" value="Log In" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      submitLogin: function(evt) {
        this.$store.dispatch('login', {
          email: evt.target.email.value,
          password: evt.target.password.value,
          router: this.$router,
          that: this
        })
      },
      switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        this.toggleClass = this.toggleClass === 'fa fa-toggle-on' ? 'fa fa-toggle-off' : 'fa fa-toggle-on'
        this.toggleText = this.toggleText === 'Show' ? 'Hide' : 'Show'
      }
    },
    data () {
      return {
        loginErr: false,
        passwordFieldType: 'password',
        toggleClass: 'fa fa-toggle-on',
        toggleText: 'Show'
      }
    }
  }
</script>

<style scoped>
  span {
    color: gray;
    font-size: 16px;
  }
  #login-err{
    color: red;
    background-color: #ededed;
    border-radius: 10px;
    padding: 12px 0;
  }
  #login-header {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: bold;
  }
  #login-submit {
    width: 100%;
    margin-top: 10px;
    height: 45px;
  }
  #password-reminder {
    color: #ff9327;
  }
  #password-container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  #password-toggle {
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 17px;
  }
  #toggle-container {
    font-size: 14px;
  }
  #email-tag {
    float: left;
  }
  #password-tag {
    float: left;
  }
  #login-form {
    text-align: center;
  }
  #form-row > span {
    margin-bottom: 5px;
    font-size: 16px;
  }
  #form-row > input {
    margin-bottom: 20px;
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
    background: white url("http://res.cloudinary.com/wernextgeneration/image/upload/v1522972807/wernextgen-login.jpg") no-repeat fixed center;
    opacity: 0.8;
    width: 100%;
    height: 100vh;
  }
  #login-container {
    /* desktop */
    width: 37%;
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
    #login-container {
      width: 95%;
      padding: 10px 30px;
    }
    #sign-up-div {
      margin-bottom: 10px !important;
    }
  }
  /* extra breakpoint between mobile and tablet */
  @media screen and (max-width: 440px) and (min-width: 320px) {
    #login-container {
      width: 85%;
      padding: 10px 35px;
    }
    #sign-up-div {
      margin-bottom: 10px !important;
    }
  }
  /* tablet */
  @media screen and (max-width: 768px) and (min-width: 441px) {
    #login-container {
      width: 70%;
      padding: 15px 55px;
    }
    #sign-up-div {
      margin-bottom: 10px !important;
    }
  }
  /* laptop */
  @media screen and (max-width: 1024px) and (min-width: 769px) {
    #login-container {
      width: 55%;
      padding: 15px 55px;
    }
  }
</style>
