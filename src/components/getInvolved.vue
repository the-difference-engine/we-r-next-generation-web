<template>
  <div class="">
    <router-link to="/partner">Become a Partner</router-link>
    <router-link to="/volunteer">Volunteer</router-link>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'getInvolved',
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
