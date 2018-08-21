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
        <hr class="col-xs-12 mx-auto px-0 my-5 gray">
        <div v-show="edit === false" class="row mx-0 px-0 my-10">
          <view-user-profile
            :session-info="sessionInfo"
            :user-image="userImage"
          ></view-user-profile>
        </div>
        <div v-show="edit === true" class="row mx-0 px-0">
          <edit-user-profile
            :session-info="sessionInfo"
            :profile-to-submit="profileToSubmit"
            :user-image="userImage"
            :profile="profile"
          ></edit-user-profile>
        </div>
        <div class="row mx-0 px-0">
          <app-children></app-children>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import localforage from "../sessionUtils";
import axios from "axios";
import _ from 'lodash';
import viewUserProfile from "./userProfile/viewProfile.vue";
import editUserProfile from "./userProfile/editProfile.vue";
import appChildren from "./applications/children.vue";
import profileSidebar from './profileSidebar.vue';
export default {
  name: "profile",
  components: {
    viewUserProfile,
    editUserProfile,
    appChildren,
    profileSidebar
  },
  data() {
    return {
      userStatus: ''
      sessionId: '',
      errors: [],
      sessionInfo: {},
      profileToSubmit: {},
      userImage: "static/assets/crayons-min.jpg",
      status: {
        profile: 'active',
        camp: 'inactive',
        volunteer: 'inactive',
        partner: 'inactive'
      },
      edit: false,
      editLabel: "Edit Profile",
      editOptions: {
        true: "Cancel Changes",
        false: "Edit Profile"
      },
      profile: {
        name: "",
        address1: "",
        address2: "",
        city: "",
        state_province: "",
        country: "",
        zip_code: "",
        phone_number: "",
        email: "",
        passwordOld: "",
        password: ""
      },
    };
  },
  methods: {
    copySessionInfo: function() {
      for (let key in this.sessionInfo) {
        this.profileToSubmit[key] = this.sessionInfo[key];
      }
    },
    editInfo: function() {
      this.edit = !this.edit;
      this.editLabel = this.editOptions[this.edit.toString()];
    }
  },
  created: function() {
    localforage.getItem("X_TOKEN")
    .then(session => {
      axios.get("/api/v1/profile/" + session, {
        headers: { "x-token": session }
      })
      .then(response => {
        this.sessionInfo = response.data;
        this.profile.name = response.data.full_name;
        this.profile.address1 = response.data.address1;
        this.profile.address2 = response.data.address2;
        this.profile.city = response.data.city;
        this.profile.state_province = response.data.state_province;
        this.profile.country = response.data.country;
        this.profile.zip_code = response.data.zip_code;
        this.profile.phone_number = response.data.phone_number;
        this.profile.email = response.data.email;
        this.copySessionInfo();     // prepare object to submit (that will not overwrite existing session info)
      })
      .catch(e => {
        this.errors = e;
      });
    })
    .catch(err => console.error(err));
  },
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
  /*border: 5px solid var(--brand-sea-green-7);*/
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
button,
.inputfile + label {
  background-color: white;
  color: var(--brand-sea-green);
  font-weight: bolder;
  border: 2px solid var(--brand-sea-green);
  border-radius: 7px;
}
button:hover[disabled="false"],
.inputfile + label:hover {
  color: var(--brand-sea-green-13);
  border: 2px solid var(--brand-sea-green-16);
  background-color: white;
}
</style>
