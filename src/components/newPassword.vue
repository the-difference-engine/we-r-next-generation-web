<template>
  <div id="background-img">
    <div id="new-pwsd" class="container">
      <h2 id="new-pswd-header">Enter New Password</h2>
      <p id="description">Enter your new password twice and make sure they match!</p>
      <p class="pswd-match" v-if="pswdNoMatch">Both passwords need to match!</p>
      <p class="pswd-match" v-if="passwordFail">We were unable to process your request.</p>
      <p id="pswd-success" v-if="passwordSuccess">Password reset! Log in to view your profile.</p>
      <form v-on:submit.prevent="submitNewPassword" id="new-pswd-form" class="container-fluid">
        <div class="row">
          <span class="password">Password</span>
          <input name="password1" class="password-input form-control form-highlight" type="password" />
          <span class="password">Re-type password</span>
          <input name="password2" class="password-input form-control form-highlight" type="password" />
          <div id="remembered-pswd">
            <span>Just Remembered?
            <router-link id="remembered-tag" to="/login">Log In</router-link>
            </span>
          </div>
          <input class="green-btn btn btn-primary" id="new-pswd-submit" type="submit" value="Reset Password" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'newPassword',
    methods: {
      submitNewPassword: function(evt) {
        const {password1, password2} = evt.target
        if (password1.value === password2.value) {
          this.pswdNoMatch = false
          this.$store.dispatch('submitNewPassword', {
            password: evt.target.password1.value,
            resetToken: this.$route.params.token,
            that: this
          })
        } else {
          this.pswdNoMatch = true
          setTimeout(() => {this.pswdNoMatch = false}, 3000)
        }
      }
    },
    data () {
      return {
        pswdNoMatch: false,
        passwordFail: false,
        passwordSuccess: false
      }
    }
}
</script>

<style scoped>
  #pswd-success {
    color: #7ddbd4;
    background-color: #ededed;
    border-radius: 10px;
    padding: 12px 0;
  }
  .pswd-match {
    color: red;
    background-color: #ededed;
    border-radius: 10px;
    padding: 12px 0;
  }
  #new-pswd-form {
    margin-top: 20px;
  }
  #new-pswd-header {
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
  .password-input {
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
  #new-pswd-submit {
    width: 100%;
    margin-top: 5px;
  }
  #background-img {
    background: white url("http://www.jsums.edu/education/files/2012/12/bigstock-Four-Children-At-Computer-Term-3917429.jpg?x56568") no-repeat fixed center;
    opacity: 0.7;
    width: 100%;
    height: 100vh;
  }
  #new-pwsd {
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
    #new-pwsd {
      width: 95%;
      padding: 10px 30px;
    }
  }
  /* extra breakpoint between mobile and tablet */
  @media screen and (max-width: 440px) and (min-width: 320px) {
    #new-pwsd {
      width: 85%;
      padding: 10px 35px;
    }
  }
  /* tablet */
  @media screen and (max-width: 768px) and (min-width: 441px) {
    #new-pwsd {
      width: 70%;
      padding: 15px 55px;
    }
  }
  /* laptop */
  @media screen and (max-width: 1024px) and (min-width: 769px) {
    #new-pwsd {
      width: 55%;
      padding: 15px 55px;
    }
  }
</style>
