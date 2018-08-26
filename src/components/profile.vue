<template>
  <div class="container-fluid mx-0 px-0" id="wrapper">
    <div class="col-xs-12 col-md-11 mx-auto my-10">
      <div class="boxes col-xs-11 mx-auto p-3">
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
            :profile-to-submit="profileToSubmit"
            :user-image="userImage"
            :profile="profile"
          ></edit-user-profile>
        </div>
        <div class="row mx-0 px-0">
          <all-apps-submitted></all-apps-submitted>
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
import allAppsSubmitted from "./applications/appsSubmitted.vue";
export default {
  name: "profile",
  components: {
    viewUserProfile,
    editUserProfile,
    allAppsSubmitted,
  },
  data() {
    return {
      sessionInfo: {},
      profileToSubmit: {},
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
    editInfo() {
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
  border: 5px solid var(--brand-sea-green-7);
  border-radius: 12px;
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
