<template>
    <div class="container-fluid mx-0 px-0">
        <div class="row mx-0 my-4" v-if="applicants.length == 0">
            <h4>There are no applicants for this camp session.</h4>
        </div>
        <div class="row mx-0 my-4 text-right" v-if="applicants.length">
            <button class="btn btn-warning" v-on:click="downloadCSV">Download CSV</button>
        </div>
        <div class="row mx-0 my-3" v-if="applicants.length">
            <div v-if="approvedCampers.length > 0 || notApprCampers.length > 0"
                class="col-md-12 mx-0 px-0">
                <div class="row my-4 mx-0 px-0 bg-primary">
                    <h4 class="mx-auto my-2">
                        <strong><u>Campers</u></strong>
                        <span class="badge bg-bblue mx-3 px-1 float-right">{{numberCampers}}</span>
                    </h4>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered mx-0 px-0">
                        <thead class="thead-light">
                            <th class="text-center">Name</th>
                            <th class="text-center">Age/Gender</th>
                            <th class="text-center">Parent</th>
                            <th class="text-center">Status</th>
                        </thead>
                        <tbody>
                            <tr v-if="approvedCampers.length > 0">
                                <th colspan="4" class="bg-primary py-0">
                                    <span class="font-weight-bold">
                                        <small>Approved</small>
                                        <span class="badge bg-primary px-1 float-right"><small>{{numApprovedCampers}}</small></span>
                                    </span>
                                </th>
                            </tr>
                            <tr v-for="app in approvedCampers"
                                v-bind:key="app._id.$oid">
                                <td>
                                    <router-link :to="{ name: 'adminApp', params: { id: app._id.$oid } }">
                                        {{app.childName}}
                                    </router-link>
                                </td>
                                <td>{{ app.age }} / {{ app.gender | appGender }}</td>
                                <td>{{ app.full_name }}</td>
                                <td>{{ app.status | appStatus }}</td>
                            </tr>
                            <tr v-if="notApprCampers.length > 0">
                                <th colspan="4" class="bg-warning py-0">
                                    <span class="font-weight-bold">
                                        <small>Not Approved</small>
                                        <span class="badge bg-warning px-1 float-right"><small>{{numNotApprovedCampers}}</small></span>
                                    </span>
                                </th>
                            </tr>
                            <tr v-for="app in notApprCampers"
                                v-bind:key="app._id.$oid">
                                <td>
                                    <router-link :to="{ name: 'adminApp', params: { id: app._id.$oid } }">
                                        {{app.childName}}
                                    </router-link>
                                </td>
                                <td>{{ app.age }} / {{ app.gender | appGender }}</td>
                                <td>{{ app.full_name }}</td>
                                <td>{{ app.status | appStatus }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr v-if="
                ( approvedCampers.length > 0 || notApprCampers.length > 0 )
                &&
                ( approvedVolunteers.length > 0 || notApprVolunteers.length > 0 )
            ">
            <div v-if="approvedVolunteers.length > 0 || notApprVolunteers.length > 0"
                class="col-md-12 mx-0 px-0">
                <div class="row my-4 mx-0 px-0 bg-primary">
                    <h4 class="mx-auto my-2">
                        <strong><u>Volunteers</u></strong>
                        <span class="badge bg-bblue mx-3 px-1">{{numberVolunteers}}</span>
                    </h4>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered col-xs-12 mx-0 px-0">
                        <thead class="thead-light">
                            <th class="text-center">Name</th>
                            <th class="text-center">City/Country</th>
                            <th class="text-center">Status</th>
                        </thead>
                        <tbody>
                            <tr v-if="approvedVolunteers.length > 0">
                                <th colspan="3" class="bg-primary py-0">
                                    <span class="font-weight-bold">
                                        <small>Approved</small>
                                        <span class="badge bg-primary px-1 float-right"><small>{{numApprovedVols}}</small></span>
                                    </span>
                                </th>
                            </tr>
                            <tr v-for="app in approvedVolunteers"
                                v-bind:key="app._id.$oid">
                                <td>
                                    <router-link :to="{ name: 'adminApp', params: { id: app._id.$oid } }">
                                        {{app.full_name}}
                                    </router-link>
                                </td>
                                <td>{{ app.city }} / {{ app.country | appGender }}</td>
                                <td>{{ app.status | appStatus }}</td>
                            </tr>
                            <tr v-if="notApprVolunteers.length > 0">
                                <th colspan="3" class="bg-warning py-0">
                                    <span class="font-weight-bold">
                                        <small>Not Approved</small>
                                        <span class="badge bg-warning px-1 float-right"><small>{{numNotApprovedVols}}</small></span>
                                    </span>
                                </th>
                            </tr>
                            <tr v-for="app in notApprVolunteers"
                                v-bind:key="app._id.$oid">
                                <td>
                                    <router-link :to="{ name: 'adminApp', params: { id: app._id.$oid } }">
                                        {{app.full_name}}
                                    </router-link>
                                </td>
                                <td>{{ app.city }} / {{ app.country | appGender }}</td>
                                <td>{{ app.status | appStatus }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
export default {
    name: 'adminCampersOfCamp',
    props: {
        routeChanging: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            applicants: [],
            applicantKeys: [
                {
                    label: 'Child Name',
                    key: 'childName'
                },
                {
                    label: "Child's Age",
                    key: 'age'
                },
                {
                    label: "Child's Gender",
                    key: 'gender'
                },
                {
                    label: 'Parent/Guardian',
                    key: 'full_name'
                },
                {
                    label: 'Application Type',
                    key: 'type'
                },
                {
                    label: 'Date Signed',
                    key: 'date_signed'
                },
                {
                    label: 'Address Line 1',
                    key: 'address_line_1'
                },
                {
                    label: 'Address Line 2',
                    key: 'address_line_2'
                },
                {
                    label: 'City',
                    key: 'city'
                },
                {
                    label: 'State/Province',
                    key: 'state_province'
                },
                {
                    label: 'Postal Code',
                    key: 'zip_code'
                },
                {
                    label: 'Country',
                    key: 'country'
                },
                {
                    label: 'Email',
                    key: 'email'
                },
                {
                    label: 'Phone Number',
                    key: 'phone_number'
                },
            ],

        }
    },
    filters: {
        appGender(value) {
            if (value !== undefined) {
                return value.charAt(0).toUpperCase();
            } else { return null }
        },
        appType(value) {
            if (value !== undefined) {
                let applicationTypes = {
                    'camper': 'Camper',
                    'volunteer': 'Volunteer',
                    'partner': 'Partner'
                }
                return applicationTypes[value];
            } else { return null }
        },
        appStatus(value) {
            if (value !== undefined) {
                let applicationStatus = {
                    'submitted': 'Submitted',
                    'pending': 'Pending',
                    'approved': 'Approved',
                    'not_approved': 'Not Approved'
                }
                return applicationStatus[value];
            } else { return null }
        }
    },
    watch: {
        routeChanging: function(val) {
            if (val == true) {
                this.getApplicants();
            }
        },
    },
    methods: {
        getApplicants: function() {
            this.$store.dispatch('campSessionGetApplicants', {
                camp_id: this.$route.params.id,
            })
            .then(data => {
                this.applicants = data;
            })
        },
        downloadCSV: function() {
            let data, filename, link;
            let csv = this.csvDelimitedApplicants();
            if (csv == null) return;

            filename = 'export.csv';
            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        },
        csvDelimitedApplicants: function() {
            let data = this.applicants || null;
            if (data == null || !data.length) {
                return null;
            }
            let columnDelimiter = ',';
            let lineDelimiter = '\n';

            let result = '';
            result += this.applicantKeys.map(o => o.label).join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(item => {
                let ctr = 0;
                this.applicantKeys.forEach(function(keyObj) {
                    if (ctr > 0) result += columnDelimiter;
                    result += item[keyObj.key];
                    ctr++;
                });
                result += lineDelimiter;
            });
            return result;
        },
    },
    computed: {
        approvedCampers: function() {
            return _.orderBy(
                this.applicants.filter( app => 
                    app.type == "camper" && app.status == 'approved' 
                ), 'childName'
            );
        },
        notApprCampers: function() {
            return _.orderBy(
                this.applicants.filter( app => 
                    app.type == "camper" && app.status != 'approved' 
                ), 'childName'
            );
        },
        approvedVolunteers: function() {
            return _.orderBy(
                this.applicants.filter( app => 
                    app.type == "volunteer" && app.status == 'approved' 
                ), 'full_name'
            );
        },
        notApprVolunteers: function() {
            return _.orderBy(
                this.applicants.filter( app => 
                    app.type == "volunteer" && app.status != 'approved' 
                ), 'full_name'
            );
        },
        numberCampers: function() {
            return _.size(
                this.applicants.filter( app =>
                    app.type == 'camper'
                )
            );
        },
        numApprovedCampers: function() {
            return _.size(
                this.applicants.filter( app =>
                    app.type == 'camper' && app.status == 'approved'
                )
            );
        },
        numNotApprovedCampers: function() {
            return _.size(
                this.applicants.filter( app =>
                    app.type == 'camper' && app.status != 'approved'
                )
            );
        },
        numberVolunteers: function() {
            return _.size(
                this.applicants.filter( app =>
                    app.type == 'volunteer'
                )
            );
        },
        numApprovedVols: function() {
            return _.size(
                this.applicants.filter( app =>
                    app.type == 'volunteer' && app.status == 'approved'
                )
            );
        },
        numNotApprovedVols: function() {
            return _.size(
                this.applicants.filter( app =>
                    app.type == 'volunteer' && app.status != 'approved'
                )
            );
        },
    },
    created: function() {
        this.getApplicants();
    },
}
</script>

