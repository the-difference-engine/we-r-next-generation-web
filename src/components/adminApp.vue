<template>
  <div id="admin-app" class="container-fluid">
    <div class="row">
      <div id="back-btn" class="col-xs-12">
        <router-link to="/admin/applications">
          <button class="btn btn-lg btn-primary">All Applications</button>
        </router-link>
      </div>
      <div class="col-xs-12">
        <h1>Application</h1>
      </div>
      <div class="col-xs-12">
        <h3>Current Status: <strong><i>{{application.status}}</i></strong></h3>
      </div>
      <div class="col-xs-12">
        <div id="status-btns">
          <button name="moveBack" v-if="statuses.prev"
            v-on:click.prevent="updateStatus(application, statuses.prev)"
            class="btn btn-info">{{statuses.prev}}
          </button>
          <button name="advance" v-if="statuses.next"
            v-on:click.prevent="updateStatus(application, statuses.next)"
            class="btn btn-info">{{statuses.next}}
          </button>
          <button name="reject" v-if="statuses.reject"
            v-on:click.prevent="updateStatus(application, statuses.reject)"
            class="btn btn-danger">reject
          </button>
          <button name="approve" v-if="statuses.approved"
            v-on:click.prevent="updateStatus(application, statuses.approved)"
            class="btn btn-success">approve
          </button>
        </div>
      </div>
      <div id="app-data" class="col-xs-12 col-md-12">
        <table class="table table-striped app-table" v-if="application.type === 'partner'">
          <tbody>
            <tr>
              <td>Company Name</td>
              <td>{{application.companyName}}</td>
            </tr>
            <tr>
              <td>Company Website</td>
              <td><a :href="application.companyUrl">Website</a></td>
            </tr>
            <tr>
              <td>Company Logo</td>
              <td><img class="logo" :src="application.companyLogo"/></td>
            </tr>
            <tr>
              <td>Company Logo URL</td>
              <td>{{application.companyLogo}}</td>
            </tr>
          </tbody>
        </table>
        <table class="table table-striped app-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{application.full_name}}</td>
            </tr>
            <tr v-if="application.type === 'camper'">
              <td>Camper Name</td>
              <td>{{application.childName}}</td>
            </tr>
            <tr v-if="application.type === 'camper'">
              <td>Gender</td>
              <td>{{application.gender}}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{{application.type}}</td>
            </tr>
            <tr>
              <td>Date Signed</td>
              <td>{{application.date_signed}}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{application.email}}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{{application.address_line_1}} {{application.address_line_2}}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{{application.city}}</td>
            </tr>
            <tr>
              <td>State/Province</td>
              <td>{{application.state_province}}</td>
            </tr>
            <tr>
              <td>Zip</td>
              <td>{{application.zip_code}}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{{application.country}}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{{application.phone_number}}</td>
            </tr>
            <tr v-if="application.type === 'volunteer' || application.type === 'camper'">
              <td>Waiver</td>
              <td>
                <div class="list-icon-sm">
                  <router-link :to="{ name: 'AdminUserWaiverSingle', params: { id: application._id.$oid } }">
                    <i class="fa fa-file-text"></i>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table v-if="application.type === 'camper' || application.type === 'volunteer'" class="table table-striped app-table">
          <tbody>
            <tr>
              <td>Camp Start</td>
              <td>{{application.camp_data.date_start}}</td>
            </tr>
            <tr>
              <td>Camp End</td>
              <td>{{application.camp_data.date_end}}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{{application.camp_data.description}}</td>
            </tr>
            <tr>
              <td>Limit</td>
              <td>{{application.camp_data.limit}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminApp',
  data () {
    return {
      application: {},
      statuses: {}
    }
  },
  methods: {
    updateStatus: function (app, statusChange) {
      if (statusChange === 'delete') this.$store.dispatch('deleteApplication', {app})
      .then(() => this.$router.push('/admin/applications'))
      else this.$store.dispatch('updateApplication', {type: this.applicationType, app, statusChange})
      .then(newApp => this.application = newApp)
    },
    changeLocalStatuses: function (app) {
      if (app.status === 'submitted') this.statuses.next = 'pending'
      else if (app.status === 'pending') {
        this.statuses.prev = 'submitted'
        this.statuses.approved = 'approved'
        this.statuses.reject = 'not_approved'
      } else if (app.status === 'approved') this.statuses.prev = 'pending'
      else if (app.status === 'not_approved') {
        this.statuses.prev = 'pending'
        this.statuses.next = 'delete'
      }
    }
  },
  created() {
    this.$store.dispatch('getApplication', {id: this.$route.params.id})
    .then(data => this.application = data)
    .catch(err => console.error(err))
  },
  watch: {
    application: function(app) {
      this.statuses = {}
      this.changeLocalStatuses(app)
    }
  }
}
</script>

<style scoped>
  #admin-app{
    width: 100%;
    padding-bottom: 20px;
  }
  #back-btn {
    text-align: left;
  }
  #status-btns {
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin: auto;
    padding: 15px 0px;
  }
  #app-data{
    width: 100%;
  }
  .app-table{
    width: 60%;
    margin: auto;
    text-align: left;
  }
  .app-table td {
    width: 50%;
  }
  .logo {
    width: 50px;
    }
</style>
