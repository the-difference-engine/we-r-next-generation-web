<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="submit">
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Child's Name" type="text"
                v-model="formData.childName"
                placeholder="Child's Name"
                :min-length="2"
                :max-length="100"
                help-text="Name of the child for this application"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.childName = $event"
            ></input-row>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <div :class="$mq" class="col-xs-2"></div>
            <div class="col-sm-4">
                <input-row label="Child's Gender" type="radio"
                    v-model="formData.childGender"
                    :choices="gender_choices"
                    :small="true"
                    :min-length="4"
                    :max-length="6"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.childGender = $event"
                ></input-row>
            </div>
            <div class="col-sm-6">
                <input-row label="Child's Age" type="number"
                    v-model="formData.childAge"
                    :small="true"
                    :min-num="5"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.childAge = $event"
                ></input-row>
            </div>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Street Address 1" type="text"
                v-model="formData.address1"
                placeholder="123 Main Street"
                :min-length="2"
                :max-length="100"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.address1 = $event"
            ></input-row>
            <input-row label="Street Address 2" type="text"
                v-model="formData.address2"
                placeholder="Apartment / Unit"
                :required="false"
                :min-length="2"
                :max-length="100"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.address2 = $event"
            ></input-row>
        </div>
        <div class="row col-xs-12 my-2">
            <div :class="$mq" class="col-xs-2"></div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="City" type="text"
                    v-model="formData.city"
                    placeholder="City"
                    :small="true"
                    :min-length="2"
                    :max-length="50"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.city = $event"
                ></input-row>
            </div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="State/ Province" type="text"
                    v-model="formData.stateProvince"
                    placeholder="State or Province"
                    :small="true"
                    :min-length="2"
                    :max-length="50"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.stateProvince = $event"
                ></input-row>
            </div>
        </div>
        <div class="row col-xs-12 my-2">
            <div :class="$mq" class="col-xs-2"></div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="Postal Code" type="text"
                    v-model="formData.zipCode"
                    placeholder="Postal Code"
                    :small="true"
                    :min-length="2"
                    :max-length="10"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.zipCode = $event"
                ></input-row>
            </div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="Country" type="select"
                    v-model="formData.country"
                    placeholder="Country"
                    :choices="countries_json"
                    :default-value="NG"
                    :small="true"
                    :min-length="2"
                    :max-length="50"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.country = $event"
                ></input-row>
            </div>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Phone Number" type="text"
                v-model="formData.phoneNumber"
                placeholder="Phone Number"
                :min-length="7"
                :max-length="50"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.phoneNumber = $event"
            ></input-row>
        </div>
    </form>
    {{evalFormComplete}}
  </div>
</template>

<script>
	import localforage from '../sessionUtils';
    import axios from 'axios';
    import inputRow from './forms/inputRow.vue';
    import json from '../json/countries.json';
    export default {
        name: 'appCamper1',
        components: {
            inputRow
        },
        props: {
            appData: {
                required: true
            }
        },
        data() {
            return {
                setup: false,
                isPrevious: false,
                isNext: true,
                startRoute: '/application/camper/1',
                prevRoute: '',
                nextRoute: '/application/camper/2',
                appType: 'camper',
                formData: {},
                invalidFields: {
                    "childName": false,
                    "childAge": false,
                    "childGender": false,
                    "address1": false,
                    "address2": false,
                    "city": false,
                    "stateProvince": false,
                    "zipCode": false,
                    "country": false,
                    "phoneNumber": false,
                },
                formInvalid: false,
                formComplete: false,
                gender_choices: [
                    {
                        text: "Male",
                        value: "male"
                    },
                    {
                        text: "Female",
                        value: "female"
                    }
                ],
                countries_json: json,
            }
        },
        watch: {
            // listen to data received from parent
            appData: function(val) {
                this.formData = val;
            }
        },
        methods: {
            emitSetup: function(type) {
                this.$emit('appType', type);
                this.$emit('isPrevious', this.isPrevious);
                this.$emit('isNext', this.isNext);
                this.$emit('startRoute', this.startRoute);
                this.$emit('prevRoute', this.prevRoute);
                this.$emit('nextRoute', this.nextRoute);
            },
            emitChange: function() {
                this.$emit('updateData', this.formData);
                if (this.setup) {
                    this.$emit('formDirty', true);
                }
                this.validator();
            },
            validator: function() {
                let invalid = false;
                for (let key in this.invalidFields) {
                    if (this.invalidFields[key]) {
                        invalid = true;
                        break;
                    }
                }
                this.formInvalid = invalid;
                this.$emit('formInvalid', invalid);
            },
        },
        computed: {
            evalFormComplete: function() {
                // check if the form data is complete w/o errors and emit to the parent
                let complete = true;
                for (let key in this.invalidFields) {
                    if (this.invalidFields[key] || this.formData[key] == null || this.formData[key] == '') {
                        complete = false;
                        break;
                    }
                }
                this.formComplete = complete;
                this.$emit('formComplete', this.formComplete);
            }
        },
		beforeMount: function() {
            this.emitSetup(this.appType);

            // if the component rebuilds,
            // reinit the component form data as the
            // prop appData from the parent component
            this.formData = this.appData;
        },
        mounted: function() {
            setInterval(() => {
                this.setup = true;
            }, 2000);
        }
    }
</script>

<style scoped lang="postcss">
	.col-xs-2.smartphone, .col-xs-2.mobile {
		display: none !important;
	}
</style>
