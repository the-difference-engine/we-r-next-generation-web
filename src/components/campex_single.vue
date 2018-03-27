<template>
<div class="container">
    <div class="row mx-0">
        <h1 class="big">
            Camp Session
            <button class="float-right btn btn-warning" v-on:click="editCamp">{{edit_btn}}</button>
        </h1>
    </div>
    <hr>
    {{get_camp}}
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
                    console.log("Received data", data)
                    this.camp = data;
                    this.camp_id = this.camp._id.$oid
                    console.log("Camp Now:", this.camp);
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
            }
        }
    }


</script>

<style scoped>

</style>
