<template>
    <div id="app-nav" class="row sticky-top my-5 mx-0 px-0">
        <div class="row sticky mx-0 px-0">
            <div class="col-xs-6 col-md-2 mpl-0 text-left">
                <button 
                    class="col-md-10 col-xs-12 btn btn-warning text-white" 
                    v-on:click.prevent.stop="prevClick"
                    v-bind:disabled="!appContext.isPrevious">
                    <i class="fa fa-arrow-circle-o-left align-middle font-large" aria-hidden="false" aria-label="Previous" title="Previous"></i>
                    <span class="mx-1 align-middle">Previous</span>
                </button>
            </div>
            <div :class="$mq" class="menu-top col-md-8 align-bottom">
                <div class="row mx-0 px-0">
                    <div class="navbar navbar-none col-xs-12">
                        <div class="collapse navbar-collapse col-xs-12">
                            <ul class="nav navbar-nav col-xs-12">
                                <li class="col-md-3 nav-link enabled"
                                    v-on:click.prevent.stop="startClick"
                                    v-bind:class="{ 
                                        active: this.appContext.formCurrPage === 0,
                                    }">
                                    Page 1
                                </li>
                                <li class="col-md-3 nav-link"
                                    v-on:click.prevent.stop="page2Click"
                                    v-bind:class="{ 
                                        active: this.appContext.formCurrPage === 1,
                                        disabled: !this.appContext.pagesComplete[0],
                                        enabled: this.appContext.pagesComplete[0]
                                    }">
                                    Page 2
                                </li>
                                <li class="col-md-3 nav-link"
                                    v-on:click.prevent.stop="waiverClick"
                                    v-bind:class="{ 
                                        active: this.appContext.formCurrPage === 2,
                                        disabled: !this.appContext.pagesComplete[0] || !this.appContext.pagesComplete[1],
                                        enabled: this.appContext.pagesComplete[0] && this.appContext.pagesComplete[1]
                                    }">
                                    Waiver
                                </li>
                                <li class="col-md-3 nav-link"
                                    v-on:click.prevent.stop="confirmClick"
                                    v-bind:class="{ 
                                        active: this.appContext.formCurrPage === 3,
                                        disabled: !this.appContext.canSubmit,
                                        enabled: this.appContext.canSubmit
                                    }">
                                    Confirm
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div><!-- Comment removes rendered white space!
            --><div class="col-xs-6 col-md-2 mpr-0 align-bottom">
                <button 
                    class="col-md-10 col-xs-12 btn btn-warning text-white float-right" 
                    v-on:click.prevent.stop="nextClick"
                    v-bind:disabled="!appContext.isNext || !appContext.formComplete || appContext.formInvalid">
                    <span class="mx-1 align-middle">Next</span>
                    <i class="fa fa-arrow-circle-o-right align-middle font-large" aria-hidden="false" aria-label="Next" title="Next"></i>
                </button>
            </div>
        </div>
        <div :class="$mq" class="row menu-small-screen">
            <div class="navbar navbar-none col-xs-12">
                <div class="navbar-header float-right">
                    <button 
                        v-on:click.prevent.stop="toggleMenu" 
                        v-bind:class="{'is-active': menuClicked}" 
                        class="hamburger hamburger--collapse" 
                        type="button">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="col-xs-12 mx-0 px-0" 
                v-bind:class="{'show-menu': menuClicked, 'hide-menu': !menuClicked}">
                <ul class="nav navbar-nav col-xs-12 mx-0 px-0">
                    <li class="col-md-3 nav-link enabled"
                        v-on:click.prevent.stop="startClick"
                        v-bind:class="{ 
                            active: this.appContext.formCurrPage === 0,
                        }">
                        Page 1
                    </li>
                    <li class="col-md-3 nav-link"
                        v-on:click.prevent.stop="page2Click"
                        v-bind:class="{ 
                            active: this.appContext.formCurrPage === 1,
                            disabled: !this.appContext.pagesComplete[0],
                            enabled: this.appContext.pagesComplete[0]
                        }">
                        Page 2
                    </li>
                    <li class="col-md-3 nav-link"
                        v-on:click.prevent.stop="waiverClick"
                        v-bind:class="{ 
                            active: this.appContext.formCurrPage === 2,
                            disabled: !this.appContext.pagesComplete[0] || !this.appContext.pagesComplete[1],
                            enabled: this.appContext.pagesComplete[0] && this.appContext.pagesComplete[1]
                        }">
                        Waiver
                    </li>
                    <li class="col-md-3 nav-link"
                        v-on:click.prevent.stop="confirmClick"
                        v-bind:class="{ 
                            active: this.appContext.formCurrPage === 3,
                            disabled: !this.appContext.canSubmit,
                            enabled: this.appContext.canSubmit
                        }">
                        Confirm
                    </li>
                    <li class="nav-link enabled mx-4 px-3"
                        v-tooltip.top.end="{
                            content:'Start over. This will clear your application!', 
                            delay: 400
                        }"
                        v-on:click.stop.prevent="cancel">
                        Cancel
                    </li>
                    <li class="nav-link active px-3"
                        v-tooltip.bottom.end="{
                            content:saveMsg, 
                            delay: 400
                        }"
                        v-on:click.stop.prevent="save"
                        v-bind:class="{ disabled: !appContext.formDirty }">
                        Save
                    </li>
                </ul>
            </div>
        </div>
        <div class="row my-2 mx-0 px-0">
            <div class="col-md-6 col-xs-12 mpr-0 float-right text-right">
                <div class="navbar navbar-none col-xs-12 px-0">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse col-xs-12 px-0">
                            <ul class="nav navbar-nav navbar-right px-0">
                                <li class="nav-link enabled mx-4 px-3"
                                    v-tooltip.top.end="{
                                        content:'Start over. This will clear your application!', 
                                        delay: 400
                                    }"
                                    v-on:click.stop.prevent="cancel">
                                    Cancel
                                </li>
                                <li class="nav-link active px-3"
                                    v-tooltip.bottom.end="{
                                        content:saveMsg, 
                                        delay: 400
                                    }"
                                    v-on:click.stop.prevent="save"
                                    v-bind:class="{ disabled: !appContext.formDirty }">
                                    Save
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "appNavigation",
    data() {
        return {
            menuClicked: false,
        }
    },
    methods: {
        prevClick: function() {
            this.$emit('prevClick');
        },
        nextClick: function() {
            this.$emit('nextClick');
        },
        startClick: function() {
            this.$emit('startClick');
        },
        page2Click: function() {
            this.$emit('page2Click');
        },
        waiverClick: function() {
            this.$emit('waiverClick');
        },
        confirmClick: function() {
            this.$emit('confirmClick');
        },
        save: function() {
            this.$emit('saveClick');
        },
        cancel: function() {
            this.$emit('cancelClick');
        },
        toggleMenu: function(){
            this.menuClicked = !this.menuClicked
        },
    },
    computed: {
        appContext() {
            return this.$store.state.applicationContext;
        },
        page1: function() {
            return this.appContext.formCurrPage === 0;
        },
        saveMsg: function() {
            if (this.appContext.formDirty) {
                return 'Temporarily save your progress. Your application will NOT be submitted.'
            }
            else {
                return 'Application Saved.'
            }
        }
    }
}
</script>

<style scoped>
    .menu-top.mobile, 
    .menu-top.smartphone, 
    .menu-small-screen.tablet,
    .menu-small-screen.desktop,
    .menu-small-screen.other {
        display: none;
    }
    .navbar {
        min-height: auto;
        margin-bottom: 0;
    }
    .navbar-collapse {
        width: 100% !important;
    }
    .nav-link.active {
        color: black;
        font-weight: bolder;
        border-bottom: 2px solid var(--brand-warning);
    }
    .nav-link.active:hover {
        cursor: pointer;
    }
    .nav-link.disabled {
        color: gray;
    }
    .nav-link.enabled:not(.active):hover {
        cursor: pointer;
        color: var(--brand-primary);
        font-weight: bolder;
        border-bottom: 2px solid var(--brand-primary) !important;
    }
    .nav-link.disabled:hover {
        cursor: not-allowed;
        border-bottom: none !important;
    }
    .hide-menu {
        display: none;
    }
    .show-menu {
        width: 100%;
        visibility: visible;
        background-color: var(--light-light-orange);
    }
    /* .sticky {
        margin-top: 0;
        display: block;

        position: sticky;
    } */
</style>


