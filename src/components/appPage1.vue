<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="$emit('submit')">
        <div class="row mx-0 px-0" v-if="appContext.appType === 'camper'">
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-row label="Child's Name" type="text"
                    v-model="appState.childName"
                    placeholder="Child's Name"
                    autocomplete="name family-name"
                    :min-length="2"
                    :max-length="100"
                    help-text="Name of the child for this application"
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.childName = $event"
                ></input-row>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <div :class="$mq" class="col-xs-2"></div>
                <div class="col-sm-4">
                    <input-row label="Child's Gender" type="radio"
                        v-model="appState.childGender"
                        :choices="gender_choices"
                        :small="true"
                        :min-length="4"
                        :max-length="6"
                        :pristine="appContext.formPristine"
                        v-on:input="emitChange"
                        v-on:invalid="invalidFields.childGender = $event"
                    ></input-row>
                </div>
                <div class="col-sm-6">
                    <input-row label="Child's Age" type="number"
                        v-model="appState.childAge"
                        :small="true"
                        :min-num="5"
                        :pristine="appContext.formPristine"
                        v-on:input="emitChange"
                        v-on:invalid="invalidFields.childAge = $event"
                    ></input-row>
                </div>
            </div>
        </div>
        <div class="row mx-0 px-0" v-if="appContext.appType === 'partner'">
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-row label="Company Name" type="text"
                    v-model="appState.companyName"
                    placeholder="Company Name"
                    autocomplete="organization"
                    :min-length="2"
                    :max-length="100"
                    help-text="Your company name will appear on our site and promotional material, as it is written here."
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.companyName = $event"
                ></input-row>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-row label="Company Website" type="url"
                    v-model="appState.companyUrl"
                    placeholder="http://www.example.com"
                    autocomplete="url"
                    :required="false"
                    :max-length="100"
                    help-text="If provided, we will provide a link to your organization's website on our website."
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.companyUrl = $event"
                ></input-row>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-row label="Company Logo" type="photo"
                    v-model="appState.companyLogo"
                    placeholder="*.jpg, *.png, *.bmp"
                    :max-length="255"
                    help-text="Please provide a logo so we can feature your organization!"
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.companyLogo = $event"
                ></input-row>
            </div>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Street Address 1" type="text"
                v-model="appState.address1"
                placeholder="123 Main Street"
                autocomplete="street-address address-line1"
                :min-length="2"
                :max-length="100"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.address1 = $event"
            ></input-row>
            <input-row label="Street Address 2" type="text"
                v-model="appState.address2"
                placeholder="Apartment / Unit"
                autocomplete="street-address address-line2"
                :required="false"
                :max-length="100"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.address2 = $event"
            ></input-row>
        </div>
        <div class="row col-xs-12 my-2">
            <div :class="$mq" class="col-xs-2"></div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="City" type="text"
                    v-model="appState.city"
                    placeholder="City"
                    autocomplete="city address-level2"
                    :small="true"
                    :min-length="2"
                    :max-length="50"
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.city = $event"
                ></input-row>
            </div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="State/ Province" type="text"
                    v-model="appState.stateProvince"
                    placeholder="State or Province"
                    autocomplete="state address-level1"
                    :small="true"
                    :min-length="2"
                    :max-length="50"
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.stateProvince = $event"
                ></input-row>
            </div>
        </div>
        <div class="row col-xs-12 my-2">
            <div :class="$mq" class="col-xs-2"></div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="Postal Code" type="text"
                    v-model="appState.zipCode"
                    placeholder="Postal Code"
                    autocomplete="postal-code"
                    :small="true"
                    :min-length="2"
                    :max-length="10"
                    :pristine="appContext.formPristine"
                    v-on:input="emitChange"
                    v-on:invalid="invalidFields.zipCode = $event"
                ></input-row>
            </div>
            <div class="col-sm-5 mx-0 px-0">
                <input-row label="Country" type="select"
                    v-model="appState.country"
                    placeholder="Country"
                    autocomplete="country-name"
                    :choices="countries_json"
                    default-value="NG"
                    :small="true"
                    :min-length="2"
                    :max-length="50"
                    :pristine="appContext.formPristine"
                    v-on:input="selectCountry($event)"
                    v-on:invalid="invalidFields.country = $event"
                ></input-row>
            </div>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Phone Number" type="text"
                v-model="appState.phoneNumber"
                placeholder="Phone Number"
                autocomplete="tel"
                :min-length="7"
                :max-length="50"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.phoneNumber = $event"
            ></input-row>
        </div>
    </form>
  </div>
</template>

<script>
    import inputRow from './forms/inputRow.vue';
    import json from '../json/countries.json';
    export default {
        name: 'appPage1',
        components: {
            inputRow
        },
        props: {
            formFieldList: {
                type: Array,
                required: true,
            },
            routeUpdate: {
                type: Boolean,
            },
        },
        data() {
            return {
                setup: false,
                formCurrPage: 0,
                isPrevious: false,
                isNext: true,
                invalidFields: {},
                gender_choices: [
                    {
                        text: "Male",
                        value: "Male"
                    },
                    {
                        text: "Female",
                        value: "Female"
                    }
                ],
                countries_json: json,
            }
        },
        watch: {
            invalidFields: {
                // when the debounced validator emits a change, emit an update occurred to the parent
                handler: function(val, oldVal) {
                    this.emitChange();
                },
                deep: true
            },
            routeUpdate: {
                // when the route update flag is set from the parent
                // run context setup
                handler: function(val, oldVal) {
                    if (val == true) {
                        this.contextSetup();
                    }
                }
            },
        },
        methods: {
            contextSetup: function() {
                this.appContext.formCurrPage = this.formCurrPage;
                this.appContext.isPrevious = this.isPrevious;
                this.appContext.isNext = this.isNext;
                this.appContext.prevRoute = '';
                this.appContext.nextRoute = this.appContext.routePage2;
            },
            emitChange: function() {
                this.$emit('updateData');
                if (this.setup) {
                    this.appContext.formDirty = true;
                }
            },
            selectCountry: function(value) {
                this.$store.dispatch('getCountryNameFromKey', value)
                .then(name => {
                    this.appState.countryName = name;
                    this.emitChange();
                })
            },
        },
        computed: {
            appState() {
                return this.$store.state.applicationData;
            },
            appContext() {
                return this.$store.state.applicationContext;
            }
        },
        created: function() {
            this.invalidFields = this.formFieldList[this.formCurrPage];
        },
		beforeMount: function() {
            this.contextSetup();
        },
        mounted: function() {
            setTimeout(() => {
                this.setup = true;
            }, 1000);
        },
    }
</script>

<style scoped lang="postcss">
	.col-xs-2.smartphone, .col-xs-2.mobile {
		display: none !important;
	}
</style>
