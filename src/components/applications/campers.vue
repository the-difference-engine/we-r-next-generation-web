<template>
    <div v-if="campApps.length > 0" class="container-fluid mx-0">
        <hr class="col-xs-12 mx-auto px-0 my-5 gray">
        <h4 class="text-left gray font-weight-bold">Submitted Camper Applications</h4>
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
                            {{app.status | statusCap}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "camperAppsList",
    props: {
        campApps: {
            type: Array,
            required: true
        },
        children: {
            type: Object,
            required: true
        },
    },
    filters: {
        statusCap: function(status) {
            if (!status) return '';
            status = status.toString().replace('_', ' ');
            return status[0].toUpperCase() + status.slice(1);
        },
    },
}
</script>

