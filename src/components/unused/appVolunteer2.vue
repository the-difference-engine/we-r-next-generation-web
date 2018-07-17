<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="$emit('submit')">
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <div class="row mx-0 px-0">
                <h4 class="font-weight-bold">Please tell us a little bit about yourself:</h4>
            </div>
            <input-row-no-label label="" type="textarea"
                v-model="appState.bioVolunteer"
                placeholder="Your response ..."
                :min-length="10"
                :max-length="3000"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.bioVolunteer = $event"
            ></input-row-no-label>
            <div class="row mx-0 px-0 text-right"><small>{{charactersLeft}}</small></div>
        </div>
        <div class="row col-xs-12 my-2 mx-0 px-0">
            <div class="row mx-0 px-0">
                <h4 class="font-weight-bold">Which camp would you like to teach at (Select one):</h4>
            </div>
            <input-row-no-label label="Camp Choice" type="select"
                v-model="appState.chosenCamp"
                :choices="appState.camps"
                v-on:input="emitChange"
                v-on:invalid="invalidFields.chosenCamp = $event"
            ></input-row-no-label>
        </div>
    </form>
  </div>
</template>

<script>
    import Vue from 'vue';
    import inputRowNoLabel from './forms/inputRowNoLabel.vue';
    export default {
        name: 'appVolunteer2',
        components: {
            inputRowNoLabel
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
                formCurrPage: 1,
                isPrevious: true,
                isNext: true,
                prevRoute: '/application/volunteer/1',
                nextRoute: '/application/volunteer/3',
                invalidFields: {},
                bio_max: 300,
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
            },
            charactersLeft(){
                let words = this.appState.bioVolunteer.split(' ').filter((entry)=>{ return entry.trim() != ''; })
                let count = words.length;
                return (this.bio_max - count) + ' / ' + this.bio_max + ' words remaining';
            },
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
