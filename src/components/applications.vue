<template>
  <div class="">
    <router-link to="/partner">Become a Partner</router-link>
    <router-link to="/volunteer">Volunteer</router-link>
    <router-link to="/signup">Sign up a Camper</router-link>
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

</style>
