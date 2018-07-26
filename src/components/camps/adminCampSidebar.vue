<template>
    <div class="container-fluid mx-0 px-0">
        <div class="row mx-0 text-right">
            <a class="closebtn" v-on:click.prevent="toggleCamps">&times;
            </a>
        </div>
        <div class="row mx-0 my-2">
            <button class="btn badge col-md-8 col-xs-10 mx-auto" 
                v-bind:class="{ 
                    'btn-warning': viewPastCamps, 
                    'btn-bblue': !viewPastCamps }"
                aria-expanded="false" 
                aria-controls="pastCamps"
                v-on:click.stop.prevent="togglePastCamps">
                <span v-if="!viewPastCamps" class="mx-4 glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                <span v-if="viewPastCamps" class="mx-4 glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                {{viewPastBtn}}
            </button>
        </div>
        <div class="row mx-0 my-2">
            <button class="btn badge col-md-8 col-xs-10 mx-auto" 
                v-bind:class="{ 
                    'btn-warning': viewFutureCamps, 
                    'btn-bblue': !viewFutureCamps }"
                aria-expanded="false" 
                aria-controls="futureCamps"
                v-on:click.stop.prevent="toggleFutureCamps">
                <span v-if="!viewFutureCamps" class="mx-4 glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                <span v-if="viewFutureCamps" class="mx-4 glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                {{viewFutureBtn}}
            </button>
        </div>
        <hr class="my-8">
        <div v-if="viewFutureCamps">
            <table class="table table-bordered table-hover table-condensed">
                <thead class="thead-light">
                    <tr>
                        <th class="text-center" colspan="3">
                            <h4 class="font-weight-bold ">
                                Upcoming Camps
                                <span class="mx-2 glyphicon glyphicon-sort-by-alphabet"></span>    
                            </h4>
                        </th>
                    </tr>
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
        <div v-if="viewPastCamps">
            <table class="table table-bordered table-hover table-condensed">
                <thead class="thead-light">
                    <tr>
                        <th class="text-center" colspan="3">
                            <h4 class="font-weight-bold ">
                                Past Camps
                                <span class="mx-2 glyphicon glyphicon-sort-by-alphabet-alt"></span>    
                            </h4>
                        </th>
                    </tr>
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
    data () {
        return {
            allCamps: [],
            viewPastCamps: false,
            viewFutureCamps: true,
        }
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
    },
    computed: {
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
</style>

