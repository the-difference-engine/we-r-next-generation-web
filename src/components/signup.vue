<template>
  <div id="background-img" class="container-fluid px-0">
    <div class="row mx-0 px-0 py-10">
      <div class="signup-container col-lg-5 col-md-6 col-sm-10 col-xs-11 mx-auto">
        <div class="row">
          <h1 class="font-weight-bold my-10">Sign Up for WeRNextGeneration</h1>
          <div class="row my-5 px-0">
            <div class="col-xs-12 col-sm-6 my-5 align-middle">
              <span><i>Already have an account?</i></span>
            </div><!-- Comment to remove white space for align-middle! 
            --><div class="col-xs-12 col-sm-6 align-middle">
              <router-link to="/login">
                <button class="col-xs-6 btn btn-teal mx-auto">Login</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <form v-on:submit.prevent="signup">
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Name</span>
              <input-row-no-label label="Name" type="text"
                  v-model="newUser.name"
                  placeholder="Your Full Name"
                  autocomplete="name family-name"
                  :min-length="2"
                  :max-length="100"
                  v-on:invalid="invalidFields.name = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Address</span>
              <input-row-no-label label="Address 1" type="text"
                  v-model="newUser.address1"
                  placeholder="Your Street Address, Line 1"
                  autocomplete="address-1"
                  :min-length="2"
                  :max-length="100"
                  v-on:invalid="invalidFields.address1 = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Address 2</span>
              <input-row-no-label label="Address 2" type="text"
                  v-model="newUser.address2"
                  placeholder="Your Street Address, Line 2"
                  autocomplete="address-2"
                  :required="false"
                  :max-length="100"
                  v-on:invalid="invalidFields.address2 = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>City</span>
              <input-row-no-label label="City" type="text"
                  v-model="newUser.city"
                  placeholder="Your City"
                  autocomplete="city address-level2"
                  :min-length="2"
                  :max-length="100"
                  v-on:invalid="invalidFields.city = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>State/Province</span>
              <input-row-no-label label="State/Province" type="text"
                  v-model="newUser.state_province"
                  placeholder="Your State or Province"
                  autocomplete="state province address-level1"
                  :min-length="2"
                  :max-length="100"
                  v-on:invalid="invalidFields.state_province = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Country</span>
              <input-row-no-label label="Country" type="select"
                  v-model="newUser.country"
                  placeholder="Your Country"
                  :choices="countriesJson"
                  autocomplete="country"
                  v-on:invalid="invalidFields.country = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Postal Code</span>
              <input-row-no-label label="Postal Code" type="text"
                  v-model="newUser.zip_code"
                  placeholder="Your Zip or Postal Code"
                  autocomplete="zip postal-code"
                  :min-length="5"
                  :max-length="15"
                  v-on:invalid="invalidFields.zip_code = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Phone Number</span>
              <input-row-no-label label="Phone Number" type="text"
                  v-model="newUser.phone_number"
                  placeholder="Your Phone Number"
                  autocomplete="phone"
                  :min-length="7"
                  :max-length="20"
                  v-on:invalid="invalidFields.phone_number = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Email</span>
              <input-row-no-label label="Email" type="email"
                  v-model="newUser.email"
                  placeholder="Your Email"
                  autocomplete="email"
                  :min-length="5"
                  :max-length="100"
                  v-on:invalid="invalidFields.email = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <div class="row mx-0 px-0">
                <span class="col-xs-6 px-0">Password</span>
                <div class="col-xs-6 text-right">
                  <span><small>{{toggleText}}</small></span>
                  <button class="password-toggle" 
                    type="button" 
                    v-on:click="switchVisibility">
                    <i :class="toggleClass" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <input-row-no-label label="Password" :type="passwordFieldType"
                  v-model="newUser.password"
                  placeholder="Your Password"
                  :min-length="8"
                  :max-length="100"
                  v-on:invalid="invalidFields.password = $event"
              ></input-row-no-label>
            </div>
            <div class="row my-4 mx-0 px-0 text-left gray">
              <span>Confirm Password</span>
              <input-row-no-label label="Confirm Password" :type="passwordFieldType"
                  v-model="newUser.password_confirm"
                  placeholder="Confirm Your Password"
                  :min-length="8"
                  :max-length="100"
                  :must-match-string="true"
                  :match-string="newUser.password"
                  v-on:invalid="invalidFields.password_confirm = $event"
              ></input-row-no-label>
            </div>
            <div class="row mx-0 pr-1">
              <small class="col-xs-12 my-5 px-2 gray">By clicking sign up you are agreeing to WeRNextGeneration Terms of Use.</small>
            </div>
            <div class="row mx-0 pr-1">
              <input :disabled="checkErrors" class="btn btn-teal col-xs-12 font-size-2 my-4" type="submit" value="Sign Up"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import json from "../json/countries.json";
import inputRowNoLabel from "./forms/inputRowNoLabel.vue";
import swal from "sweetalert2";
export default {
  name: "signup",
  components: {
    inputRowNoLabel
  },
  data() {
    return {
      signedUp: false,
      signUpErr: false,
      passwordFieldType: "password",
      toggleClass: "fa fa-toggle-on",
      toggleText: "Show",
      countriesJson: json,
      newUser: {
        name: "",
        address1: "",
        address2: "",
        city: "",
        state_province: "",
        country: "",
        zip_code: "",
        phone_number: "",
        email: "",
        password: "",
        password_confirm: ""
      },
      invalidFields: {
        name: false,
        address1: false,
        address2: false,
        city: false,
        state_province: false,
        country: false,
        zip_code: false,
        phone_number: false,
        email: false,
        password: false,
        password_confirm: false
      },
      notRequired: [
        "address2",
      ]
    };
  },
  methods: {
    formHasErrors: function() {
      this.pwErrors = [];
      let isErrors = false;
      for (let key in this.newUser) {
        if (
          this.invalidFields[key] === true ||
          ( this.newUser[key] === '' && !this.notRequired.includes(key) )
        ) {
          isErrors = true;
        }
      }
      return isErrors;
    },
    showError: function(errors) {
      let text = (errors !== null) ? errors : "We were unable to create a profile with the information you provided.";
      swal({
        type: "error",
        title: "Oops ...",
        text: text
      });
    },
    signup: function(evt) {
      if (this.formHasErrors() === false) {
        this.$store.dispatch("signup", {
          newUser: this.newUser
        })
        .then(signedUp => {
          if (signedUp === true) {
            swal({
              type: "success",
              title: "Welcome to WeRNextGeneration!",
              text:
                "Check your email! A link to confirm your account has been sent to you!"
            });
          } else {
            this.showError(signedUp);
          }
        });
      } else { this.showError() }
    },
    switchVisibility: function() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.toggleClass =
        this.toggleClass === "fa fa-toggle-on"
          ? "fa fa-toggle-off"
          : "fa fa-toggle-on";
      this.toggleText = this.toggleText === "Show" ? "Hide" : "Show";
    }
  },
  computed: {
    checkErrors: function() {
      return this.formHasErrors();
    }
  }
};
</script>

<style scoped>
.password-toggle {
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 17px;
}
span {
  color: gray;
  font-size: 16px;
}
#background-img {
  background: url("http://res.cloudinary.com/wernextgeneration/image/upload/v1522972807/wernextgen-login.jpg")
    no-repeat fixed center;
  opacity: 0.8;
  height: 100% !important;
}
.signup-container {
  padding: 20px 70px;
  height: auto;
  opacity: 1 !important;
  border-radius: 10px;
  border: 4px solid var(--brand-warning);
  background-color: white;
  text-align: center;
}
</style>
