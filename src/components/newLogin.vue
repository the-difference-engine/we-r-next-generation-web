<template>
  <div id="background-img">
    <div id="signup-container" class="container">
      <h1>Sign Up</h1>
      <div class="row">
        <div class="col-xs-12 col-sm-6"><span>Already have an account?</span></div>
        <div class="col-xs-12 col-sm-6"><router-link to="/login"><button id="login-btn">Login</button></router-link></div>
      </div>
      <div class="row">
        <div class="col-xs-12"><span>Please select your role:</span></div>
      </div>
      <div class="row"><div>
        <div class="col-xs-6 col-sm-3 line-height">
          <input type="radio" id="parent" value="parent" v-model="picked">
          <label for="parent">Parent</label>
        </div></div>
        <div class="col-xs-6 col-sm-3 line-height"><div>
          <input type="radio" id="volunteer" value="volunteer" v-model="picked">
          <label for="volunteer">Volunteer</label>
        </div></div>
        <div class="col-xs-6 col-sm-3 line-height"><div>
          <input type="radio" id="partner" value="partner" v-model="picked">
          <label for="partner">Partner</label>
        </div></div>
        <div class="col-xs-6 col-sm-3 line-height"><div>
          <input type="radio" id="admin" value="admin" v-model="picked">
          <label for="admin">Admin</label>
        </div></div>
      </div>
      <div class="row">
        <form v-on:submit.prevent="signup" id="signup-form" class="container-fluid">
          <div class="row" id="form-row">
            <span id="name-tag">Name</span><input name="name" id="name" />
            <span id="email-tag">Email</span><input name="email" id="email" />
            <span id="password-tag">Password</span><input name="password" id="password" type="password" />
            <input id="signup-submit" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newLogin',
    methods: {
      signup: function(evt) {
        this.$store.dispatch('signup', {
          name: evt.target.name.value,
          email: evt.target.email.value,
          password: evt.target.password.value,
          role: this.picked
        })
      }
    },
    data () {
      return {
        picked: 'choose one the above roles!'
      }
    }
  }
</script>

<style scoped>
.line-height {
  line-height: 100%;
}
  #form-row {
    text-align: left;
  }
  #form-row > input{
    width: 100%;
  }
  #background-img {
    background: white url("http://www.jsums.edu/education/files/2012/12/bigstock-Four-Children-At-Computer-Term-3917429.jpg?x56568") no-repeat fixed center;
    opacity: 0.7;
    width: 100%;
    height: 100vh;
  }
  #signup-container {
    /* desktop */
    width: 37%;
    height: 575px;
    padding: 10px 55px;
    /* all sizes */
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
    #signup-container {
      width: 95% !important;
      height: 100%;
      padding: 10px 30px;
    }
  }
  /* extra breakpoint between mobile and tablet */
  @media screen and (max-width: 440px) and (min-width: 320px) {
    #signup-container {
      width: 85% !important;
      height: 100%;
      padding: 10px 35px;
    }
  }
  /* tablet */
  @media screen and (max-width: 768px) and (min-width: 441px) {
    #signup-container {
      width: 70%;
      height: 575px;
      padding: 10px 55px;
    }
  }
  /* laptop */
  @media screen and (max-width: 1024px) and (min-width: 769px) {
    #signup-container {
      width: 55%;
      height: 575px;
      padding: 10px 55px;
    }
  }
</style>
