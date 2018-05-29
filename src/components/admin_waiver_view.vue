<template>
  <div class="container mx-auto my-4">
    <div class="row">
      <div class="col-xs-6">
        <router-link to="/admin/applications">
          <button class="btn btn-lg btn-primary">All Applications</button>
        </router-link>
      </div>
      <div class="col-xs-6">
        <router-link v-if="waiver_present" :to="{name: 'adminApp', params: {id: this.$route.params.id}}">
          <button class="btn btn-lg btn-primary">Application</button>
        </router-link>
      </div>
    </div>
    <div class="row col-sm-12">
      <h1>Signed Waiver</h1>
      <div v-if="waiver_present" class="col-sm-12 my-4 waiver">
        <span v-html="waiver"></span>
      </div>
      <div v-if="!waiver_present" class="col-sm-12 my-4 waiver">
        <h3>No waiver on file</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  export default {
    name: "admin_waiver_view",
    data() {
      return {
        waiver: '',
        waiver_present: false
      };
    },
    created() {
      let application_id = this.$route.params.id;
      localforage.getItem('X_TOKEN')
        .then(session => {
          axios.get('/api/v1/applications/' + application_id + '/waiver', {
            'headers': { 'x-token': session }
          })
            .then(response => {
              if (response.data) {
                this.waiver = response.data.waiver_form
                this.waiver_present = true;
              }
            })
            .catch()
        })
        .catch()
    },
  };
</script>

<style>
  table > tbody > tr > td {
    vertical-align: top !important;
    padding-top: 1em !important;
    padding-bottom: 1em !important;
  }
</style>

<style scoped>
  .container {
    margin-bottom: 30px !important;
  }
  .waiver{
    padding: 25px;
    border: 2px solid gray;
  }
</style>
