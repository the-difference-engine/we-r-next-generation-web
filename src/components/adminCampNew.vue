<template>
<div :class="$mq" class="container-fluid mx-auto small-screen">
    <h1 class="big">Add a New Camp Session</h1>
    <hr>
    <div class="row mx-0 px-0">
        <admin-camp-form
            :camp-route="campRoute"
            :route-changing="routeChanged"
        ></admin-camp-form>
    </div>
</div>
</template>

<script>
import adminCampForm from './camps/adminCampForm.vue';
export default {
    name: 'adminCampNew',
    components: {
        adminCampForm
    },
    props: {
        routeChanging: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            campRoute: 'create',
            routeChanged: false,
        }
    },
    watch: {
        routeChanging: function(val) {
            this.routeChanged = val;
        },
    },

    created: function() {
        this.$emit('campRoute', this.campRoute);
    },
}
</script>

<style scoped>
    .small-screen.mobile,
    .small-screen.tablet {
        margin: auto 10px;
        padding: auto 0px;
    }
</style>
