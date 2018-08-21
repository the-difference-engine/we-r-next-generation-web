<template>
  <div class="container-fluid mx-0 px-0">
    <form class="my-10 text-left" v-on:submit.prevent="submit">
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
                autocomplete="name family-name"
                :min-length="2"
                :max-length="100"
                v-on:invalid="invalidFields.name = $event"
            ></input-row-no-label>
            </div>
        </div>
        <div class="col-xs-12 mx-0 px-0 my-6">
            <div class="col-xs-12 mpl-0">
            <div class="align-middle">
                <h4 class="my-0 py-0">Address:
                    <span class="mx-4">|</span>
                </h4>
            </div>
            <div class="align-middle">
                <small class="font-weight-bold align-middle">Edit</small>
                <input type="checkbox" class="mx-3 align-middle" 
                v-model="editFields.address">
            </div>
            </div>
            <div class="row mx-0 px-0">
            <div class="mx-0 px-0 gray font-weight-light align-top"
                v-bind:class="{
                'col-md-3' : editFields.address,
                'col-xs-12' : !editFields.address
                }">
                <p class="col-xs-12 mx-0 px-0">{{sessionInfo.address}}</p>
                <p class="col-xs-12 mx-0 px-0">{{sessionInfo.address2}}</p>
                <p class="col-xs-12 mx-0 px-0">{{sessionInfo.city}}, {{sessionInfo.state}} {{sessionInfo.zip_code}}</p>
                <p class="col-xs-12 mx-0 px-0">{{sessionInfo.country}}</p>
            </div>
            <div v-show="editFields.address" class="col-md-9 col-xs-12 mx-0 pr-0 align-top border-left">
                <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                <input-row-no-label label="Street Address 1" type="text"
                    :small="true"
                    pre-add-on-text="Street 1"
                    add-on-color="var(--brand-sea-green-7)"
                    v-model="profile.address1"
                    :readonly="!editFields.address"
                    placeholder="Your Street Address, Line 1"
                    autocomplete="address-1"
                    :min-length="2"
                    :max-length="100"
                    v-on:invalid="invalidFields.address1 = $event"
                ></input-row-no-label>
                </div>
                <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                <input-row-no-label label="Street Address 2" type="text"
                    :small="true"
                    pre-add-on-text="Street 2"
                    add-on-color="var(--brand-sea-green-7)"
                    v-model="profile.address2"
                    :readonly="!editFields.address"
                    placeholder="Your Street Address, Line 2"
                    autocomplete="address-2"
                    :required="false"
                    :min-length="2"
                    :max-length="100"
                    v-on:invalid="invalidFields.address2 = $event"
                ></input-row-no-label>
                </div>
                <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                <input-row-no-label label="City" type="text"
                    :small="true"
                    pre-add-on-text="City"
                    add-on-color="var(--brand-sea-green-7)"
                    v-model="profile.city"
                    :readonly="!editFields.address"
                    placeholder="Your City"
                    autocomplete="city address-level2"
                    :min-length="2"
                    :max-length="100"
                    v-on:invalid="invalidFields.city = $event"
                ></input-row-no-label>
                </div>
                <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                <input-row-no-label label="State/Province" type="text"
                    :small="true"
                    pre-add-on-text="State"
                    add-on-color="var(--brand-sea-green-7)"
                    v-model="profile.stateProvince"
                    :readonly="!editFields.address"
                    placeholder="Your State or Province"
                    autocomplete="state province address-level1"
                    :min-length="2"
                    :max-length="100"
                    v-on:invalid="invalidFields.stateProvince = $event"
                ></input-row-no-label>
                </div>
                <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                <input-row-no-label label="Country" type="select"
                    :small="true"
                    add-on-color="var(--brand-sea-green-7)"
                    v-model="profile.country"
                    :readonly="!editFields.address"
                    placeholder="Your Country"
                    :choices="countriesJson"
                    autocomplete="country"
                    v-on:invalid="invalidFields.country = $event"
                ></input-row-no-label>
                </div>
                <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
                <input-row-no-label label="Postal Code" type="text"
                    :small="true"
                    pre-add-on-text="Postal Code"
                    add-on-color="var(--brand-sea-green-7)"
                    v-model="profile.zipCode"
                    :readonly="!editFields.address"
                    placeholder="Your Zip or Postal Code"
                    autocomplete="zip postal-code"
                    :min-length="2"
                    :max-length="15"
                    v-on:invalid="invalidFields.zipCode = $event"
                ></input-row-no-label>
                </div>
            </div>
            </div>
        </div>
        <div class="col-xs-12 mx-0 px-0 my-6">
            <div class="col-xs-12 mpl-0">
            <div class="align-middle">
                <h4 class="my-0 py-0">Phone Number:
                <span class="gray font-weight-light">
                    {{ sessionInfo.phone }}
                    <span class="mx-4">|</span>
                </span>
                </h4>
            </div>
            <div class="align-middle">
                <small class="font-weight-bold align-middle">Edit</small>
                <input type="checkbox" class="mx-3 align-middle" 
                v-model="editFields.phone">
            </div>
            </div>
            <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
            <input-row-no-label label="Phone" type="text"
                :small="true"
                pre-add-on-text="New"
                add-on-color="var(--brand-sea-green-7)"
                v-model="profile.phone"
                :readonly="!editFields.phone"
                placeholder="Your Phone Number"
                autocomplete="phone"
                :min-length="2"
                :max-length="20"
                v-on:invalid="invalidFields.phone = $event"
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
                autocomplete="email"
                :min-length="2"
                :max-length="100"
                v-on:invalid="invalidFields.email = $event"
            ></input-row-no-label>
            </div>
            <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
            <input-row-no-label label="Confirm Email" type="email"
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
            <input-row-no-label label="Current Password" type="password"
                :small="true"
                pre-add-on-text="Current"
                add-on-color="var(--brand-sea-green-7)"
                v-model="profile.passwordOld"
                :readonly="!editFields.password"
                placeholder="Your Current Password"
                v-on:invalid="invalidFields.password = $event"
            ></input-row-no-label>
            </div>
            <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
            <input-row-no-label label="New Password" type="password"
                :small="true"
                pre-add-on-text="New"
                add-on-color="var(--brand-sea-green-7)"
                v-model="profile.password"
                :readonly="!editFields.password"
                placeholder="Your New Password"
                :min-length="2"
                :max-length="100"
                v-on:invalid="invalidFields.password = $event"
            ></input-row-no-label>
            </div>
            <div class="col-xs-12 mx-0 px-0 input-group input-group-sm">
            <input-row-no-label label="Confirm Password" type="password"
                :small="true"
                pre-add-on-text="Confirm"
                add-on-color="var(--brand-sea-green-7)"
                v-model="confirm.password"
                :readonly="!editFields.password"
                placeholder="Confirm Your New Password"
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
</template>

