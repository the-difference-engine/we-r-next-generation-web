<template>
  <div id="wrapper">
    <h1>Friends of WRNG</h1>
    <div>
      <div class="row">
        <div v-if="isAdmin" class="col-md-12 text-right">
          <button v-on:click.self="toggle = !toggle" class="btn btn-success">Add Friend</button>
        </div>
        <div class="row" v-show="!toggle">
          <form class form v-on:submit.prevent="addOrEditFriend">
            <div class="form-group row">
              <label class="col-md-2 col-form-label text-right">Name</label>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="formData.name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 col-form-label text-right">About</label>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="formData.about">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 col-form-label text-right">Website</label>
              <div class="col-md-8">
                <input type="text" class="form-control" v-model="formData.url">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save & Submit New Friend</button>
          </form>
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(friend, index) in friends" :key="index">
            <td v-if="friend"><a v-bind:href="friend.url">{{ friend.name }}</a></td>
            <td v-if="friend">{{ friend.about }}</td>
            <td v-if="isAdmin">
              <div class="form-group">
                <button type="submit" class="btn btn-default" v-on:click.self="friendEdit(friend); toggle = !toggle">Edit</button>
              </div>
            </td>
            <td v-if="isAdmin">
              <div class="form-group">
                <button type="submit" class="btn btn-danger" v-on:click.self="friendDelete(friend)">Delete</button>
              </div>
            </td>
          </tr>
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
      friends: {},
      toggle: true,
      formData: {}
    };
  },

  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    }
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
    friendEdit: function(friend) {
      this.formData = friend;
      this.editing = true;
    },
    addOrEditFriend: function(value) {
      localforage
        .getItem('X_TOKEN')
        .then(session => {
          if (this.editing) {
            console.log(this.formData);
            axios
              .put(`/api/v1/friends/${this.formData._id.$oid}`, {
                headers: { 'x-token': session },
                params: this.formData
              })
              .then(res => {
                setTimeout(() => {
                  this.$router.go(this.$router.currentRoute);
                }, 1000);
              })
              .catch(console.error);
          } else {
            axios
              .post(`/api/v1/admin/friends`, {
                headers: { 'x-token': session },
                params: this.formData
              })
              .then(res => {
                setTimeout(() => {
                  this.$router.go(this.$router.currentRoute);
                }, 1000);
              })
              .catch(console.error);
          }
        })
        .catch(console.error);
    }
  },

  created() {
    console.log('IN CREATED');
    axios
      .get('/api/v1/friends')
      .then(response => {
        this.friends = response.data;
        console.log('Friends: ', this.friends);
      })
      .catch(console.error);
  }
};
</script>

<style scoped>
th {
  text-align-last: center;
}
</style>

