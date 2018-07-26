<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="submit">
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <div class="row mx-0 px-0">
                <h4 class="font-weight-bold">How do you think your child could benefit from Creativity Camp?</h4>
            </div>
            Bio: {{formData.bio}}
            Camp: {{formData.chosencamp}}
            <input-row-no-label label="" type="textarea"
                v-model="formData.bio"
                placeholder="Your response ..."
                :min-length="2"
                :max-length="100"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.bio = $event"
            ></input-row-no-label>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <input-row label="Camp Choice" type="select"
                v-model="formData.chosencamp"
                :choices="formData.camps"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.chosencamp = $event"
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
    import inputRowNoLabel from './forms/inputRowNoLabel.vue';
    export default {
        name: 'appCamper2',
        components: {
            inputRow,
            inputRowNoLabel
        },
        props: {
            appData: {
                required: true
            }
        },
        data() {
            return {
                setup: false,
                isPrevious: true,
                isNext: true,
                startRoute: '/application/camper/1',
                prevRoute: '/application/camper/1',
                nextRoute: '/application/camper/3',
                appType: 'camper',
                formData: {},
                invalidFields: {
                    "bio": false,
                    "chosencamp": false,
                },
                formInvalid: false,
                formComplete: false,
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
