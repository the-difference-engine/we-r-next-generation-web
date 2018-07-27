<template>
<div :class="$mq" class="container mx-auto small-screen">
    <h1 class="big">Add a New Camp Session</h1>
    <hr>
    <div class="row mx-0 px-0">
        <div class="col-md-8 mx-0 px-0">
            <form v-on:submit.prevent="campCreate" class="form mx-0 px-0">
                <input-row label="Camp Name" type="text"
                    :small="true"
                    v-model="newCamp.name"
                    placeholder="Name of the Camp Session"
                    :min-length="2"
                    :max-length="100"
                    help-text="This name will appear in all camp selection options"
                    v-on:invalid="invalidFields.name = $event"
                ></input-row>
                <input-row label="Description" type="textarea"
                    :small="true"
                    v-model="newCamp.description"
                    placeholder="Describe the activities or purpose of this camp"
                    :required="false"
                    :max-length="100"
                    v-on:invalid="invalidFields.description = $event"
                ></input-row>
                <input-row label="Point of Contact" type="text"
                    :small="true"
                    v-model="newCamp.poc"
                    placeholder="Main contact for the camp"
                    :required="false"
                    :max-length="100"
                    v-on:invalid="invalidFields.poc = $event"
                ></input-row>
                <div class="form-group row">
                    <div class="col-md-6">
                        <input-row label="Start Date" type="date"
                            :small="true"
                            v-model="newCamp.date_start"
                            :default-value="todayString"
                            :min-date="yesterdayDate"
                            v-on:input="updateMinDate($event)"
                            v-on:invalid="invalidFields.date_start = $event"
                        ></input-row>
                    </div>
                    <div class="col-md-6">
                        <input-row label="End Date" type="date"
                            :small="true"
                            v-model="newCamp.date_end"
                            :default-value="calcOneWeekString"
                            :min-date="minDate"
                            v-on:invalid="invalidFields.date_end = $event"
                        ></input-row>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-6">
                        <input-row label="Camper Limit" type="number"
                            :small="true"
                            v-model="newCamp.limit"
                            :min-num="0"
                            v-on:invalid="invalidFields.limit = $event"
                        ></input-row>
                    </div>
                    <div class="col-md-6">
                        <input-row label="Camp Status" type="select"
                            :small="true"
                            v-model="newCamp.status"
                            :choices="statusOptions"
                            :default-value="statusOptions[0].value"
                            v-on:invalid="invalidFields.status = $event"
                        ></input-row>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="row col-xs-12 my-2 text-right">
                        <button 
                            :disabled="formInvalid || formIncomplete" 
                            type="submit" 
                            class="btn btn-primary px-3"
                            >Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-4 col-xs-12 px-1">
            <div class="row my-2">
                <button class="btn col-md-8 col-xs-10 mx-auto" 
                    v-bind:class="{ 
                        'btn-warning': viewPastCamps, 
                        'btn-primary': !viewPastCamps }"
                    aria-expanded="false" 
                    aria-controls="pastCamps"
                    v-on:click.stop.prevent="togglePastCamps"
                    >{{viewPastBtn}}
                </button>
            </div>
            <div class="row my-2">
                <button class="btn col-md-8 col-xs-10 mx-auto" 
                    v-bind:class="{ 
                        'btn-warning': viewFutureCamps, 
                        'btn-primary': !viewFutureCamps }"
                    aria-expanded="false" 
                    aria-controls="futureCamps"
                    v-on:click.stop.prevent="toggleFutureCamps"
                    >{{viewFutureBtn}}
                </button>
            </div>
            <hr class="my-8">
            <div v-if="viewFutureCamps">
                <h4 class="mx-auto"><strong>Upcoming Camps</strong></h4>
                <table class="table table-bordered table-hover table-condensed">
                    <thead class="thead-light">
                        <tr>
                            <th class="text-center">Name</th>
                            <th class="text-center">Start</th>
                            <th class="text-center">End</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="camp in futureCamps" v-bind:key="camp._id.$oid">
                            <td class="text-left">
                                <router-link :to="{ name: 'ViewCamp', params: { id: camp._id.$oid } }">
                                    {{camp.name}}
                                </router-link>
                            </td>
                            <td>{{camp.date_start}}</td>
                            <td>{{camp.date_end}}</td>
                        </tr>
                        <tr v-if="futureCamps.length === 0">
                            <td colspan="3" class="font-weight-bold">No Future Camps Scheduled</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="viewPastCamps">
                <h4 class="mx-auto"><strong>Past Camps</strong></h4>
                <table class="table table-bordered table-hover table-condensed">
                    <thead class="thead-light">
                        <tr>
                            <th class="text-center">Name</th>
                            <th class="text-center">Start</th>
                            <th class="text-center">End</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="camp in pastCamps" v-bind:key="camp._id.$oid">
                            <td class="text-left">
                                <router-link :to="{ name: 'ViewCamp', params: { id: camp._id.$oid } }">
                                    {{camp.name}}
                                </router-link>
                            </td>
                            <td>{{camp.date_start}}</td>
                            <td>{{camp.date_end}}</td>
                        </tr>
                        <tr v-if="pastCamps.length === 0">
                            <td colspan="3" class="font-weight-bold">No Past Camps on Record</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import inputRow from './forms/inputRow.vue';
    import _ from 'lodash';
    export default {
        name: 'adminCampCreate',
        components: {
            inputRow
        },
        data () {
            return {
                defaultCampLength: 5,
                newCamp: {
                    name: '',
                    date_start: '',
                    date_end: '',
                    description: '',
                    poc: '',
                    limit: 10,
                    status: 'Active',
                    created_by: '',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                invalidFields: {
                    name: false,
                    date_start: false,
                    date_end: false,
                    description: false,
                    poc: false,
                    limit: false,
                    status: false,
                },
                notRequiredFields: [
                    'description',
                    'poc',
                    'created_by',
                ],
                statusOptions: [
                    { value: 'Active', text: 'Active' },
                    { value: 'Tentative', text: 'Tentative' },
                    { value: 'Cancelled', text: 'Cancelled' },
                    { value: 'Not Active', text: 'Not Active' },
                ],
                allCamps: [],
                viewPastCamps: false,
                viewFutureCamps: true,
            }
        },
        methods: {
            campCreate: function(evt) {
                this.$store.dispatch('campSessionCreate', {
                newCamp: this.newCamp,
                router: this.$router,
                })
            },
            sortedAscCamps: function(camps) {
                return _.sortBy(camps, [function(camp) { return camp.date_start; }]);
            },
            reverseCamps: function(camps) {
                return _.reverse(camps);
            },
            getCamps: function() {
                this.$store.dispatch('campSessionsGetAll', {
                field_name: "date_start",
                order: "DESC"
                })
                .then(data => {
                    this.allCamps = this.sortedAscCamps(data);
                })
            },
            dateToString: function(dt) {
                return dt.toISOString().slice(0,10);
            },
            oneWeekDate: function() {
                // Auto-generate a default camp end date based on a default camp length
                let oneweek = new Date();
                oneweek.setDate(oneweek.getDate() + this.defaultCampLength);
                return oneweek;
            },
            oneWeekString: function() {
                let dt = this.oneWeekDate();
                return this.dateToString(dt);
            },
            updateMinDate: function(startDate) {
                this.newCamp.date_start = startDate;
                let startDt = new Date(startDate);
                let endDt = new Date(this.newCamp.date_end);
                if (endDt < startDt) {
                    this.newCamp.date_end = this.dateToString(startDt);
                }
            },
            togglePastCamps: function() {
                this.viewPastCamps = !this.viewPastCamps;
            },
            toggleFutureCamps: function() {
                this.viewFutureCamps = !this.viewFutureCamps;
            },
        },
        computed: {
            formInvalid: function() {
                let invalid = false;
                for (let field in this.invalidFields) {
                    if (this.invalidFields[field] == true) {
                        invalid = true;
                        break;
                    }
                }
                return invalid;
            },
            formIncomplete: function() {
                let incomplete = false;
                for (let field in this.newCamp) {
                    if (!this.notRequiredFields.includes(field)) {
                        if (this.newCamp[field] == '' || this.newCamp[field] == null) {
                            incomplete = true;
                            break;
                        }
                    }
                }
                return incomplete;
            },
            yesterdayDate: function() {
                let dt = new Date();
                dt.setDate(dt.getDate() - 1);
                return dt;
            },
            todayDate: function() {
                let dt = new Date();
                return dt;
            },
            todayString: function() {
                let dt = new Date();
                return this.dateToString(dt);
            },
            minDate: function() {
                let dt = new Date(this.newCamp.date_start);
                return dt;
            },
            calcOneWeekString: function() {
                return this.oneWeekString();
            },
            futureCamps: function() {
                let today = new Date();
                return _.filter(this.allCamps, function(camp) {
                    let dt = new Date(camp.date_start);
                    if (dt > today) { return true } else { return false }
                });
            },
            pastCamps: function() {
                let today = new Date();
                let camps = _.filter(this.allCamps, function(camp) {
                    let dt = new Date(camp.date_start);
                    if (dt <= today) { return true } else { return false }
                });
                return this.reverseCamps(camps);
            },
            viewPastBtn: function() {
                if (this.viewPastCamps == false) { 
                    return "View Past Camp Sessions";
                } else { return "Hide Past Camps" }
            },
            viewFutureBtn: function() {
                if (this.viewFutureCamps == false) { 
                    return "View Future Camp Sessions";
                } else { return "Hide Future Camps" }
            },
        },
        created: function() {
            this.getCamps();
        },
        beforeMount: function() {
            this.newCamp.date_start = this.dateToString(new Date());
            this.newCamp.date_end = this.oneWeekString();
        }
    }


</script>

<style scoped>
    .small-screen.mobile,
    .small-screen.tablet {
        margin: auto 10px;
        padding: auto 0px;
    }
</style>
