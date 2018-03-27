<template>
<div class="container">
    <h1 class="big">Add a New Camp Session</h1>
    <hr>
    {{get_camps}}
    <div class="row">
        <div class="col-md-8">
            <form v-on:submit.prevent="campCreate" id="camp-create">
                <div class="form-group row">
                    <label class="col-md-2 col-form-label text-right">Name</label>
                    <div class="col-md-10">
                        <input type="text" class="form-control" v-model="new_camp.name" v-bind:placeholder="placeholders.name">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label text-right">Description</label>
                    <div class="col-md-10">
                        <textarea rows="2" class="form-control" v-model="new_camp.description" v-bind:placeholder="placeholders.description"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 col-form-label text-right">Point of Contact</label>
                    <div class="col-md-10">
                        <input type="text" class="form-control" v-model="new_camp.poc" v-bind:placeholder="placeholders.poc">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <label class="col-md-4 col-form-label col-form-label-sm text-right">Start Date</label>
                        <div class="col-md-8 px-0">
                            <input type="date" class="form-control" v-model="new_camp.date_start">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <label class="col-md-4 col-form-label col-form-label-sm text-right">End Date</label>
                        <div class="col-md-8 px-0">
                            <input type="date" class="form-control" v-model="new_camp.date_end" v-bind:min="new_camp.date_start">
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <label class="col-md-4 col-form-label col-form-label-sm text-right">Camper Limit</label>
                        <div class="col-md-8 px-0">
                            <input type="number" class="form-control" v-model="new_camp.limit">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <label class="col-md-4 col-form-label col-form-label-sm text-right">Status</label>
                        <div class="col-md-8 px-0">
                            <select class="form-control" v-model="new_camp.status">
                                <option v-for="opt in status_options" :value="opt">{{opt}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-group row">
                    <div class="col-md-12 text-right">
                        <button type="submit" class="btn btn-primary">Save & Submit</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-4">
            <h4 class="mx-auto"><strong>Existing Sessions</strong></h4>
            <table class="table table-striped">
                <thead class="thead-light">
                    <th class="text-center">Name</th>
                    <th class="text-center">Start</th>
                    <th class="text-center">End</th>
                </thead>
                <tr v-for="camp in all_camps">
                    <td>
                        <router-link :to="{ name: 'ViewCamp', params: { id: camp._id.$oid } }">
                            {{camp.name}}
                        </router-link>
                    </td>
                    <td>{{camp.date_start}}</td>
                    <td>{{camp.date_end}}</td>
                </tr>
            </table>

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
        name: 'campex_create',
        methods: {
            campCreate: function(evt) {
                console.log("Camp Create Method");
                this.$store.dispatch('campSessionCreate', {
                new_camp: this.new_camp,
                router: this.$router,
                })
            },
            campsGetAll: function() {
                console.log("Get Camp Method");
                this.$store.dispatch('campSessionsGetAll', {
                field_name: "date_start",
                order: "DESC"
                })
                .then(data => {
                    console.log("Received data", data)
                    this.all_camps = data;
                    console.log("Camps Now:", this.all_camps);
                })
            }
        },
        data () {
            return {
                new_camp: {
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
                all_camps: []
            }
        },
        computed: {
            get_camps: function() {
                return this.campsGetAll();
            }
        }
    }


</script>

<style scoped>

</style>
