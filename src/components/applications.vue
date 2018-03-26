<template>
  <div id="applications">
  <div id="applications-wrapper" >

      <router-link class="btn btn-primary appButtons" to="/partner">Become a Partner</router-link>
      <router-link id="volunteer" class="btn btn-primary appButtons" to="/volunteer">Volunteer</router-link>

      <router-link class="btn btn-primary appButtons" to="/signup">Sign up a Camper</router-link>

  </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'applications',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .row {
    margin-left: 0;
    margin-right: 0;
  }
  #applications-wrapper {
    display:flex;
    justify-content: space-around;
    padding: 100px 0;
    background-color: rgb(240, 211, 179);
  }
  .appButtons {
    background-color: #5FAAF6;
    border-color: #5FAAF6;
    width: 32.5%;
    color: white;
    font-size: 3.5vw;
    font-weight: bold;
    padding: 50px 0;
  }
  #volunteer {
    width: 25%
  }
  a:hover {
    background-color: rgb(95, 203, 246);
    border-color: rgb(95, 203, 246);
  }
  @media (min-width: 900px) {
    .appButtons {
      font-size: 2.5vw;
    }
  }

</style>
