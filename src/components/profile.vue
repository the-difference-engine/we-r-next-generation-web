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
            </div><!-- Comment to remove white space! 
            --><div class="col-xs-5 mx-0 px-0 align-middle">
              <button class="btn float-right" v-on:click="editInfo">{{editLabel}}</button>
            </div>
          </div>
          <div v-show="edit === false" class="row">
            <div>
              <h2 class="font-weight-bold">{{ sessionInfo.full_name }}</h2>
              <h3 id="email">Email:
                <span class="gray font-weight-light">{{ sessionInfo.email }}</span>
              </h3>
            </div>
          </div>
          <div class="row mx-0 px-0">
            <form class="my-10 text-left" v-on:submit.prevent="submit" v-show="edit === true" >
              <div class="col-xs-12 col-sm-8 mx-0 px-0 align-top">
                <div class="col-xs-12 mx-0 px-0 my-6">
                  <div class="col-xs-12 mpl-0">
                    <div class="align-middle">
                      <h4 class="my-0 py-0">Name:
                        <span class="gray font-weight-light">
                          {{ sessionInfo.full_name }}
                          <span class="mx-4">|</span>
                        </span>
                      </h4>
                    </div>
                    <div class="align-middle">
                      <small class="font-weight-bold align-middle">Edit</small>
                      <input type="checkbox" class="mx-3 align-middle" 
                        v-model="editFields.name">
                    </div>
                  </div>
                  <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                    <input-row-no-label label="Name" type="text"
                        :small="true"
                        pre-add-on-text="New"
                        add-on-color="var(--brand-sea-green-7)"
                        v-model="profile.name"
                        :readonly="!editFields.name"
                        placeholder="Your Name"
                        :min-length="2"
                        :max-length="100"
                        v-on:invalid="invalidFields.name = $event"
                    ></input-row-no-label>
                  </div>
                  <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                    <input-row-no-label label="Name" type="text"
                        :small="true"
                        pre-add-on-text="Confirm"
                        add-on-color="var(--brand-sea-green-7)"
                        v-model="confirm.name"
                        :readonly="!editFields.name"
                        placeholder="Confirm Your Name"
                        :min-length="2"
                        :max-length="100"
                        v-on:invalid="invalidFields.nameConfirm = $event"
                        @input="confirmName"
                    ></input-row-no-label>
                  </div>
                  <div v-if="confirmErrors.name != '' && editFields.name === true" 
                    class="col-xs-12 mx-0 px-0 text-danger font-weight-bold">
                    <p>{{confirmErrors.name}}</p>
                  </div>
                </div>
                <div class="col-xs-12 mx-0 px-0 my-6">
                  <div class="col-xs-12 mpl-0">
                    <div class="align-middle">
                      <h4 class="my-0 py-0">Email:
                        <span class="gray font-weight-light">
                          {{ sessionInfo.email }}
                          <span class="mx-4">|</span>
                        </span>
                      </h4>
                    </div>
                    <div class="align-middle">
                      <small class="font-weight-bold align-middle">Edit</small>
                      <input type="checkbox" class="mx-3 align-middle" 
                        v-model="editFields.email">
                    </div>
                  </div>
                  <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                    <input-row-no-label label="Email" type="email"
                        :small="true"
                        pre-add-on-text="New"
                        add-on-color="var(--brand-sea-green-7)"
                        v-model="profile.email"
                        :readonly="!editFields.email"
                        placeholder="Your Email"
                        :min-length="2"
                        :max-length="100"
                        v-on:invalid="invalidFields.email = $event"
                    ></input-row-no-label>
                  </div>
                  <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                    <input-row-no-label label="Email" type="email"
                        :small="true"
                        pre-add-on-text="Confirm"
                        add-on-color="var(--brand-sea-green-7)"
                        v-model="confirm.email"
                        :readonly="!editFields.email"
                        placeholder="Confirm Your Email"
                        :min-length="2"
                        :max-length="100"
                        v-on:invalid="invalidFields.emailConfirm = $event"
                        @input="confirmEmail"
                    ></input-row-no-label>
                  </div>
                  <div v-if="confirmErrors.email != '' && editFields.email === true" 
                    class="col-xs-12 mx-0 px-0 text-danger font-weight-bold">
                    <p>{{confirmErrors.email}}</p>
                  </div>
                </div>
                <div class="col-xs-12 mx-0 px-0 my-6">
                  <div class="col-xs-12 mpl-0">
                    <div class="align-middle">
                      <h4 class="my-0 py-0">Password
                        <span class="gray font-weight-light">
                          <span class="mx-4">|</span>
                        </span>
                      </h4>
                    </div>
                    <div class="align-middle">
                      <small class="font-weight-bold align-middle">Edit</small>
                      <input type="checkbox" class="mx-3 align-middle" 
                        v-model="editFields.password">
                    </div>
                  </div>
                  <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                    <input-row-no-label label="Password" type="password"
                        :small="true"
                        pre-add-on-text="New"
                        add-on-color="var(--brand-sea-green-7)"
                        v-model="profile.password"
                        :readonly="!editFields.password"
                        placeholder="Your Password"
                        :min-length="2"
                        :max-length="100"
                        v-on:invalid="invalidFields.password = $event"
                    ></input-row-no-label>
                  </div>
                  <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                    <input-row-no-label label="Password" type="password"
                        :small="true"
                        pre-add-on-text="Confirm"
                        add-on-color="var(--brand-sea-green-7)"
                        v-model="confirm.password"
                        :readonly="!editFields.password"
                        placeholder="Confirm Your Password"
                        :min-length="2"
                        :max-length="100"
                        v-on:invalid="invalidFields.passwordConfirm = $event"
                        @input="confirmPassword"
                    ></input-row-no-label>
                  </div>
                  <div v-if="confirmErrors.password != '' && editFields.password === true" 
                    class="col-xs-12 mx-0 px-0 text-danger font-weight-bold">
                    <p>{{confirmErrors.password}}</p>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 mr-0 pr-0 align-top">
                <img class="col-xs-12 mx-0 px-0" :src="userImage" alt="Image not found">
                <input type="file" id="form_image" name="file" class="inputfile" @change="preview" accept="image/*">
                <label class="my-5 btn col-xs-12" for="form_image">Choose a file</label>
              </div>
              <div class="col-xs-12 text-right my-5">
                <button :disabled="checkErrors" class="btn" type="submit">Apply Changes</button>
                <div class="row mx-0 px-0 my-3">
                  <small>*Only edited fields will submit. Empty fields will not update.</small>
                </div>
              </div>
            </form>
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
import inputFieldOnly from "./forms/inputFieldOnly.vue";
import inputRow from "./forms/inputRow.vue";
import inputRowNoLabel from "./forms/inputRowNoLabel.vue";
import swal from "sweetalert2";
export default {
  name: "profile",
  components: {
    inputFieldOnly,
    inputRow,
    inputRowNoLabel
  },
  data() {
    return {
      setup: false, // flag to indicate components have loaded
      sessionId: "",
      sessionInfo: {},
      userImage: "static/assets/crayons-min.jpg",
      edit: false,
      editLabel: "Edit Profile",
      editOptions: {
        true: "Cancel Changes",
        false: "Edit Profile"
      },
      errors: [],
      editFields: {
        name: false,
        email: false,
        password: false
      },
      profile: {
        name: "",
        email: "",
        password: ""
      },
      confirm: {
        name: "",
        email: "",
        password: ""
      },
      confirmErrors: {
        name: "",
        email: "",
        password: ""
      },
      invalidFields: {
        name: false,
        nameConfirm: false,
        nameMatch: false,
        email: false,
        emailConfirm: false,
        emailMatch: false,
        password: false,
        passwordConfirm: false,
        passwordMatch: false,
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
    confirmFields: function(field, confirm, label) {
      if (this.setup) {
        return (field != confirm) ? `Your ${label} and confirmation do not match`: "";
      }
      else { return "" }
    },
    confirmMatchBool: function(errMsg) {
      return (errMsg.length > 0);
    },
    confirmAllMatches: function() {
      return new Promise((resolve, reject) => {
        this.debouncedConfirmName();
        this.debouncedConfirmEmail();
        this.debouncedConfirmPassword();
        resolve(true);
      });
    },
    debouncedConfirmName: function() {
      this.confirmErrors.name = this.confirmFields(
        this.profile.name,
        this.confirm.name,
        'name'
      );
      this.invalidFields.nameMatch = this.confirmMatchBool(this.confirmErrors.name);
    },
    debouncedConfirmEmail: function() {
      this.confirmErrors.email = this.confirmFields(
        this.profile.email,
        this.confirm.email,
        'email'
      );
      this.invalidFields.emailMatch = this.confirmMatchBool(this.confirmErrors.email);
    },
    debouncedConfirmPassword: function() {
      this.confirmErrors.password = this.confirmFields(
        this.profile.password,
        this.confirm.password,
        'password'
      );
      this.invalidFields.passwordMatch = this.confirmMatchBool(this.confirmErrors.password);
    },
    preview: function(event) {
      // preview selected image file
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.userImage = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    getUpdated: function(isEdited, newVal, oldVal) {
      return isEdited ? newVal : oldVal;
    },
    getName: function() {
      return this.getUpdated(
        this.editFields.name, 
        this.profile.name, 
        this.sessionInfo.name)
    },
    getEmail: function() {
      return this.getUpdated(
        this.editFields.email, 
        this.profile.email, 
        this.sessionInfo.email)
    },
    getPassword: function() {
      return this.getUpdated(
        this.editFields.password, 
        this.profile.password, 
        this.profile.password)
    },
    submit: function(evt) {
      // confirm matches prior to submitting to prevent user
      // from submitting without typing anything in the confirmation fields
      this.confirmAllMatches()
      .then(res => {
      if (this.checkErrors === false) {
        localforage.getItem("X_TOKEN")
        .then(session => {
          let name = this.getName();
          let email = this.getEmail();
          let password = this.getPassword();
          // axios.post(`/api/v1/profile/edit/${this.sessionInfo._id.$oid}`, {
          //   headers: { "x-token": session },
          //   params: {
          //     full_name: name,
          //     email: email,
          //     password: password
          //   }
          // })
          // .then(res => {
          //   this.sessionInfo = res.data;
          // })
          // .catch(err => {
          //   console.log(err);
          // });
        })
        .catch(console.error);
        }
      })
    },
    editInfo() {
      this.edit = !this.edit;
      this.editLabel = this.editOptions[this.edit.toString()];
    }
  },
  computed: {
    checkErrors: function() {
      if (this.editFields.name) {
        if (  this.invalidFields.name === true ||
              this.invalidFields.nameConfirm === true ||
              this.invalidFields.nameMatch === true ) {
          return true;
        }
      }
      if (this.editFields.email) {
        if (  this.invalidFields.email === true ||
              this.invalidFields.emailConfirm === true ||
              this.invalidFields.emailMatch === true ) {
          return true;
        }
      }
      if (this.editFields.password) {
        if (  this.invalidFields.password === true ||
              this.invalidFields.passwordConfirm === true ||
              this.invalidFields.passwordMatch === true ) {
          return true;
        }
      }
      return false;
    },
  },
  created: function() {
    localforage.getItem("X_TOKEN")
    .then(session => {
      this.sessionId = session;
      axios.get("/api/v1/profile/" + session, {
        headers: { "x-token": this.sessionId }
      })
      .then(response => {
        this.sessionInfo = response.data;
        this.profile.name = response.data.full_name;
        this.profile.email = response.data.email;
      })
      .catch(e => {
        this.errors = e;
      });
    })
    .catch(err => console.error(err));
    
    // debounce will wait a period of time before running the confirmation validators
    // this will permit time for the user to finish typing
    this.confirmName = _.debounce(this.debouncedConfirmName, 1000);
    this.confirmEmail = _.debounce(this.debouncedConfirmEmail, 1000);
    this.confirmPassword = _.debounce(this.debouncedConfirmPassword, 1000);
  },
  mounted: function() {
    // set flag to indicate input components have loaded
    setTimeout(() => {
      this.setup = true;
    }, 3000);
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
  border: 5px solid var(--brand-sea-green-7);
  border-radius: 12px;
}
.gray {
  color: gray;
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
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
