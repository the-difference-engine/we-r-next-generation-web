<template>
  <div class="container-fluid mx-0 px-0" id="wrapper">
    <div class="col-xs-12 col-md-11 mx-auto my-10">
      <div class="row mx-0 px-0">
        <div class="col-xs-11 col-sm-4 px-0 mb-5"
          v-bind:class="{
            'mx-0' : $mq === 'desktop' || $mq === 'other',
            'mx-auto' : $mq === 'smartphone' || $mq === 'mobile' || $mq === 'tablet'
          }">
          <div class="boxes col-sm-10 col-md-9 mx-auto px-0">
            <h3 class="profileNav" v-on:click="changeStatus('profile')" v-bind:class="status.profile" id="profile">Profile</h3>
            <h3 class="profileNav" v-on:click="changeStatus('camp')" v-bind:class="status.camp" id="camp">Camp Application</h3>
            <h3 class="profileNav" v-on:click="changeStatus('volunteer')" v-bind:class="status.volunteer" id="volunteer">Volunteer Application</h3>
            <h3 class="profileNav" v-on:click="changeStatus('partner')" v-bind:class="status.partner" id="partner">Partner Application</h3>
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
        this.profile.stateProvince = response.data.stateProvince;
        this.profile.country = response.data.country;
        this.profile.zipCode = response.data.zipCode;
        this.profile.phone = response.data.phone;
        this.profile.email = response.data.email;
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
.profileNav {
  padding-top: 15px;
  padding-bottom: 15px;
}
.profileNav:hover {
  cursor: pointer;
}
.active {
  background-color: var(--brand-sea-green-8);
}
.inactive {
  background-color: white;
}
</style>
