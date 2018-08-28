<template>
<div class="container-fluid">
  <div id="admin-applications">
    <!-- Radio buttons to choose application type -->
    <div id="radio-btns">
      <input type="radio" id="all" value="all" v-model="appType">
      <label for="all">All</label>
      <input type="radio" id="volunteer" value="volunteer" v-model="appType">
      <label for="volunteer">Volunteer</label>
      <input type="radio" id="camper" value="camper" v-model="appType">
      <label for="camper">Camper</label>
      <input type="radio" id="partner" value="partner" v-model="appType">
      <label for="partner">Partner</label>
    </div>
    <!-- Submit button to retrieve applications of different types -->
    <input class="btn btn-primary" type="button" value="Get Applications" :disabled="!canGetApps" v-on:click.prevent="getApplications"/>
    <br><br>
    <div class="row col-sm-12 mx-0 px-0 my-3 text-right">
        <table class="table-bordered col-sm-12">
          <tr class="form-inline">
            <th>
              <div class="form-group mx-2">
                <button class="btn btn-warning" v-on:click="downloadCSV">Download CSV</button>
              </div>
              <div class="form-group mx-2">
                  <label for="csv_status"><small>for Status</small></label>
                  <select class="form-control" v-model="csv_status">
                    <option v-for="status in app_statuses" v-bind:value="status">
                      {{status}}
                    </option>
                  </select>
              </div>
              <div class="form-group mx-2">
                <label for="csv_camp"><small>and Camp</small></label>
                <select class="form-control" v-model="csv_camp">
                  <option v-for="camp in Object.keys(camp_index)" v-bind:value="camp">
                    {{camp_index[camp]}}
                  </option>
                </select>
              </div>
            </th>
          </tr>
        </table>
    </div>
    <!-- Renders all and specific types of applications sorted by status -->
    <div v-if="Object.keys(appByStatus.apps).length" v-for="(appByStatus, status) in applications" v-bind:key="status" class="app-list">
      <div class="list-icon"><i :class="appByStatus.icon"></i></div>
      <table class="apps-by-status">
        <tr class="status"><th>{{status}}</th></tr>
        <tr>
          <th v-if="currAppType === 'camper'" class="col-header">Parent Name</th>
          <th v-else class="col-header">Name</th>
          <th class="col-header" v-if="currAppType === 'camper'">Camper Name</th>
          <th class="col-header">Age</th>
          <th class="col-header">Gender</th>
          <th class="col-header">Type</th>
          <th class="col-header">Date Signed</th>
          <th v-if="currAppType === 'camper'" class="col-header">Camp Start</th>
          <th class="col-header">Waiver</th>
          <th class="col-header">Change Status</th>
          <th class="col-header">Details</th>
        </tr>
        <tr class="application" v-for="(application, app_id) in appByStatus.apps" :key="app_id">
          <td>{{application.full_name}}</td>
          <td v-if="currAppType === 'camper'">{{application.childName}}</td>
          <td>{{application.age}}</td>
          <td>{{application.gender}}</td>
          <td>{{application.type}}</td>
          <td>{{application.date_signed}}</td>
          <td v-if="currAppType === 'camper'">{{application.camp_data.date_start}}</td>
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
          <td>
            <div class="list-icon-sm">
              <router-link :to="{ name: 'adminApp', params: { id: application._id.$oid } }">
                <i class="fa fa-eye"></i>
              </router-link>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- Renders in case there are no apps of a certain status -->
    <div v-if="!Object.keys(appByStatus.apps).length" v-for="(appByStatus, status) in applications" v-bind:key="`${status}-empty`" class="app-list-empty">
      <p>There are no <strong>{{currAppType}}</strong> applications with a status of: <em>{{status}}</em></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'adminApplications',
  data () {
    return {
      applications : {},
      appType: 'all',
      currAppType: 'all',
      canGetApps: true,
      all_camps: [],
      camp_index: {},

      csv_status: 'all',
      csv_camp: 'all',

      app_statuses: [
        'all',
        'submitted',
        'pending',
        'approved',
        'not_approved'
      ],
    }
  },
  methods: {
    getApplications: function (evt) {
      this.$store.dispatch('getApplications', {type: this.appType})
      .then(data => {
        this.applications = data.applications
        this.appType = data.type
        this.currAppType = data.type
      }).catch(err => console.error(err))
    },
    updateStatus: function (app, statusChange) {
      this.canGetApps = false;
      if (statusChange === 'delete') this.$store.dispatch('deleteApplication', {app})
      .then(() => {
        delete this.applications[app.status].apps[app._id.$oid]
        this.canGetApps = true
      }).catch(err => this.canGetApps = true)
      else this.$store.dispatch('updateApplication', {type: this.appType, app, statusChange})
      .then(newApp => {
        this.applications[statusChange].apps[newApp._id.$oid] = newApp
        delete this.applications[app.status].apps[newApp._id.$oid]
        this.canGetApps = true
      }).catch(err => this.canGetApps = true)
    },
    downloadCSV: function() {                       // compile csv data; create and download csv file
      let data, filename, link;
      let csv = this.csv_delimited_applications;    // collect comma delimited applications
      if (csv == null) return;

      filename = 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);

      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    },

    index_camp_sessions: function() {
      // create an index of all camps with _id as key and a custom label as value
      this.camp_index['all'] = 'All Camps';       // add a general index for all camps
      this.all_camps.forEach(camp => {
        this.camp_index[camp._id.$oid] = camp.name + " (" + camp.date_start + " - " + camp.date_end + ")";
      })
    }
  },

  computed: {
    csv_delimited_applications: function() {
      let result, ctr, csv_types_selected,
        app_key, keys, key_labels, columnDelimiter, qMarks, lineDelimiter,
        data, data_set, item_camp, val;

      data = this.applications || null;
      if (Object.keys(data).length === 0 && data.constructor === Object || data == null) {
        return null;
      }

      columnDelimiter = ',';
      qMarks = '"';
      lineDelimiter = '\n';

      app_key = 'apps'; // key in the applications object

      // defined set of keys to apply to CSV file for each application
      keys = [
        'full_name',
        'type',
        'status',
        'date_signed',
        'address_line_1',
        'address_line_2',
        'city',
        'state_province',
        'zip_code',
        'country',
        'email',
        'phone_number',
        'childName',
        'age',
        'gender',
        'bio',
        'camp'
      ];

      key_labels = {
        'full_name': 'Full Name',
        'type': 'Application Type',
        'status': 'Application Status',
        'date_signed': 'Date Signed',
        'address_line_1': 'Address (1)',
        'address_line_2': 'Address (2)',
        'city': 'City',
        'state_province': 'State/Province',
        'zip_code': 'Postal Code',
        'country': 'Country',
        'email': 'Email',
        'phone_number': 'Phone Number',
        'childName': 'Child Name',
        'age': 'Age',
        'gender': 'Gender',
        'bio': 'Bio',
        'camp': 'Camp Session'
      };

      if (this.csv_status === 'all') {                    // application status types to include in the csv download
        csv_types_selected = this.app_statuses.slice(1);  // remove 'all' from the list and include all status
      }
      else {
        csv_types_selected = [this.csv_status];           // include only the selected application status type
      }

      result = '';
      ctr = 0;
      keys.forEach(function(key) {            // header row labels
        if (ctr > 0) { result += columnDelimiter }
        result += qMarks + key_labels[key] + qMarks;
        ctr++;
      });
      // result += keys.join(columnDelimiter);   // header row
      result += lineDelimiter;

      csv_types_selected.forEach(type => {    // collect applications for each selected type
        if (type in data) {                   // skip if type is not in data set
          data_set = data[type][app_key];     // data set is applications assigned to type
          Object.keys(data_set).forEach(item => {  // for each application id in applications
            ctr = 0;
            item_camp = data_set[item]['camp'];
            if (this.csv_camp !== 'all' && this.csv_camp !== item_camp) {
              ctr++;
            }
            else {
              keys.forEach(key => {
                if (ctr > 0) {                  // append a comma before adding the next value
                  result += columnDelimiter;    // only if it is not the first value in the row
                }
                if (key === 'camp') {            // replace camp id with camp label in predefined index
                  val = this.camp_index[data_set[item][key]];
                }
                else {
                  val = data_set[item][key];
                }
                if (val === undefined) {         // replace undefined with an empty string
                  val = '';
                }
                val.replace('"', "'");          // remove all double quotes to avoid conflict with CSV
                result += qMarks + val + qMarks;
                ctr++;
              });
              result += lineDelimiter;          // add a new csv row
            }
          });
        }
      });
      return result;
    },
  },

  created() {
    this.$store.dispatch('getApplications', {type: this.appType})
    .then(data => {
        this.applications = data.applications
        this.appType = data.type
      }).catch(err => console.error(err))
    this.$store.dispatch('campSessionsGetAll', {    // get all camp sessions to ascribe a camp label over camp id
      field_name: "date_start",
      order: "DESC"
    })
    .then(data => {
      this.all_camps = data;
      this.index_camp_sessions();
    });
  }
}
</script>

<style scoped>
  #radio-btns label {
    padding: 10px 5px;
  }
  .app-list {
    padding-bottom: 50px;
    margin-right: 20px;
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
  .table-bordered {
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    border-left: none;
    border-right: none;
  }
  .table-bordered > tr > th {
    padding: 0.5em 0;
    text-align: right;

  }
</style>
