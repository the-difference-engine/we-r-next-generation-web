<template>
  <div class="users container-fluid">
    <div id="title" class="row">
      <h1 class="col-md-6">Users</h1>
      <i id="userIcon" class="fa fa-users col-md-6"></i>
    </div>
    <div>
      <input type="text" v-model="filterTest" v-on:change="testing" placeholder="search...">
      <p>{{ filteredUsers }}</p>
    </div>
    <div id="blackLine">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>
              <a>Name</a>
            </th>
            <th>
              <a>Email</a>
            </th>
            <th>
              <a>Registered</a>
            </th>
            <th>
              <a>Role</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" v-bind:key="index">
            <td v-if="user">{{ user.full_name }}</td>
            <td v-if="user">{{ user.email }}</td>
            <td v-if="user">{{ user._id.$oid }}</td>
            <td v-if="user">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from 'axios';
  import sortableTh from '@/components/sortableTh';

  const defaultSortAscending = true;
  const sortColumns = ['id', 'name', 'email', 'roles', 'date']
  const roles = ['admin', 'parent', 'sponsor', 'volunteer'];

  export default {
    data(){
      return {
        filterTest: '',
        filteredUsers: [],
        users: [],
        result: [],
        columns: ['name', 'email', 'registered', 'role'],
        status: {
          name: 'false',
          email: 'false',
          registered: 'false',
          role: 'false'
        }
      }
    },
    computed: {
      // filterUsers: function() {
      //   console.log('GOT TO FILTERUSERS');
      //   this.filteredUsers = this.users.map(u => {
      //     if (u.full_name.includes(this.filterTest)) {
      //       console.log('MATCHES');
      //       console.log(u.full_name)
      //       return u;
      //     }
      //   });
      // }
    },
    methods: {
      sortBy: function(currentColumn) {
        console.log("IN SORT BY METHOD");
        console.log(currentColumn);
        // if (this.sortColumn === currentColumn) {
        //   this.sortAscending = !this.sortAscending;
        // } else {
        //   this.sortAscending = defaultSortAscending;
        // }
        // this.sortColumn = currentColumn;
      },
      testing: function() {
        console.log('GOT TO FILTERUSERS');
        this.filteredUsers = this.users.map(u => {
          if (u.full_name.includes(this.filterTest)) {
            console.log('MATCHES');
            console.log(u.full_name)
            return u;
          }
        this.users = this.filteredUsers;
        console.log("NEW USERS LSIT");
        console.log(this.users);
        console.log("FILTER LIST");
        console.log(this.filteredUsers);
        });
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
          this.users = response.data
          console.log("USERS FOUND", this.users)
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
</style>