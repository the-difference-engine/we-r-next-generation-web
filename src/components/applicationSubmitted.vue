<template>
  <div class="container mx-auto my-4">
    <div class="row col-sm-12">
      <h1>Thank you for your Application</h1>
      <div class="row col-sm-12 my-4 text-left">
        <p>Your application submitted successfully. Our staff and leadership team will review your application and contact you about next steps or if we need any further information.</p>
        <p v-if="typeCap !== 'Partner'">Please print and save a copy of the signed waiver for your records.</p>
      </div>
      <div class="col-sm-12 my-4 waiver">
        <h3>
            {{typeCap}} Application for 
            <span v-if="typeCap === 'Camper'">{{childNameCap}}</span>
            <span v-if="typeCap === 'Volunteer'">{{fullNameCap}}</span>
            <span v-if="typeCap === 'Partner'">{{application.companyName}}</span>
        </h3>
        <div class="row mx-0 px-0 mt-10">
            <div class="col-md-6 col-xs-12">
                <div class="panel panel-default">
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td class="font-weight-bold text-right">Current Status</td>
                                <td :class="application.status" class="status text-center">{{statusCap}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right" colspan="2">
                                    <small>*Application signed on {{application.date_signed}}</small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="panel panel-default">
                    <table v-if="typeCap === 'Camper'" class="table table-bordered table-hover">
                        <thead>
                            <tr class="bg-bblue">
                                <th class="text-center" colspan="2">Child Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-weight-bold text-right">Age</td>
                                <td>{{application.age}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right">Gender</td>
                                <td>{{application.gender}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="panel panel-default">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr class="bg-bblue">
                                <th v-if="typeCap === 'Camper'" class="text-center" colspan="2">
                                    How would this child benefit from the camp?
                                </th>
                                <th v-if="typeCap === 'Volunteer'" class="text-center" colspan="2">
                                    Volunteer Short Biography
                                </th>
                                <th v-if="typeCap === 'Partner'" class="text-center" colspan="2">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="typeCap != 'Partner'">
                            <tr>
                                <td colspan="2" class="text-left px-2">{{application.bio}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right">Selected Camp</td>
                                <td>{{campName}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td class="col-xs-4 col-sm-3 font-weight-bold text-right">Website</td>
                                <td>{{application.companyUrl}}</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center px-2">{{application.companyLogo}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-6 col-xs-12">
                <div class="panel panel-default">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr class="bg-bblue">
                                <th class="text-center" colspan="2">Contact Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-weight-bold text-right">Email</td>
                                <td class="text-left">{{emailLower}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right">Phone Number</td>
                                <td class="text-left">{{application.phone_number}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right">Street Address</td>
                                <td class="text-left">{{application.address_line_1}}</td>
                            </tr>
                            <tr v-if="application.address_line_2 != ''">
                                <td class="font-weight-bold text-right">Address Line 2</td>
                                <td class="text-left">{{application.address_line_2}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right">City</td>
                                <td class="text-left">{{application.city}}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold text-right">State/Country</td>
                                <td class="text-left">{{application.state_province}}, {{countryName}} ({{application.zip_code}})</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
      <div class="col-sm-12 my-4 waiver">
        <span v-if="typeCap != 'Partner'" v-html="waiver"></span>
        <div v-else>
            <div class="panel panel-default">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="bg-bblue">
                            <th class="text-center">Company Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-left">{{application.bio}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="panel panel-default">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="bg-bblue">
                            <th class="text-center">Application Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-left">{{application.appNote}}</td>
                        </tr>
                    </tbody>
                </table>



            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from '../sessionUtils'
import axios from "axios";
export default {
	name: "applicationSubmitted",
	data() {
		return {
            waiver: '',
            appId: '',
            application: {},
            camp: {},
            countryName: '',
		};
    },
    methods: {
        capAppKey: function(key_name) {
            if (key_name in this.application) {
                return this.capWord(this.application[key_name])
            } else { return '' }
        },
        capWord: function(word) {
            word = word.replace('_', ' ');
            return word[0].toUpperCase() + word.slice(1);
        },
        getCountryName: function() {
            this.$store.dispatch('getCountryNameFromKey', this.application.country)
            .then(name => {
                this.countryName = name;
            })
        },
        setWaiver: function(response) {
            return (response.waiver.hasOwnProperty('waiver_form')) ? response.waiver.waiver_form : ''
        },
    },
    computed: {
        typeCap: function() {
            return this.capAppKey('type');
        },
        childNameCap: function() {
            return this.capAppKey('childName');
        },
        fullNameCap: function() {
            if ('full_name' in this.application) {
                let names = this.application.full_name.split(" ");
                for (name in names) {
                    names[name] = this.capWord(names[name]);
                }
                return names.join(" ");
            } else { return '' }
        },
        statusCap: function() {
            return this.capAppKey('status');
        },
        campName: function() {
            return this.camp.name + " (" + this.camp.date_start + " to " + this.camp.date_end + ")";
        },
        emailLower: function() {
            if ('email' in this.application) {
                return this.application.email.toLowerCase();
            }
        },
    },
    created: function() {
		let application_id = this.$route.params.id;
        localforage.getItem('X_TOKEN')
        .then(session => {
            axios.get('/api/v1/applications/' + application_id + '/waiver', {
                    'headers': { 'x-token': session }
                })
                .then(response => {
                    this.application = response.data.application;
                    this.waiver = this.setWaiver(response.data);
                    this.camp = this.application.camp_data;
                    this.getCountryName();
                })
                .catch()
        })
        .catch()
    },
};
</script>

<style>
    table > tbody > tr > td {
        vertical-align: top !important;
        padding-top: 1em !important;
        padding-bottom: 1em !important;
    }
</style>

<style scoped>
	.container {
		margin-bottom: 30px !important;
	}
	.waiver{
		padding: 25px;
		border: 2px solid gray;
	}
    .status {
        font-weight: bolder;
        border-width: 1px !important;
        color: white;
    }
    .submitted {
        background-color: var(--brand-bblue);
        border-color: var(--brand-sea-green-16);
    }
    .pending {
        background-color: var(--brand-warning);
        border-color: darkslategrey;
    }
    .approved {
        background-color: var(--brand-success);
        border-color: var(--brand-sea-green-16);
    }
    .not_approved {
        background-color: var(--brand-danger);
        border-color: darkslategrey;
    }
</style>
