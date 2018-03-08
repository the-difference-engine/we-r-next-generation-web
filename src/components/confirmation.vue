<template>
  <div id="confirmation">
    <h1>WeRNextGeneration Profile Sign Up</h1>
    <h3>Welcome to the family!</h3>
    <h3>Account signup confirmed!</h3>
    <router-link to="/login"><button id="login" class="green-btn btn btn-primary">Login</button></router-link>
    <p>{{token}}</p>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'confirmation',
    data () {
      return {}
    },
    created() {
      axios.put(`/api/v1/profiles/activate/${this.$route.params.token}`)
      .catch(err => console.error(err))
    }
  }
</script>

<style scoped>
  .green-btn {
    background-color: #7ddbd4;
    color: white;
    border: none;
    margin-bottom: 20px;
  }
</style>
