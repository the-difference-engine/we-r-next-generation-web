<template>
    <div class="container-fluid mx-0">
        <h4 class="text-left gray font-weight-bold">Children who may attend camp</h4>
        <table class="table">
            <thead>
                <tr>
                    <th colspan="2" class="text-center"></th>
                    <th colspan="2" class="text-center">Last Application</th>
                </tr>
                <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">Age</th>
                    <th class="text-center">Submitted</th>
                    <th class="text-center">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="child in children" v-bind:key="child[0].childName">
                    <td>{{child[0].childName}}</td>
                    <td>{{child[0].age}}</td>
                    <td>
                        <div v-for="app in child" v-bind:key="app._id.$oid">
                            <router-link :to="{ name: 'applicationSubmitted', params: { id: app._id.$oid } }">
                            {{app.date_signed}}
                            </router-link>
                        </div>
                    </td>
                    <td>
                        <div v-for="app in child" v-bind:key="app._id.$oid">
                            {{app.status}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import localforage from "../../sessionUtils";
import axios from "axios";
import _ from 'lodash';
export default {
    name: "appChildren",
    data() {
        return {
            sessionId: '',
            applications: [],
            children: [],
        }
    },
    created: function() {
        localforage.getItem("X_TOKEN")
        .then(session => {
            this.sessionId = session;
            axios.get("/api/v1/profile/" + session + "/applications", {
                headers: { "x-token": session }
            })
            .then(response => {
                this.applications = response.data;  // store all applications
                // group applications by child name - sort by name and app date
                let children = _.groupBy(response.data, function(app) {
                    return app.childName[0].toLowerCase();  // all lower case because sort is case sensitive
                });
                let sortedChildren = _.sortBy(_.keys(children));
                _.forEach(sortedChildren, function(child) {
                    children[child] = _.orderBy(children[child], ['date_signed'], ['desc'])
                });
                this.children = children;
            })
        })
    },
}
</script>
