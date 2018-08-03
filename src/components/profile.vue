
<template>
  <div class="container-fluid mx-0 px-0" id="wrapper">
    <div class="col-xs-12 col-md-11 mx-auto my-10">
      <div class="row mx-0 px-0">
        <div class="col-xs-11 col-sm-4 px-0 mb-5"
          v-bind:class="{
            'mx-0' : $mq == 'desktop' || $mq == 'other',
            'mx-auto' : $mq == 'smartphone' || $mq == 'mobile' || $mq == 'tablet'
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
            'mx-0' : $mq == 'desktop' || $mq == 'other',
            'mx-auto' : $mq == 'smartphone' || $mq == 'mobile' || $mq == 'tablet'
          }">
          <div class="row mx-0 px-0">
            <div class="col-xs-7 mx-0 px-0 align-middle">
              <h2 class="text-left gray my-0 py-0">Profile Page</h2>
            </div><!-- Comment to remove white space! 
            --><div class="col-xs-5 mx-0 px-0 align-middle">
              <button class="btn float-right" v-on:click="editInfo">Edit Profile</button>
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
                      ></input-row-no-label>
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
                      ></input-row-no-label>
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
                      ></input-row-no-label>
                    </div>
                  </div>
                  <div class="col-xs-12 text-right my-5">
                    <button class="btn" type="submit">Apply Changes</button>
                    <div class="row mx-0 px-0 my-3">
                      <small>*Only edited fields will submit. Empty fields will not update.</small>
                    </div>
                  </div>
              </div>

              <div class="col-xs-12 col-sm-4 mr-0 pr-0 align-top">
                <img class="col-xs-12 mx-0 px-0" :src="userImage" alt="image not found">
                <input type="file" name="file" id="form_image" class="inputfile" @change="preview" accept="image/*">
                <label for="form_image">Choose a file</label>
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
import inputFieldOnly from './forms/inputFieldOnly.vue';
import inputRow from './forms/inputRow.vue';
import inputRowNoLabel from './forms/inputRowNoLabel.vue';
import swal from 'sweetalert2';
export default {
  name: "profile",
  components: {
    inputFieldOnly,
    inputRow,
    inputRowNoLabel
  },
  data() {
    return {
      sessionId: "",
      sessionInfo: {},
      userImage: "static/assets/crayons-min.jpg",
      edit: false,
      errors: [],
      editFields: {
        name: false,
        email: false,
        password: false,
      },
      profile: {
        name: '',
        email: '',
        password: ''
      },
      confirm: {
        name: '',
        email: '',
        password: ''
      },
      invalidFields: {
        name: false,
        nameConfirm: false,
        email: false,
        emailConfirm: false,
        password: false,
        passwordConfirm: false,
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
        this.errors.push("Name does not match");
      }
      if (evt.target.form_email.value !== evt.target.form_con_email.value) {
        this.errors.push("Email does not match");
      }
      if (
        evt.target.form_password.value !== evt.target.form_con_password.value
      ) {
        this.errors.push("Password does not match");
      }
      if (this.errors.length === 0) {
        localforage
          .getItem("X_TOKEN")
          .then(session => {
            axios
              .post(`/api/v1/profile/edit/${this.sessionInfo._id.$oid}`, {
                headers: { "x-token": session },
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
      .getItem("X_TOKEN")
      .then(session => {
        this.sessionId = session;
        axios
          .get("/api/v1/profile/" + session, {
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
button {
  background-color: white;
  color: var(--brand-sea-green);
  font-weight: bolder;
  border: 2px solid var(--brand-sea-green);
  border-radius: 7px;
}
button:hover {
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
  background-color: rgb(140, 218, 192);
}
.inactive {
  background-color: white;
}
#password {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
input[type="text"]:focus,
#full_name:focus {
  border-color: rgb(140, 218, 192);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgb(140, 218, 192);
  outline: 0 none;
}
</style>
