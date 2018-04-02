<template>
<div class="container">
    <div class="row mx-0">
        <h1 class="big">
            Camp Session
        </h1>
    </div>
    <hr>
    {{get_camp}}
    {{get_applicants}}
    <div class="row">
        <div v-bind:class="{'col-md-12':!applicants.length,'col-md-8':applicants.length}">
            <div class="row mx-0 my-3">
                <button class="float-right btn btn-warning" v-on:click="editCamp">{{edit_btn}}</button>
            </div>
            <div class="row mx-0 my-3">
                <form v-on:submit.prevent="campUpdate" id="camp-create">
                    <div class="form-group row">
                        <label class="col-md-2 col-form-label text-right">Name</label>
                        <div class="col-md-10">
                            <input :readonly="disable_edits" type="text" class="form-control" v-model="camp.name" v-bind:placeholder="placeholders.name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-2 col-form-label text-right">Description</label>
                        <div class="col-md-10">
                            <textarea :readonly="disable_edits" rows="2" class="form-control" v-model="camp.description" v-bind:placeholder="placeholders.description"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-2 col-form-label text-right">Point of Contact</label>
                        <div class="col-md-10">
                            <input :readonly="disable_edits" type="text" class="form-control" v-model="camp.poc" v-bind:placeholder="placeholders.poc">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2"></div>
                        <div class="col-md-5">
                            <label class="col-md-4 col-form-label col-form-label-sm text-right">Start Date</label>
                            <div class="col-md-8 px-0">
                                <input :readonly="disable_edits" type="date" class="form-control" v-model="camp.date_start">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <label class="col-md-4 col-form-label col-form-label-sm text-right">End Date</label>
                            <div class="col-md-8 px-0">
                                <input :readonly="disable_edits" type="date" class="form-control" v-model="camp.date_end" v-bind:min="camp.date_start">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2"></div>
                        <div class="col-md-5">
                            <label class="col-md-4 col-form-label col-form-label-sm text-right">Camper Limit</label>
                            <div class="col-md-8 px-0">
                                <input :readonly="disable_edits" type="number" class="form-control" v-model="camp.limit">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <label class="col-md-4 col-form-label col-form-label-sm text-right">Status</label>
                            <div class="col-md-8 px-0">
                                <select :disabled="disable_edits" class="form-control" v-model="camp.status">
                                    <option v-for="opt in status_options" :value="opt">{{opt}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="form-group row">
                        <div class="col-md-12 text-right">
                            <button :disabled="disable_edits" type="submit" class="btn btn-primary">Save & Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-4">
            <div class="row mx-0 my-3" v-if="applicants.length">
                <button class="float-right btn btn-warning" v-on:click="downloadCSV">Download CSV</button>
            </div>
            <div class="row mx-0 my-3" v-if="applicants.length">
                <div class="col-md-12">
                    <h4 class="mx-auto"><strong><u>Applicants</u></strong></h4>
                    <table class="table table-striped">
                        <thead class="thead-light">
                            <th class="text-center">Name</th>
                            <th class="text-center">Type</th>
                            <th class="text-center">Status</th>
                        </thead>
                        <tr v-for="app in notapproved_applicants">
                            <td>{{app.full_name}}</td>
                            <td>{{app.type}}</td>
                            <td>{{app.status}}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-12">
                    <h4 class="mx-auto"><strong><u>Approved</u></strong></h4>
                    <table class="table table-striped">
                        <thead class="thead-light">
                            <th class="text-center">Name</th>
                            <th class="text-center">Type</th>
                            <th class="text-center">Status</th>
                        </thead>
                        <tr v-for="app in approved_applicants">
                            <td>{{app.full_name}}</td>
                            <td>{{app.type}}</td>
                            <td>{{app.status}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    // Auto-generate a default camp end date based on a default camp lenght
    var defaultLength = 5;
    var oneweek = new Date();
    oneweek.setDate(oneweek.getDate() + defaultLength);

    export default {
        name: 'campex_single',
        methods: {
            campUpdate: function(evt) {
                console.log("Camp Update Method");
                this.$store.dispatch('campSessionUpdate', {
                    updated_camp: this.camp,
                    camp_id: this.camp_id,
                    router: this.$router,
                    that: this
                })
                this.editCamp();
            },
            campGet: function() {
                console.log("Get Camp Method");
                this.$store.dispatch('campSessionGet', {
                    camp_id: this.$route.params.id,
                })
                .then(data => {
                    console.log("Received camp data", data)
                    this.camp = data;
                    this.camp_id = this.camp._id.$oid
                    console.log("Camp Now:", this.camp);
                })
            },
            applicantsGet: function() {
                console.log("Get Applicants Method");
                this.$store.dispatch('campSessionGetApplicants', {
                    camp_id: this.$route.params.id,
                })
                .then(data => {
                    console.log("Received applicant data", data)
                    this.applicants = data;
                })
            },
            editCamp: function() {
                console.log("Edit Camp Method");
                this.disable_edits = !this.disable_edits;
                if (this.edit_btn == "Edit") {
                    this.edit_btn = "Disable Edit";
                }
                else {
                    this.edit_btn = "Edit";
                }
            },
            downloadCSV: function() {
                console.log("DOWNLOAD Method");

                var data, filename, link;
                var csv = this.csv_delimited_applicants;
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

            }
        },
        data () {
            return {
                camp_id: '',
                camp: {
                    name: '',
                    date_start: new Date().toISOString().slice(0,10),
                    date_end: oneweek.toISOString().slice(0,10),
                    description: '',
                    poc: '',
                    limit: 10,
                    status: '',
                    created_by: '',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                applicants: [],
                placeholders: {
                    name: "Name this camp session",
                    description: "Describe this camp",
                    poc: "Main contact for the camp",
                },
                status_options: [
                    'Active',
                    'Tentative',
                    'Cancelled',
                    'Not Active'
                ],
                disable_edits: true,
                edit_btn: "Edit"
            }
        },
        computed: {
            get_camp: function() {
                return this.campGet();
            },
            get_applicants: function() {
                return this.applicantsGet();
            },
            approved_applicants: function() {
                return this.applicants.filter( app => app.status == "approved" )
            },
            notapproved_applicants: function() {
                return this.applicants.filter( app => app.status != "approved" )
            },
            csv_delimited_applicants: function() {
                var result, ctr, keys, columnDelimiter, lineDelimiter, data;

                data = this.applicants || null;
                if (data == null || !data.length) {
                    return null;
                }

                columnDelimiter = ',';
                lineDelimiter = '\n';
                
                // use this line for all keys in object
                // keys = Object.keys(data[0]);
                
                // defined set of keys
                keys = [
                    'full_name',
                    'type',
                    'date_signed',
                    'address_line_1',
                    'address_line_2',
                    'city',
                    'state_province',
                    'zip_code',
                    'country',
                    'email',
                    'phone_number',
                    'childName',
                    'age',
                    'gender'
                ]

                result = '';
                result += keys.join(columnDelimiter);
                result += lineDelimiter;

                data.forEach(function(item) {
                    ctr = 0;
                    keys.forEach(function(key) {
                        if (ctr > 0) result += columnDelimiter;

                        result += item[key];
                        ctr++;
                    });
                    result += lineDelimiter;
                });

                return result;
            },
        }
    }


</script>

<style scoped>

</style>
