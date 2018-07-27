<template>
    <div class="container-fluid mx-0 px-0">
        <div v-if="campRoute === 'edit'" 
            class="row mx-0 px-0 my-3">
            <button class="float-left btn btn-warning px-3"
                v-on:click="clickCampDelete">
                <span class="glyphicon glyphicon-remove pr-3"></span>
                Delete Camp
            </button>
            <button class="float-right btn btn-warning px-3" 
                v-on:click="editCamp">
                <span v-if="editBtn == editBtnOptions.edit" class="glyphicon glyphicon-pencil pr-3"></span>
                <span v-if="editBtn == editBtnOptions.disable" class="glyphicon glyphicon-ban-circle pr-3"></span>
                {{editBtn}}
            </button>
        </div>
        <form v-on:submit.prevent="clickCreateOrUpdate" class="form mx-0 px-0">
            <input-row label="Camp Name" type="text"
                :small="true"
                v-model="campData.name"
                placeholder="Name of the Camp Session"
                :min-length="2"
                :max-length="100"
                help-text="This name will appear in all camp selection options"
                :readonly="disableEdits"
                v-on:invalid="invalidFields.name = $event"
            ></input-row>
            <input-row label="Description" type="textarea"
                :small="true"
                v-model="campData.description"
                placeholder="Describe the activities or purpose of this camp"
                :required="false"
                :max-length="100"
                :readonly="disableEdits"
                v-on:invalid="invalidFields.description = $event"
            ></input-row>
            <input-row label="Point of Contact" type="text"
                :small="true"
                v-model="campData.poc"
                placeholder="Main contact for the camp"
                :required="false"
                :max-length="100"
                :readonly="disableEdits"
                v-on:invalid="invalidFields.poc = $event"
            ></input-row>
            <input-row label="Start Date" type="date"
                :small="true"
                v-model="campData.date_start"
                :default-value="todayString"
                :min-date="yesterdayDate"
                :readonly="disableEdits"
                v-on:input="updateMinDate($event)"
                v-on:invalid="invalidFields.date_start = $event"
            ></input-row>
            <input-row label="End Date" type="date"
                :small="true"
                v-model="campData.date_end"
                :default-value="calcOneWeekString"
                :min-date="minDate"
                :readonly="disableEdits"
                v-on:invalid="invalidFields.date_end = $event"
            ></input-row>
            <input-row label="Camper Limit" type="number"
                :small="true"
                v-model="campData.limit"
                :min-num="0"
                :readonly="disableEdits"
                v-on:invalid="invalidFields.limit = $event"
            ></input-row>
            <input-row label="Camp Status" type="select"
                :small="true"
                v-model="campData.status"
                :choices="statusOptions"
                :default-value="statusOptions[0].value"
                :readonly="disableEdits"
                v-on:invalid="invalidFields.status = $event"
            ></input-row>
            <div class="form-group row mx-0 px-0">
                <div class="row col-xs-12 px-0 my-2">
                    <button 
                        :disabled="formInvalid || formIncomplete || disableEdits" 
                        type="submit" 
                        class="btn btn-primary px-3 col-md-4 col-xs-6 float-right"
                        >{{submitOrUpdate}}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import inputRow from '../forms/inputRow.vue';
import swal from 'sweetalert2';
export default {
    name: 'adminCampForm',
    components: {
        inputRow
    },
    props: {
        campRoute: {
            type: String,
            required: true,
        },
        routeChanging: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            defaultCampLength: 5,
            campData: {
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
            disableEdits: false,
            editBtnOptions: {
                edit: 'Edit Camp Data',
                disable: 'Cancel Edits'
            },
            editBtn: '',
        }
    },
    watch: {
        campRoute: function(value) {
            this.checkEditForm();
        },
        routeChanging: function(value) {
            if (value === true) {
                this.checkEditForm();
            }
        },
    },
    methods: {
        checkEditForm: function() {
            if (this.campRoute === 'edit') {
                this.editBtn = this.editBtnOptions.edit;
                this.getCampData();
                this.disableEdits = true;
            } else {
                this.campData.date_start = this.dateToString(new Date());
                this.campData.date_end = this.oneWeekString();
            }
        },
        editCamp: function() {
            this.disableEdits = !this.disableEdits;
            if (this.editBtn == this.editBtnOptions.edit) {
                // enable edits and change button text
                this.editBtn = this.editBtnOptions.disable;
            }
            else {
                // disable edits - return data to original and change button text
                this.getCampData();
                this.editBtn = this.editBtnOptions.edit;
            }
        },
        getCampData: function() {
            this.$store.dispatch('campSessionGet', {
                camp_id: this.$route.params.id,
            })
            .then(data => {
                this.campData = data;
            })
        },
        clickCreateOrUpdate: function() {
            if (this.campRoute === 'edit') {
                this.campUpdate();
            } else if (this.campRoute === 'create') {
                this.campCreate();
            }
        },
        clickCampDelete: function() {
            swal({
                title: 'Are you sure?',
                text: "This will delete the camp session! You won't be able to undo this action!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.value) {
                    this.campDelete();
                } 
            })
        },
        campCreate: function() {
            this.$store.dispatch('campSessionCreate', {
            newCamp: this.campData,
            router: this.$router,
            })
        },
        campUpdate: function() {
            this.$store.dispatch('campSessionUpdate', {
                updated_camp: this.campData,
                camp_id: this.campData._id.$oid,
                router: this.$router,
                that: this
            })
            .then(res => {
                if (res == true) {
                    this.editCamp();
                    swal(
                        'Updated!',
                        'Your updates were successfully saved.',
                        'success'
                    );
                }
                else {
                    swal(
                        'Oops ...',
                        'Something went wrong on the server, please try again.',
                        'error'
                    );
                }
            })
        },
        campDelete: function() {
            this.$store.dispatch('campSessionDelete', {
                campId: this.campData._id.$oid,
                router: this.$router,
            });
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
            this.campData.date_start = startDate;
            let startDt = new Date(startDate);
            let endDt = new Date(this.campData.date_end);
            if (endDt < startDt) {
                this.campData.date_end = this.dateToString(startDt);
            }
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
            for (let field in this.campData) {
                if (!this.notRequiredFields.includes(field)) {
                    if (this.campData[field] == '' || this.campData[field] == null) {
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
        todayString: function() {
            let dt = new Date();
            return this.dateToString(dt);
        },
        minDate: function() {
            let dt = new Date(this.campData.date_start);
            return dt;
        },
        calcOneWeekString: function() {
            return this.oneWeekString();
        },
        submitOrUpdate: function() {
            if (this.campRoute === 'edit') {
                return 'Update';
            } else { return 'Submit' }
        }
    },
    beforeMount: function() {
        this.checkEditForm();
    },
}
</script>

