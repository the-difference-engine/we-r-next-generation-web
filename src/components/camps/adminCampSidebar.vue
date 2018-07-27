<template>
    <div class="container-fluid mx-0 px-0">
        <div class="row mx-0 text-right">
            <a class="closebtn" v-on:click.prevent="toggleCamps">&times;
            </a>
        </div>
        <div v-on:click.stop.prevent="toggleFutureCamps" class="hover-blue row my-4 mx-0 px-0 bg-primary">
            <h4 class="font-weight-bold px-1">
                <span v-if="viewFutureCamps" class="glyphicon glyphicon-triangle-bottom float-left"></span>
                <span v-if="!viewFutureCamps" class="glyphicon glyphicon-triangle-top float-left"></span>
                <u>Upcoming Camps</u>
                <span class="mx-2 glyphicon glyphicon-sort-by-alphabet"></span>
                <span class="badge bg-bblue px-1 float-right">{{numFutureCamps}}</span>
            </h4>
        </div>
        <div v-if="viewFutureCamps">
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
                            <router-link :to="{ name: 'campEdit', params: { id: camp._id.$oid } }">
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
        <hr v-if="viewPastCamps && viewFutureCamps" class="my-8">
        <div v-on:click.stop.prevent="togglePastCamps" class="hover-blue row my-4 mx-0 px-0 bg-primary">
            <h4 class="font-weight-bold px-1">
                <span v-if="viewPastCamps" class="glyphicon glyphicon-triangle-bottom float-left"></span>
                <span v-if="!viewPastCamps" class="glyphicon glyphicon-triangle-top float-left"></span>
                Past Camps
                <span class="mx-2 glyphicon glyphicon-sort-by-alphabet-alt"></span>
                <span class="badge bg-bblue px-1 float-right">{{numPastCamps}}</span>
            </h4>
        </div>
        <div v-if="viewPastCamps">
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
                            <router-link :to="{ name: 'campEdit', params: { id: camp._id.$oid } }">
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
</template>
<script>
import _ from 'lodash';
export default {
    name: 'adminCampSidebar',
    props: {
        routeChanged: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            allCamps: [],
            viewPastCamps: false,
            viewFutureCamps: true,
        }
    },
    watch: {
        routeChanged: function(value) {
            if (value === true) {
                this.getCamps();
            }
        },
    },
    methods: {
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
        togglePastCamps: function() {
            this.viewPastCamps = !this.viewPastCamps;
            this.$emit('campFrameResize');
        },
        toggleFutureCamps: function() {
            this.viewFutureCamps = !this.viewFutureCamps;
            this.$emit('campFrameResize');
        },
        toggleCamps: function() {
            this.$emit('toggleCamps');
        },
        getFutureCamps: function() {
            let today = new Date();
            return _.filter(this.allCamps, function(camp) {
                let dt = new Date(camp.date_start);
                if (dt > today) { return true } else { return false }
            });
        },
        getPastCamps: function() {
            let today = new Date();
            let camps = _.filter(this.allCamps, function(camp) {
                let dt = new Date(camp.date_start);
                if (dt <= today) { return true } else { return false }
            });
            return this.reverseCamps(camps);
        }
    },
    computed: {
        futureCamps: function() {
            return this.getFutureCamps();
        },
        pastCamps: function() {
            return this.getPastCamps();
        },
        viewPastBtn: function() {
            if (this.viewPastCamps == false) { 
                return "View Past Camps";
            } else { return "Hide Past Camps" }
        },
        viewFutureBtn: function() {
            if (this.viewFutureCamps == false) { 
                return "View Upcoming Camps";
            } else { return "Hide Upcoming Camps" }
        },
        numFutureCamps: function() {
            return _.size(
                this.getFutureCamps()
            );
        },
        numPastCamps: function() {
            return _.size(
                this.getPastCamps()
            );
        },
    },
    created: function() {
        this.getCamps();
    }
}
</script>

<style scoped>
    .table>thead {
        background-color: var(--brand-bblue) !important;
        color: white !important;
    }
    .table-hover>tbody>tr:hover,
    .table-hover>tbody>tr:hover a {
        background-color: var(--brand-bblue) !important;
        color: white !important;
        font-weight: bold;
    }

    .closebtn {
        font-size: 38px !important;
    }
    .hover-blue:hover {
        background-color: var(--brand-primary-fade-8) !important;
    }
</style>

