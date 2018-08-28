<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="$emit('submit')">
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <div v-if="appContext.appType == 'camper'" class="row mx-0 px-0">
                <h4 class="font-weight-bold">How do you think your child could benefit from Creativity Camp?</h4>
            </div>
            <div v-if="appContext.appType == 'volunteer'" class="row mx-0 px-0">
                <h4 class="font-weight-bold">Please tell us a little bit about yourself:</h4>
            </div>
            <div v-if="appContext.appType == 'partner'" class="row mx-0 px-0">
                <h4 class="font-weight-bold">Provide a description about your organization that you would like to show on our website:</h4>
            </div>
            <input-row-no-label v-if="appContext.appType == 'camper'" 
                label="Your response" 
                type="textarea"
                v-model="appState.bioCamper"
                placeholder="Your response ..."
                :min-length="10"
                :max-length="maxChar"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.bioCamper = $event"
            ></input-row-no-label>
            <input-row-no-label v-if="appContext.appType == 'volunteer'" 
                label="Your response" 
                type="textarea"
                v-model="appState.bioVolunteer"
                placeholder="Your response ..."
                :min-length="10"
                :max-length="maxChar"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.bioVolunteer = $event"
            ></input-row-no-label>
            <input-row-no-label v-if="appContext.appType == 'partner'" 
                label="Your response" 
                type="textarea"
                v-model="appState.companyDescription"
                placeholder="Your organization's description ..."
                :min-length="10"
                :max-length="maxChar"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.companyDescription = $event"
            ></input-row-no-label>
            <div class="row mx-0 px-0 text-right"><small>{{wordsLeft}}</small></div>
        </div>
        <div v-if="appContext.appType !== 'partner'" class="row col-xs-12 my-2 mx-0 px-0">
            <div v-if="appContext.appType == 'camper'" class="row mx-0 px-0">
                <h4 class="font-weight-bold">Which camp would you like your child to attend? (Select one):</h4>
            </div>
            <div v-if="appContext.appType == 'volunteer'" class="row mx-0 px-0">
                <h4 class="font-weight-bold">Which camp would you like to teach at (Select one):</h4>
            </div>
            <input-row-no-label label="Camp Choice" 
                type="select"
                v-model="appState.chosenCamp"
                :choices="appState.camps"
                :pristine="appContext.formPristine"
                v-on:input="selectCamp($event)"
                v-on:invalid="invalidFields.chosenCamp = $event"
            ></input-row-no-label>
        </div>
        <div v-else class="row col-xs-12 my-2 mx-0 px-0">
            <div class="row mx-0 px-0">
                <h4 class="font-weight-bold">Tell us more information about how and why you would like to partner with our organization:</h4>
            </div>
            <input-row-no-label 
                label="Your response" 
                type="textarea"
                v-model="appState.companyNote"
                placeholder="Your response ..."
                :min-length="10"
                :max-length="maxCharNote"
                :pristine="appContext.formPristine"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.companyNote = $event"
            ></input-row-no-label>
            <div class="row mx-0 px-0 text-right"><small>{{wordsLeftNote}}</small></div>
        </div>
    </form>
  </div>
</template>

<script>
    import inputRowNoLabel from './forms/inputRowNoLabel.vue';
    export default {
        name: 'appPage2',
        components: {
            inputRowNoLabel
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
                formCurrPage: 1,
                isPrevious: true,
                isNext: true,
                invalidFields: {},
                bio_max: 300,
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
                this.appContext.prevRoute = this.appContext.startRoute;
                if (this.appContext.appType !== 'partner') {
                    this.appContext.nextRoute = this.appContext.routeWaiver;
                } else {
                    this.appContext.nextRoute = this.appContext.routeConfirm;
                }
            },
            emitChange: function() {
                this.$emit('updateData');
                if (this.setup) {
                    this.appContext.formDirty = true;
                }
            },
            selectCamp: function(value) {
                this.appState.chosenCampName = this.appState.campsIdx[value];
                this.emitChange();
            },
            getBioText: function() {
                switch(this.appContext.appType) {
                    case 'camper':
                        return this.appState.bioCamper;
                    case 'volunteer':
                        return this.appState.bioVolunteer;
                    case 'partner':
                        return this.appState.companyDescription;
                }
            },
            wordsCount(companyNote=false) {
                if (companyNote) {
                    var wordText = (this.appState.companyNote !== undefined) ? this.appState.companyNote : '';
                } else {
                    var wordText = (this.getBioText() !== undefined) ? this.getBioText() : '';
                }
                let words = wordText.split(' ').filter((entry)=>{ return entry.trim() != ''; })
                return words.length;
            },
            maxCharCompute(companyNote=false) {
                // change max characters if bio exceeds max words
                if (this.wordsCount(companyNote) > this.bio_max) {
                    return 300;
                }
                else {
                    return 10000;
                }
            },
        },
        computed: {
            appState() {
                return this.$store.state.applicationData;
            },
            appContext() {
                return this.$store.state.applicationContext;
            },
            wordsLeft() {
                return (this.bio_max - this.wordsCount()) + ' / ' + this.bio_max + ' words remaining';
            },
            wordsLeftNote() {
                return (this.bio_max - this.wordsCount(true)) + ' / ' + this.bio_max + ' words remaining';
            },
            maxChar() {
                return this.maxCharCompute();
            },
            maxCharNote() {
                return this.maxCharCompute(true);
            },
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
