<template>
  <div id="admin-applications">
    <!-- Radio buttons to choose application type -->
    <div id="radio-btns">
      <input type="radio" id="all" value="all" v-model="newAppType">
      <label for="all">All</label>
      <input type="radio" id="volunteer" value="volunteer" v-model="newAppType">
      <label for="volunteer">Volunteer</label>
      <input type="radio" id="camper" value="camper" v-model="newAppType">
      <label for="camper">Camper</label>
      <input type="radio" id="partner" value="partner" v-model="newAppType">
      <label for="partner">Partner</label>
    </div>
    <!-- Submit button to retrieve applications of different types -->
    <input class="btn btn-primary" type="button" value="Get Applications" :disabled="!canGetApps" v-on:click.prevent="getApplications"/>
    <br><br>
    <!-- Renders all and specific types of applications sorted by status -->
    <div v-if="Object.keys(appByStatus.apps).length" v-for="(appByStatus, status) in applications" v-bind:key="status" class="app-list">
      <div class="list-icon"><i :class="appByStatus.icon"></i></div>
      <table class="apps-by-status">
        <tr class="status"><th>{{status}}</th></tr>
        <tr>
          <th v-if="applicationType === 'camper'" class="col-header">Parent Name</th>
          <th v-else class="col-header">Name</th>
          <th class="col-header" v-if="applicationType === 'camper'">Camper Name</th>
          <th class="col-header">Age</th>
          <th class="col-header">Gender</th>
          <th class="col-header">Type</th>
          <th class="col-header">Date Signed</th>
          <th v-if="applicationType === 'camper'" class="col-header">Camp</th>
          <th class="col-header">Waiver</th>
          <th class="col-header">Change Status</th>
        </tr>
        <tr class="application" v-for="(application, app_id) in appByStatus.apps" :key="app_id">
          <td>{{application.full_name}}</td>
          <td v-if="applicationType === 'camper'">{{application.childName}}</td>
          <td>{{application.age}}</td>
          <td>{{application.gender}}</td>
          <td>{{application.type}}</td>
          <td>{{application.date_signed}}</td>
          <td v-if="applicationType === 'camper'">{{application.camp}}</td>
          <td>
            <div class="list-icon-sm">
              <router-link :to="{ name: 'AdminUserWaiverSingle', params: { id: application._id.$oid } }">
                <i class="fa fa-file-text"></i>
              </router-link>
            </div>
          </td>
          <td>
            <button name="moveBack" v-if="appByStatus.prev"
              v-on:click.prevent="updateStatus(application, appByStatus.prev)"
              class="btn btn-sm btn-light">{{appByStatus.prev}}
            </button>
            <button name="advance" v-if="appByStatus.next"
              v-on:click.prevent="updateStatus(application, appByStatus.next)"
              class="btn btn-sm btn-light">{{appByStatus.next}}
            </button>
            <button name="reject" v-if="appByStatus.reject"
              v-on:click.prevent="updateStatus(application, appByStatus.reject)"
              class="btn btn-sm btn-danger">reject
            </button>
            <button name="approve" v-if="appByStatus.approve"
              v-on:click.prevent="updateStatus(application, appByStatus.approve)"
              class="btn btn-sm btn-success">approve
            </button>
          </td>
        </tr>
      </table>
    </div>
    <!-- Renders in case there are no apps of a certain status -->
    <div v-if="applicationType !== 'all' && !Object.keys(appByStatus.apps).length" v-for="(appByStatus, status) in applications" v-bind:key="`${status}-empty`" class="app-list-empty">
      <p>There are no <strong>{{applicationType}}</strong> applications with a status of: <em>{{status}}</em></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminApplications',
  data () {
    return {
      applications : {},
      applicationType: 'all',
      newAppType: 'all',
      canGetApps: true
    }
  },
  methods: {
    getApplications: function (evt) {
      this.$store.dispatch('getApplications', {that: this, type: this.newAppType})
    },
    updateStatus: function (app, statusChange) {
      this.canGetApps = false
      if (statusChange === 'delete') this.$store.dispatch('deleteApplication', {that: this, app})
      else this.$store.dispatch('updateApplication', {that: this, type: this.applicationType, app, statusChange})
    }
  },
  created() {
    this.$store.dispatch('getApplications', {that: this, type: this.applicationType})
  }
}
</script>

<style scoped>
  #radio-btns label {
    padding: 10px 5px;
  }
  .app-list {
    padding-bottom: 50px;
  }
  .app-list-empty{
    padding-bottom: 50px;
  }
  .list-icon {
    font-size: 32px;
    width: 75px;
    float: left;
  }
  .list-icon-sm {
    font-size: 28px;
    width: 50px;
    text-align: center;
  }
  .all-apps {
    width: 100% !important;
  }
  .apps-by-status {
    width: calc(100% - 75px);
    background-color: #ededed;
  }
  .status {
    font-size: 26px;
    width: 180px;
    border: none !important;
  }
  td {
    text-align: left;
  }
  tr {
    border-bottom: 1px solid black;
  }
  table {
    border-left: 10px solid #ededed;
    border-bottom: 10px solid #ededed;
    border-top: 10px solid #ededed;
  }
</style>
