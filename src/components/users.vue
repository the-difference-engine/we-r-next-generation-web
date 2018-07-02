<template>
  <div id="wrapper">
    <div class="users container">
      <div id="title" class="row">
        <h1 class="col-md-6">Users</h1>
        <i id="userIcon" class="fa fa-users col-md-6"></i>
      </div>
      <div id="testContainer">
        <i id="searchIcon" class="fa fa-search"></i>
        <input id="searchbar" type="text" v-model="filterString" placeholder="search..." class="form-control form-group">
        <p>{{ filterUsers }}</p>
      </div>
      <div id="blackLine">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>
                <a v-on:click="sortUsers('Name')">Name</a>
                <i class="arrows" v-bind:class="status.Name"></i>
              </th>
              <th>
                <a  v-on:click="sortUsers('Email')">Email</a>
                <i class="arrows" v-bind:class="status.Email"></i>
              </th>
              <th>
                <a  v-on:click="sortUsers('Registered')">Registered</a>
                <i class="arrows" v-bind:class="status.Registered"></i>
              </th>
              <th>
                <a  v-on:click="sortUsers('Role')">Role</a>
                <i class="arrows" v-bind:class="status.Role"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" v-bind:key="index">
              <td v-if="user">{{ user.full_name }}</td>
              <td v-if="user">{{ user.email }}</td>
              <td v-if="user">{{ user._id.$oid }}</td>
              <td v-if="user">{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from 'axios';
  import sortableTh from '@/components/sortableTh';
  import _ from 'lodash';

  const defaultSortAscending = true;
  const sortColumns = ['id', 'name', 'email', 'roles', 'date']
  const roles = ['admin', 'parent', 'sponsor', 'volunteer'];

  export default {
    data(){
      return {
        filterString: '',
        filteredUsers: [],
        users: [],
        columns: ['name', 'email', 'registered', 'role'],
        status: {
          Name: 'fa fa-angle-right',
          Email: 'fa fa-angle-right',
          Registered: 'fa fa-angle-down',
          Role: 'fa fa-angle-right'
        }
      }
    },
    computed: {
      filterUsers: function() {
        this.filteredUsers = this.users.map(u => {
          let date =  new Date(parseInt(u._id.$oid.substring(0, 8), 16) * 1000);
          let shortDate = '' + date
          u._id.$oid = shortDate.slice(4,15)
          if (u.full_name.toLowerCase().includes(this.filterString.toLowerCase()) || u.email.toLowerCase().includes(this.filterString.toLowerCase())) {
            return u;
          }
        });
      },
      testing: function() {
        return dateFromObjectId =  new Date(parseInt(oid.substring(0, 8), 16) * 1000);
      }
    },
    methods: {
      sortUsers: function(column) {
        if (column === 'Name') {
          this.status.Name = 'fa fa-angle-down';
          this.status.Email = 'fa fa-angle-right';
          this.status.Registered = 'fa fa-angle-right';
          this.status.Role = 'fa fa-angle-right';
          this.filteredUsers = _.orderBy(this.filteredUsers, 'full_name');
        }
        if (column === 'Email') {
          this.status.Name = 'fa fa-angle-right';
          this.status.Email = 'fa fa-angle-down';
          this.status.Registered = 'fa fa-angle-right';
          this.status.Role = 'fa fa-angle-right';
          this.filteredUsers = _.orderBy(this.filteredUsers, 'email');
        }
        if (column === 'Registered') {
          this.status.Name = 'fa fa-angle-right';
          this.status.Email = 'fa fa-angle-right';
          this.status.Registered = 'fa fa-angle-down';
          this.status.Role = 'fa fa-angle-right';
          this.filteredUsers = this.users;
        }
        if (column === 'Role') {
          this.status.Name = 'fa fa-angle-right';
          this.status.Email = 'fa fa-angle-right';
          this.status.Registered = 'fa fa-angle-right';
          this.status.Role = 'fa fa-angle-down';
          this.filteredUsers = _.orderBy(this.filteredUsers, 'role');
        }
      },
      getMostRecentApplicationDate: function(user) {
        let dates = [];
        user.applications.forEach(application => {
          dates.push(application.date)
        });
        let sortedDates = dates.sort();
        return sortedDates.pop();
      },
    },
    created() {
      localforage.getItem('X_TOKEN')
      .then(session => {
        axios.get('/api/v1/profiles', { 'headers': { 'x-token': session } })
        .then(response => {
          this.users = response.data.reverse()
          this.filteredUsers = response.data.reverse()
        })
        .catch(console.error)
      })
      .catch(console.error)
    }
  }
</script>

<style scoped>
  .sortable-th {
    cursor: pointer;
  }
  #title {
    margin: auto;
    max-width: 300px;
    display: inline-block;
    vertical-align: bottom;
  }
  #userIcon {
    font-size: 35px;
    margin-top: 20px;
    color: #337ab7;
  }
  i {
    color: #337ab7;
    font-weight: bold;
  }
  #blackLine {
    border-top: 1px solid black;
  }
  #viewOptions {
    margin-top: 10px;
  }
  body {
  margin: 2em 0;
  }

  a {
    font-weight: bold;
    color: #337ab7;
  }

  a.active {
    font-weight: bold;
    color: black;
  }

  #searchbar {
    margin-top: 5px;
    width: 25%;
    display: inline-block;
  }

  #searchIcon {
    font-size: 25px;
    margin-right: 8px;
  }

  #testContainer{
    justify-content: center;
  }

  th {
    text-align-last: center;
  }

  #wrapper {
    display: flex;
    justify-content: center;
  }

  .arrows {
    position: absolute;
    padding-left: 5px;
    padding-top: 2px;
  }

</style>