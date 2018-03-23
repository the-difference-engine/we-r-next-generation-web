<template>
  <div id="admin-applications">
    <div v-for="(appByStatus, status) in applications" v-bind:key="status" class="app-list">
      <div class="list-icon"><i :class="appByStatus.icon"></i></div>
      <table class="apps-by-status">
        <tr><th>{{status}}</th><th class="view-all">View All</th></tr>
        <tr>
          <th class="row-name">Name</th>
          <th class="row-camper" v-if="applicationType === 'camper'">Camper Name</th>
          <th class="row-age">Age</th>
          <th class="row-gender">Gender</th>
          <th class="row-type">Type</th>
          <th class="row-signed">Date Signed</th>
        </tr>
        <tr class="application" v-for="application in appByStatus.apps" :key="application._id.$oid">
          <td>{{application.full_name}}</td>
          <td v-if="applicationType === 'camper'">{{application.camper_name}}</td>
          <td>{{application.age}}</td>
          <td>{{application.gender}}</td>
          <td>{{application.type}}</td>
          <td>{{application.date_signed}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminApplications',
  data () {
    return {
      applications : {},
      applicationType: 'volunteer'
    }
  },
  methods: {
    updateStatus: () => {
      if (this.applicationType === 'volunteer') {

      }
      else if (this.applicationType === 'camper') {

      }
      else if (this.applicationType === 'partner') {

      }
    }
  },
  created() {
    this.$store.dispatch('getApplications', {that: this, type: this.applicationType})
  }
}
</script>

<style scoped>
  #admin-applications {

  }
  .app-list {

  }
  .list-icon {
    font-size: 32px;
    width: 10%;
    float: left;
  }
  .apps-by-status {
    width: 90%;
    border: 1px solid black;
  }
  .view-all {

  }
  .row-name {

  }
  .row-camper {

  }
  .row-age {

  }
  .row-gender {

  }
  .row-type {

  }
  .row-signed {

  }
  .application {

  }
</style>
