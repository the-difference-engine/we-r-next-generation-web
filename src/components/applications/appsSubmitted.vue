<template>
    <div class="container-fluid mx-0 px-0">
        <camper-apps-list :camp-apps="campApps" :children="children"></camper-apps-list>
        <vol-apps-list :vol-apps="volApps" :volunteers="volunteers"></vol-apps-list>
        <partner-apps-list :partner-apps="partnerApps" :partners="partners"></partner-apps-list>
    </div>
</template>
<script>
import localforage from "../../sessionUtils";
import axios from "axios";
import _ from 'lodash';
import camperAppsList from './campers.vue';
import volAppsList from './vols.vue';
import partnerAppsList from './partners.vue';
export default {
    name: "allAppsSubmitted",
    components: {
        camperAppsList,
        volAppsList,
        partnerAppsList,
    },
    data() {
        return {
            applications: [],
            campApps: [],
            volApps: [],
            partnerApps: [],
            children: {},
            volunteers: {},
            partners: {},
        }
    },
    methods: {
        groupingApps: function(appCollection, sortingField) {
            let applicants = _.groupBy(appCollection, function(app) {
                return app[sortingField].toLowerCase();  // all lower case because sort is case sensitive
            });
            let sortedApplicants = _.sortBy(_.keys(applicants));
            _.forEach(sortedApplicants, function(applicant) {
                applicants[applicant] = _.orderBy(applicants[applicant], ['date_signed'], ['desc'])
            });
            return applicants;
        },
        groupChildren: function() {
            this.children = this.groupingApps(this.campApps, 'childName');
        },
        groupVols: function() {
            this.volunteers = this.groupingApps(this.volApps, 'full_name');
        },
        groupPartners: function() {
            this.partners = this.groupingApps(this.partnerApps, 'companyName');
        },
    },
    created: function() {
        localforage.getItem("X_TOKEN")
        .then(session => {
            axios.get("/api/v1/profile/applications", {
                headers: { "x-token": session }
            })
            .then(response => {
                this.applications = response.data;  // store all applications
                // divide camper, volunteer, and partner applications
                this.campApps = _.filter(this.applications, function(app) {
                    return app.type === 'camper';
                });
                this.volApps = _.filter(this.applications, function(app) {
                    return app.type === 'volunteer';
                });
                this.partnerApps = _.filter(this.applications, function(app) {
                    return app.type === 'partner';
                });
                // group applications by child/vol/partner name 
                // sort by name and app date
                this.groupChildren();
                this.groupVols();
                this.groupPartners();
            })
        })
    },
}
</script>
