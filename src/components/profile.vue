
<template>
  <div id="wrapper">
    <div class="row" id="boxHolder">
      <profile-sidebar></profile-sidebar>
      <div class="boxes col" id="main" v-show="this.status.profile === 'active'">
        <div id="mainHeader">
          <div id="titleDiv">
            <h2 id="mainTitle" class="text-left gray">Profile Page</h2>
          </div>
          <div id="editDiv">
            <button id="editButton" class="btn btn-primary" v-on:click="editInfo">Edit Profile</button>
          </div>
        </div>
        <div v-show="edit === false" class="row">
          <div>
            <h1 class="bold userInfo" id="user-name">{{ sessionInfo.full_name }}</h1>
            <h3 id="email" class="userInfo">Email: <span class="gray light">{{ sessionInfo.email }}</span></h3>
          </div>
        </div>

          <form v-on:submit.prevent="submit" v-show="edit == true" >
            <div id="mainMid">
              <div id="userInfo" class="col col-12">
                <h3>Name:<span class="gray light">{{ sessionInfo.full_name }}</span></h3>
                <div class="input-group input-group-sm mb-3 inputs" >
                  <div class="input-group-prepend input-caps">
                    <span class="input-group-text">New</span>
                  </div>
                  <input id="form_con_name" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>

                <div class="input-group input-group-sm mb-3 inputs" >
                  <div class="input-group-prepend input-caps">
                    <span class="input-group-text">Confirm</span>
                  </div>
                  <input id="form_name" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>

                <h3>Email:<span class="gray light">{{ sessionInfo.email }}</span></h3>
                <div class="input-group input-group-sm mb-3 inputs" >
                  <div class="input-group-prepend input-caps">
                    <span class="input-group-text">New</span>
                  </div>
                  <input id="form_email" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>

                <div class="input-group input-group-sm mb-3 inputs confirm-inputs" >
                  <div class="input-group-prepend input-caps">
                    <span class="input-group-text">Confirm</span>
                  </div>
                  <input id="form_con_email" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>

                <h3 id="password" class="userInfo input-group mb-3">Password:</h3>
                <div class="input-group input-group-sm mb-3 inputs" >
                  <div class="input-group-prepend input-caps">
                    <span class="input-group-text">New</span>
                  </div>
                  <input id="form_password" type="password" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>

                <div class="input-group input-group-sm mb-3 inputs confirm-inputs" >
                  <div class="input-group-prepend input-caps">
                    <span class="input-group-text">Confirm</span>
                  </div>
                  <input id="form_con_password" type="password" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                </div>

                <button  id="submit-button" class="btn btn-primary submit-buttons" type="submit">Apply Changes</button>
            </div>

            <div id="image-section" class="col">
              <img :src="userImage" alt="image not found">
              <input type="file" name="file" id="form_image" class="inputfile" @change="preview" accept="image/*">
              <label for="form_image">Choose a file</label>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import profileSidebar from './profileSidebar.vue';
import localforage from '../sessionUtils';
import axios from 'axios';
export default {
  name: 'profile',
  components: {
    profileSidebar
  },
  data() {
    return {
      sessionId: '',
      sessionInfo: {},
      userImage: 'static/assets/saturn1.jpg',
      edit: false,
      errors: [],
      status: {
        profile: 'active',
        camp: 'inactive',
        volunteer: 'inactive',
        partner: 'inactive'
      },
      userStatus: ''
    };
  },
  methods: {
    preview: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.userImage = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    submit: function(evt) {
      this.errors = [];
      if (evt.target.form_name.value !== evt.target.form_con_name.value) {
        this.errors.push('Name does not match');
      }
      if (evt.target.form_email.value !== evt.target.form_con_email.value) {
        this.errors.push('Email does not match');
      }
      if (
        evt.target.form_password.value !== evt.target.form_con_password.value
      ) {
        this.errors.push('Password does not match');
      }
      if (this.errors.length === 0) {
        localforage
          .getItem('X_TOKEN')
          .then(session => {
            axios
              .post(`/api/v1/profile/edit/${this.sessionInfo._id.$oid}`, {
                headers: { 'x-token': session },
                params: {
                  full_name:
                    evt.target.form_name.value.length !== 0
                      ? evt.target.form_name.value
                      : this.sessionInfo.full_name,
                  email:
                    evt.target.form_email.value.length !== 0
                      ? evt.target.form_email.value
                      : this.sessionInfo.email
                }
              })
              .then(res => {
                this.sessionInfo = res.data;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(console.error);
      }
    },
    editInfo() {
      this.edit = !this.edit;
    }
  },
  created() {
    localforage
      .getItem('X_TOKEN')
      .then(session => {
        this.sessionId = session;
        axios
          .get('/api/v1/profile/' + session, {
            headers: { 'x-token': this.sessionId }
          })
          .then(response => {
            this.sessionInfo = response.data;
          })
          .catch(e => {
            this.errors = e;
          });
      })
      .catch(err => console.error(err));
  }
};
</script>

<style scoped>
#wrapper {
  background: radial-gradient(rgb(255, 147, 39), hsl(30, 100%, 79%));
  justify-content: center;
  padding-bottom: 60px;
}
.boxes {
  background-color: white;
  border: 5px solid rgb(140, 218, 192);
  border-radius: 12px;
  display: inline-block;
}
#main {
  width: 60%;
  height: 495px;
  justify-content: center;
}
#boxHolder {
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 60px;
}
#mainMid {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: start;
  margin-left: 10%;
}
#mainHeader {
  display: flex;
  justify-content: space-between;
}
.gray {
  color: gray;
}
.bold {
  font-weight: bold;
}
button {
  background-color: white;
  color: rgb(113, 214, 180);
  font-weight: bolder;
  border: 2px solid rgb(113, 214, 180);
  border-radius: 7px;
}
button:hover {
  color: rgb(10, 173, 119);
  border: 2px solid rgb(32, 199, 143);
  background-color: white;
}
#image-section {
  margin-right: 10%;
  margin-top: 25px;
}
img {
  height: 300px;
  border-radius: 10px;
  display: block;
}
#userInfo {
  display: inline-block;
}
#titleDiv {
  display: inline-block;
  margin-left: 5%;
}
#editDiv {
  padding-top: 15px;
  margin-right: 5%;
}
#password {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.light {
  font-weight: lighter;
}
.inputs {
  display: flex;
}
.input-caps {
  background-color: rgb(140, 218, 192);
  padding: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: white;
}
.confirm-inputs {
  margin-top: 5px;
}
#user-name {
  margin-top: 0px;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label {
  background-color: white;
  color: rgb(113, 214, 180);
  font-weight: bolder;
  border: 2px solid rgb(113, 214, 180);
  border-radius: 7px;
  padding: 6px;
  padding-left: 13px;
  padding-right: 13px;
  margin-bottom: 0px;
  margin-top: 5px;
}
.inputfile + label:hover {
  color: rgb(10, 173, 119);
  border: 2px solid rgb(32, 199, 143);
  cursor: pointer;
}
#submit-button {
  margin-top: 5px;
}
input[type='text']:focus,
#full_name:focus {
  border-color: rgb(140, 218, 192);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgb(140, 218, 192);
  outline: 0 none;
}
</style>
