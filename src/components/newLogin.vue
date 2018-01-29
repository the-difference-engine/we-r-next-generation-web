<template>
  <div id="signup-container">
    <h1>Sign Up</h1>
    <span>Already have an account?</span>
    <router-link to="/login"><button id="login-btn">Login</button></router-link>
    <br>
    <span>Please select your role:</span>
    <br>
    <input type="radio" id="parent" value="parent" v-model="picked">
    <label for="parent">Parent</label>
    <input type="radio" id="volunteer" value="volunteer" v-model="picked">
    <label for="volunteer">Volunteer</label>
    <input type="radio" id="partner" value="partner" v-model="picked">
    <label for="partner">Partner</label>
    <input type="radio" id="admin" value="admin" v-model="picked">
    <label for="admin">Admin</label>
    <br>
    <span>Currently picked is: {{ picked }}</span>
    <form v-on:submit.prevent="signup" id="signup-form">
      <span id="name-tag">Name</span><input name="name" id="name" />
      <span id="email-tag">Email</span><input name="email" id="email" />
      <span id="password-tag">Password</span><input name="password" id="password" type="password" />
      <input id="signup-submit" type="submit" value="Sign Up" />
    </form>
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
  #signup-container {
    margin: auto;
    padding: 100px 150px 80px;
    width: 600px;
    height: 500px;
    border-radius: 10px;
    background-color: #ededed;
    margin-top: 15px;
    text-align: center;
    font-family: helvetica;
  }
  form > input{
    width: 100%;
  }
</style>