<script>
import localforage from "../../sessionUtils";
import axios from "axios";
import _ from 'lodash';
import json from '../../json/countries.json';
import inputRowNoLabel from "../forms/inputRowNoLabel.vue";
import swal from "sweetalert2";
export default {
    name: "editUserProfile",
    components: {
        inputRowNoLabel,
    },
    props: {
        sessionInfo: {
            type: Object,
            required: true,
        },
        userImage: {
            type: String,
            default: "static/assets/crayons-min.jpg",
        },
        profile: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            setup: false, // flag to indicate components have loaded
            countriesJson: json,
            editFields: {
                name: false,
                address: false,
                phone: false,
                email: false,
                password: false
            },
            confirm: {
                email: "",
                password: ""
            },
            confirmErrors: {
                email: "",
                password: ""
            },
            invalidFields: {
                name: false,
                address1: false,
                address2: false,
                city: false,
                state: false,
                country: false,
                zipCode: false,
                phone: false,
                email: false,
                emailConfirm: false,
                emailMatch: false,
                password: false,
                passwordConfirm: false,
                passwordMatch: false,
            },
        }
    },
    methods: {
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
                this.debouncedConfirmEmail();
                this.debouncedConfirmPassword();
                resolve(true);
            });
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
            newVal = (newVal === '') ? oldVal : newVal; // if newVal is blank, use oldVal
            return isEdited ? newVal : oldVal;
        },
        submit: function(evt) {
            // confirm matches prior to submitting to prevent user
            // from submitting without typing anything in the confirmation fields
            this.confirmAllMatches()
            .then(res => {
            if (this.checkErrors === false) {
                localforage.getItem("X_TOKEN")
                .then(session => {
                    let name = this.getUpdated(
                        this.editFields.name, 
                        this.profile.name, 
                        this.sessionInfo.name
                    );
                    let phone = this.getUpdated(
                        this.editFields.phone,
                        this.profile.phone,
                        this.sessionInfo.phone
                    );
                    let email = this.getUpdated(
                        this.editFields.email, 
                        this.profile.email, 
                        this.sessionInfo.email
                    );
                    let password = this.getUpdated(
                        this.editFields.password, 
                        this.profile.password, 
                        this.profile.password
                    );
                    let address1 = this.getUpdated(
                        this.editFields.address, 
                        this.profile.address1, 
                        this.sessionInfo.address1
                    );
                    let address2 = this.getUpdated(
                        this.editFields.address, 
                        this.profile.address2, 
                        this.sessionInfo.address2
                    );
                    let city = this.getUpdated(
                        this.editFields.address, 
                        this.profile.city, 
                        this.sessionInfo.city
                    );
                    let state = this.getUpdated(
                        this.editFields.address, 
                        this.profile.state, 
                        this.sessionInfo.state
                    );
                    let country = this.getUpdated(
                        this.editFields.address, 
                        this.profile.country, 
                        this.sessionInfo.country
                    );
                    let zip = this.getUpdated(
                        this.editFields.zipCode,
                        this.profile.zipCode,
                        this.sessionInfo.zipCode
                    );

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
            if (this.editFields.address) {
                if (  this.invalidFields.address1 === true ||
                    this.invalidFields.address2 === true ||
                    this.invalidFields.city === true ||
                    this.invalidFields.state === true ||
                    this.invalidFields.country === true ||
                    this.invalidFields.zipCode === true ) {
                return true;
                }
            }
            if (this.editFields.phone) {
                if (  this.invalidFields.phone === true ) {
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
        // debounce will wait a period of time before running the confirmation validators
        // this will permit time for the user to finish typing
        this.confirmEmail = _.debounce(this.debouncedConfirmEmail, 1000);
        this.confirmPassword = _.debounce(this.debouncedConfirmPassword, 1000);
    },
    mounted: function() {
        // set flag to indicate input components have loaded
        setTimeout(() => {
        this.setup = true;
        }, 3000);
    }
}
</script>

<style scoped>
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
.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
</style>
