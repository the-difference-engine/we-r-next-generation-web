<template>
    <div id="app-nav" class="row sticky-top mx-0 px-0">
        <div class="row sticky mx-0 px-0">
            <div class="col-xs-6 mpl-0 text-left">
                <button 
                    class="col-lg-3 col-md-4 col-xs-12 btn btn-warning text-white" 
                    v-on:click.stop.prevent="prevClick"
                    v-bind:disabled="!isPrevious || !formComplete || formInvalid">
                    <i class="fa fa-arrow-circle-o-left align-middle font-large" aria-hidden="false" aria-label="Previous" title="Previous"></i>
                    <span class="mx-1 align-middle">Previous</span>
                </button>
            </div>
            <div class="col-xs-6 mpr-0">
                <button 
                    class="col-lg-3 col-md-4 col-xs-12 btn btn-warning text-white float-right" 
                    v-on:click.stop.prevent="nextClick"
                    v-bind:disabled="!isNext || !formComplete || formInvalid">
                    <span class="mx-1 align-middle">Next</span>
                    <i class="fa fa-arrow-circle-o-right align-middle font-large" aria-hidden="false" aria-label="Next" title="Next"></i>
                </button>
            </div>
        </div>
        <div class="row my-3 mx-0 px-0">
            <div class="col-md-6 col-xs-12 mpr-0 float-right">
                <div class="row mx-0 px-0 col-xs-12">
                    <button 
                        class="col-lg-3 col-md-4 col-xs-5 btn btn-primary font-weight-bold text-white ml-4 float-right" 
                        v-if="canSubmit"
                        v-on:click.stop.prevent="submit"
                        v-bind:disabled="formInvalid">
                        Submit
                    </button>
                    <span class="col-lg-3 col-md-4 col-xs-5 mx-0 px-0 float-right"
                        v-tooltip.bottom.end="{
                            content:'Temporarily save your progress. You application will NOT be submitted.', 
                            delay: 400
                        }">
                        <button 
                            class="col-xs-12 m-0 btn btn-danger font-weight-bold text-white" 
                            v-on:click.stop.prevent="save"
                            v-bind:disabled="!formDirty || formInvalid">
                            Save
                        </button>
                    </span>
                    <span class="col-lg-3 col-md-4 col-xs-5 mx-4 px-0 float-right"
                        v-tooltip.top.end="{
                            content:'Start over. This will clear your application!', 
                            delay: 400
                        }">
                        <button 
                            class="col-xs-12 btn btn-secondary font-weight-bold text-white float-right" 
                            v-on:click.stop.prevent="cancel">
                            Cancel
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "appNavigation",
    props: {
        formDirty: {
            type: Boolean,
            default: false
        },
        formInvalid: {
            type: Boolean,
            default: false
        },
        formComplete: {
            type: Boolean,
            default: false
        },
        isPrevious: {
            type: Boolean,
            default: true
        },
        isNext: {
            type: Boolean,
            default: true
        },
        canSubmit: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        prevClick: function() {
            this.$emit('prevClick');
        },
        nextClick: function() {
            this.$emit('nextClick');
        },
        submit: function() {
            this.$emit('submitClick');
        },
        save: function() {
            this.$emit('saveClick');
        },
        cancel: function() {
            this.$emit('cancelClick');
        }
    }
}
</script>

<style scoped>
    /* .sticky {
        margin-top: 0;
        display: block;

        position: sticky;
    } */
</style>


