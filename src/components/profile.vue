<!--An empty component to replace the header and/or footer on pages where it is not required-->

<template>
  <div class="profile">
    <h1>PROFILE PAGE</h1>
    <p>{{ sessionId }}</p>
    <p>{{ sessionInfo }}</p>
  </div>
</template>

<script>
  import localforage from '../sessionUtils';
  import axios from 'axios';
  export default {
    name: 'profile',
    data () {
      return {
        sessionId: "",
        sessionInfo: {}
      }
    },
    created() {
      localforage.getItem('X_TOKEN').then(session => {
        this.sessionId = session
        axios.get('/api/v1/profile/' + session, { 'headers': { 'x-token': this.sessionId } }).then(response => {
          this.sessionInfo = response.data
        }).catch(e => {
          this.errors = e
        })

      }).catch(err => console.error(err))
    }
  }

</script>

<style scoped>
</style>
