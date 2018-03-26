<template>
  <div id="admin-applications">
    <div id="submitted" class="application-list">
      <div class="list-icon"></div>
      <table></table>
    </div>
    <div id="pending" class="application-list"></div>
    <div id="approved" class="application-list"></div>
    <div id="not-approved" class="application-list"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'adminApplications',
  data () {
    return {
      applications : []
    }
  },
  methods: {},
  created() {
    this.$store.dispatch('getVolunteerApps', {that: this})
  }
}
</script>

<style scoped>
  #admin-applications {

  }
  .application-list {

  }
</style>
