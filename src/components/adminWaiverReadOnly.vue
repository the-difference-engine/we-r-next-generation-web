<template>
  <div class="container mx-auto my-4">
    <div id="waiver_preview" ref="waiver_preview" class="row col-sm-12 my-5">
      <div class="waiver mx-auto">
        <div class="mx-auto">
          <h3><span v-html="waiver.title"></span></h3>
          <p class="col-md-12 text-left my-3">
            <span v-html="waiver.header[0]"></span>
            <span class="mx-2 font-size-2"><u>{{get_date_as_string}}</u></span>
            <span class="mx-2" v-if="type === 'volunteer'">
              (date) by
              <span class="mx-2 font-size-2"><u>{{profileData.full_name}}</u></span>
            </span>
            <span class="mx-2">{{waiver.header[1]}}</span>
            <span v-if="type === 'camper'">
              <span class="font-size-2"><u>CHILD'S NAME</u></span>
              <span class="mr-2">{{waiver.header[2]}}</span>
              <span class="font-size-2"><u>PARENT'S NAME</u></span>
              <span class="mx-2">{{waiver.header[3]}}</span>
            </span>
          </p>
          <table class="col-md-12 text-left my-3">
            <tbody>
            <tr v-for='index in waiver.items.length' :key="index">
              <td class="col-sm-1 pr-0 text-center">
                <span>
                  <input :readonly="disable_edits" type="text" class="col-sm-12 form-control text-center" v-model="waiver.initials[index-1]">
                </span>
                <small class="col-sm-12">Initial</small>
              </td>
              <td class="col-sm-1 text-right">
                <span>
                  {{waiver.items[index-1].order}}
                </span>.
              </td>
              <td class="col-sm-10 text-left">
                <span class="mr-2">
                  <strong><u>
                    <span>
                      {{waiver.items[index-1].title}}:
                    </span>
                  </u></strong>
                </span>
                <span>
                  {{waiver.items[index-1].text}}
                </span>
              </td>
            </tr>
            </tbody>
          </table>
          <p class="col-md-12 text-left my-3">
            <span>
              {{waiver.footer}}
            </span>
          </p>
          <div class="col-md-12 row my-5">
            <div class="col-md-8">
              <label class="col-sm-12">Please type your full name*:</label>
              <u><strong><span>
                <input :readonly="disable_edits" type="text" class="form-control text-center" v-model="waiver.signature">
              </span></strong></u>
              <small class="col-sm-12">* If you are under 18, your parent/guardian must sign for you.</small>
            </div>
            <div class="col-md-4">
              <label class="col-sm-12">Today's Date (mm/dd/yyyy):</label>
              <u><strong><span>
                <input :readonly="disable_edits" type="date" class="form-control text-center" v-model="waiver.signed_date">
              </span></strong></u>
            </div>
          </div>
          <span disabled class="btn btn-light my-5">Save & Submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  export default {
    name: "waiverReadOnly",
	props: {
        // properties must meet the following criteria
        waiver: {},
        type: {}
    },
    data() {
      return {
        profileData: {
          full_name: '[MY FULL NAME]',
          child_name: "[MY CHILD'S FULL NAME]"
        },
        disable_edits: true
      };
    },
    methods: {
    },

    computed: {
      init_today_date() {
        // initializes today's date for the waiver form
        let today = new Date();
        let day = today.getDate();
        if (day < 10) { day = '0' + day }
        let month_num = today.getMonth() + 1;
        if (month_num < 10) { month_num = '0' + month_num }
        let year = today.getFullYear();

        this.waiver.signed_date = year + '-' + month_num + '-' + day;
      },
      get_date_as_string() {
        // initializes today's date as readable string
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        let dt = new Date(this.waiver.signed_date);
        let day = dt.getDate() + 1;
        let month = monthNames[dt.getMonth()];
        let year = dt.getFullYear();

        return month + ' ' + day + ', ' + year;
      },
    },

    beforeMount() {
      try { this.init_today_date(); }
      catch (error) { }
    },
  }
</script>

<style>
  table > tbody > tr > td {
    /*vertical-align: top !important;*/
    padding-top: 1em !important;
    padding-bottom: 1em !important;
  }
</style>

<style scoped>
  .container {
    margin-bottom: 30px !important;
  }
  .waiver {
    padding: 25px;
    border: 2px solid gray;
  }
</style>
