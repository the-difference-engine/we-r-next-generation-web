<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="$emit('submit')">
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Street Address 1" type="text"
                v-model="appState.address1"
                placeholder="123 Main Street"
                autocomplete="street-address address-line1"
                :min-length="2"
                :max-length="100"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.address1 = $event"
            ></input-row>
            <input-row label="Street Address 2" type="text"
                v-model="appState.address2"
                placeholder="Apartment / Unit"
                autocomplete="street-address address-line2"
                :required="false"
                :max-length="100"
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
                    v-on:input="emitChange"
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
        name: 'appVolunteer1',
        components: {
            inputRow
        },
        props: {
            formFieldList: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                setup: false,
                formCurrPage: 0,
                isPrevious: false,
                isNext: true,
                prevRoute: '',
                nextRoute: '/application/volunteer/2',
                invalidFields: {},
                countries_json: json,
            }
        },
        methods: {
            contextSetup: function() {
                this.appContext.formCurrPage = this.formCurrPage;
                this.appContext.isPrevious = this.isPrevious;
                this.appContext.isNext = this.isNext;
                this.appContext.nextRoute = this.nextRoute;
                this.appContext.prevRoute = this.prevRoute;
            },
            emitChange: function() {
                this.$emit('updateData');
                if (this.setup) {
                    this.appContext.formDirty = true;
                }
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
            setInterval(() => {
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
