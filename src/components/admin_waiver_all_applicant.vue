<template>
  <div class="container mx-auto my-4">
    <div class="row col-sm-12">
      <h1>All Waivers --- NOT USED YET (AS OF APRIL 12, 2018)</h1>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  export default {
    name: "admin_waiver_all_applicant",
    data() {
      return {
        waiver: ''
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
              this.waiver = response.data.waiver_form
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
