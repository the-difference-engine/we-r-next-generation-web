<template>
  <div id="wrapper">
    <h1>Friends of WRNG</h1>
    <div>
      <div class="row">
        <div v-if="appState.userInfo.role === 'superadmin'" class="col-md-14 text-right">
          <router-link :to="'friendAdd'" class="btn btn-success">Add New Friend</router-link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(friend, index) in friends" :key="index">
              <td v-if="friend">{{ friend.name }}</td>
              <td v-if="friend">{{ friend.about }}</td>
              <td v-if="appState.userInfo.role === 'superadmin'">
                <div class="form-group">
                  <button type="submit" class="btn btn-danger" v-on:click.self="friendDelete(friend)">Delete</button>
                </div>
              </td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import localforage from '../sessionUtils';
export default {
  name: 'friends',
  data() {
    return {
      friends: {}
    };
  },

  methods: {
    friendDelete: function(value) {
      localforage.getItem('X_TOKEN').then(session => {
        axios
          .delete(`/api/v1/admin/friends/${value._id.$oid}`, {
            headers: { 'x-token': session },
            params: value
          })
          .then(res => {
            this.messages = true;
            setTimeout(() => {
              this.messages = false;
              this.$router.go(this.$router.currentRoute);
            }, 1000);
          })
          .catch(console.error);
      });
    },
    created() {
      axios
        .get('/api/v1/friends')
        .then(response => {
          this.friends = response.data;
        })
        .catch(e => {
          this.errors = e;
        });
    }
  }
};
</script>
