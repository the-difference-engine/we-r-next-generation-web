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
        <div class="boxes col-xs-11 col-sm-8 p-3" 
          v-show="this.status.profile === 'active'"
          v-bind:class="{
            'mx-0' : $mq === 'desktop' || $mq === 'other',
            'mx-auto' : $mq === 'smartphone' || $mq === 'mobile' || $mq === 'tablet'
          }">
          <div class="row mx-0 px-0">
            <div class="col-xs-7 mx-0 px-0 align-middle">
              <h2 class="text-left gray my-0 py-0">Profile Page</h2>
            </div><!-- Comment to remove white space for align-middle class! 
            --><div class="col-xs-5 mx-0 px-0 align-middle">
              <button class="btn float-right" v-on:click="editInfo">{{editLabel}}</button>
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
  </div>
</template>

<script>
import localforage from "../sessionUtils";
import axios from "axios";
import _ from 'lodash';
import viewUserProfile from "./userProfile/viewProfile.vue";
import editUserProfile from "./userProfile/editProfile.vue";
import appChildren from "./applications/children.vue";
export default {
  name: "profile",
  components: {
    viewUserProfile,
    editUserProfile,
    appChildren,
  },
  data() {
    return {
      sessionInfo: {},
      userImage: "static/assets/crayons-min.jpg",
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
        stateProvince: "",
        country: "",
        zipCode: "",
        phone: "",
        email: "",
        passwordOld: "",
        password: ""
      },
      status: {
        profile: "active",
        camp: "inactive",
        volunteer: "inactive",
        partner: "inactive"
      },
      userStatus: ""
    };
  },
  methods: {
    changeStatus: function(link) {
      if (link === "profile") {
        this.status.profile = "active";
        this.status.camp = "inactive";
        this.status.volunteer = "inactive";
        this.status.partner = "inactive";
      }
      if (link === "camp") {
        this.status.camp = "active";
        this.status.profile = "inactive";
        this.status.volunteer = "inactive";
        this.status.partner = "inactive";
      }
      if (link === "volunteer") {
        this.status.volunteer = "active";
        this.status.camp = "inactive";
        this.status.profile = "inactive";
        this.status.partner = "inactive";
      }
      if (link === "partner") {
        this.status.partner = "active";
        this.status.camp = "inactive";
        this.status.volunteer = "inactive";
        this.status.profile = "inactive";
      }
    },
    editInfo() {
      this.edit = !this.edit;
      this.editLabel = this.editOptions[this.edit.toString()];
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
  /* border-bottom: 2px solid rgb(190, 190, 190); */
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
  background-color: var(--brand-sea-green-8);
}
.inactive {
  background-color: white;
}
</style>
