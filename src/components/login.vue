<template>
  <div id="login-container">
    <h1 id="login-header">Log In</h1>
    <span id="sign-up">Aren't a member yet?</span>
    <button id="sign-up-btn">Sign Up</button>
    <br>
    {{ msg }}
    <br>
    <form id="login-form">
      <span id="email-tag">Email</span>
      <input id="email" />
      <span id="password-tag">Password</span>
      <input id="password" />
      <a id="password-reminder" href="#">I forgot my password</a>
      <input id="login-submit" type="submit" value="Log In" />
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: 'Testing the Login Page'
      }
    }
  }
</script>

<style scoped>
  #header-placeholder {
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 38px;
    border-bottom: 2px solid grey;
  }

  #login-container {
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

  #login-header {

  }

  #sign-up {
    color: #cac8c8;
  }

  #login-form {
    margin-top: 30px;
  }

  #sign-up-btn{
    color: white;
    background-color: #ea8432;
    opacity: 0.6;
    width: 90px;
    height: 30px;
    font-size: 13px;
  }

  #email-tag {
    float: left;
    color: #cac8c8;
  }

  #email {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 40px;
    font-size: 20px;
  }

  #password-tag {
    float: left;
    color: #cac8c8;
  }

  #password {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    font-size: 20px;
  }

  #password-reminder {
    float: left;
    text-decoration: none;
    color: #ea8432;
    margin: 20px 0px;
  }

  #login-submit {
    width: 100%;
    height: 35px;
    color: white;
    background-color: #ea8432;
    opacity: 0.6;
    font-size: 22px;
  }
</style>
