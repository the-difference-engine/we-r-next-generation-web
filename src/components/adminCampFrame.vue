<template>
    <div :class="$mq" class="container-fluid my-5 mx-auto px-0 small-screen">
        <div ref="mainContent" class="main-content mx-0 px-0"
            v-bind:style="{ 
                maxHeight : mainContentMaxHeight,
                minHeight : mainContentMinHeight
            }"
            v-bind:class="{ 
                'main-content-open-small' : !hideCamps && (
                    $mq == 'smartphone' || $mq == 'mobile' || $mq == 'tablet'),
                'main-content-open' : !hideCamps && (
                    $mq == 'desktop' ||  $mq == 'other'),
            }">
            <div ref="campNavBar" class="row mx-0 px-0">
                <div v-if="campRoute != 'create'" class="row my-2 mx-0 px-0 text-right">
                    <router-link :to="{ name: 'campCreate' }">
                        Create a New Camp Session
                    </router-link>
                </div>
                <div class="row my-3 mx-0 px-0">
                    <div v-if="campRoute === 'edit'" class="mx-0 px-0 text-left"
                        v-bind:class="{
                            'col-xs-6' : !toggleCampsWideClass,
                            'col-xs-12 my-2' : toggleCampsWideClass,
                        }"
                        ><button class="btn btn-bblue"
                            v-on:click.stop.prevent="toggleCampers"
                            v-bind:class="{ 
                                'btn-warning': hideCampers, 
                                'btn-primary': !hideCampers }">
                                {{viewCampersBtn}}
                                <span class="glyphicon glyphicon-user pl-3"></span>
                        </button>
                    </div>
                    <div class="mx-0 px-0"
                        v-bind:class="{
                            'col-xs-6 text-right' : !toggleCampsWideClass,
                            'col-xs-12 text-left' : toggleCampsWideClass && (
                                $mq == 'smartphone' || $mq == 'mobile' || $mq == 'tablet'
                            ),
                            'col-xs-12 text-right' : toggleCampsWideClass && (
                                $mq == 'desktop' || $mq == 'other'
                            ),
                        }"
                        ><button class="btn btn-bblue px-2"
                            v-on:click.stop.prevent="toggleCamps"
                            v-bind:class="{ 
                                'btn-warning': hideCamps, 
                                'btn-primary': !hideCamps }">
                                <span class="glyphicon glyphicon-tent pr-3"></span>
                                {{viewCampsBtn}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mx-0 px-0">
                <router-view
                    v-bind="routerProps"
                    v-on:campRoute="campRoute = $event"
                ></router-view>
            </div>
        </div>
        <div class="sidenav mx-0 px-0"
            v-bind:style="{ 
                maxHeight : sidebarMaxHeight,
                minHeight : sidebarMinHeight
            }"
            v-bind:class="{ 
                'sidenav-open-small' : !hideCamps && (
                    $mq == 'smartphone' || $mq == 'mobile' || $mq == 'tablet'),
                'sidenav-open' : !hideCamps && (
                    $mq == 'desktop' || $mq == 'other'),
                'sidenav-close' : hideCamps,
            }"
        >
            <div ref="sidebar" class="col-xs-11 sidenav-content mx-auto px-0">
                <admin-camp-sidebar 
                    :route-changed="routeChanging"
                    v-on:toggleCamps="toggleCamps"
                    v-on:campFrameResize="evalFrameHeights"
                ></admin-camp-sidebar>
            </div>
        </div>
    </div>
</template>
<script>
import adminCampSidebar from './camps/adminCampSidebar.vue';
export default {
    name: 'adminCampFrame',
    components: {
        adminCampSidebar
    },
    data () {
        return {
            campRoute: '',
            navbarHeight: 0,
            routeChanging: false,
            hideCamps: false,
            hideCampers: false,
            frameHeight: null,
            sidebarHeight: null,
            sidebarMaxHeight: 'none',
            sidebarMinHeight: 0,
            mainContentHeight: null,
            mainContentMaxHeight: 'none',
            mainContentMinHeight: 'none',
        }
    },
    watch: {
        campRoute(val) {
            // when campRoute changes, revaluate if camps should
            // hide on a desktop view
            this.hideCampsOnDesktop();
        }
    },
    methods: {
        toggleCamps: function() {
            this.hideCamps = !this.hideCamps;
            if (this.$mq == 'desktop' && this.campRoute == 'edit') {
                this.hideCampers = !this.hideCampers;
            }
            this.evalFrameHeights();
        },
        hideCampsOnDesktop: function(toRoute=null) {
            // hide camps sidebar if the initial screen is
            // a desktop size and the page is edit
            // (camps sidebar and campers sidebar
            // cannot both fit on a desktop screen size)
            if (this.$mq == 'desktop' && this.campRoute == 'edit') {
                this.hideCamps = true;
            }
            else {
                this.hideCamps = false;
            }
        },
        toggleCampers: function() {
            if (this.$mq == 'desktop' && this.hideCampers == true) {
                // campers are about to be shown on a desktop screen
                this.hideCamps = true;
            }
            this.hideCampers = !this.hideCampers;
            this.evalFrameHeights();
        },
        clearHLimits: function() {
            this.sidebarMaxHeight = 'none';
            this.sidebarMinHeight = 'none';
            this.mainContentMinHeight = 0;
            this.mainContentMaxHeight = 'none';
        },
        getSidebarHeight: function() {
            this.sidebarHeight = this.$refs.sidebar.clientHeight + 100;
            this.mainContentMaxHeight = this.sidebarHeight + 'px';
            if (!this.hideCamps) {
                this.sidebarMinHeight = this.sidebarHeight + 'px';
                this.mainContentMinHeight = this.sidebarHeight + 'px';
            }
        },
        getMainContentHeight: function() {
            this.mainContentHeight = this.$refs.mainContent.clientHeight;
            this.sidebarMaxHeight = this.mainContentHeight + 'px';
        },
        evalFrameHeights: function() {
            // if camps are hidden, then clear the max-height limits
            this.clearHLimits();
            this.getCampNavHeight();    // get height of navbar
            if (!this.hideCamps) {
                // if camps are shown, set main content or sidebar height
                this.setFrameHeight();
            }
        },
        setFrameHeight: function() {
            if (this.$mq == 'mobile' || this.$mq == 'smartphone' || this.$mq == 'tablet') {
                // if camps are currently shown and the screen size is small,
                // then limit the main content height to the height of the sidebar
                setTimeout(() => {
                    this.getSidebarHeight();
                }, 1100)
            } else {
                // if camps are currently shown with main content visible
                // (screen size is desktop or other), then limit
                // the sidebar height to the main content height
                setTimeout(() => {
                    this.getMainContentHeight();
                }, 1100)
            }
        },
        getCampNavHeight: function() {
            this.navbarHeight = this.$refs.campNavBar.clientHeight;
        },
    },
    computed: {
        viewCampsBtn: function() {
            if (this.hideCamps == true) { 
                return "Show Camp Sessions";
            } else { return "Hide Camp Sessions" }
        },
        viewCampersBtn: function() {
            if (this.hideCampers == true) { 
                return "Show Campers & Volunteers";
            } else { return "Hide Campers & Volunteers" }
        },
        toggleCampsWideClass: function() {
            if (this.campRoute !== 'edit') {
                return true;
            } else if (this.$mq == 'smartphone' || this.$mq == 'mobile' || this.$mq == 'tablet') {
                return true;
            } else {
                return false;
            }
        },
        routerProps: function() {
            if (this.$route.name === 'campEdit') {
                return {
                    campNavHeight : this.navbarHeight,
                    hideCampers : this.hideCampers,
                    routeChanging : this.routeChanging,
                }
            } else if (this.$route.name === 'campCreate') {
                return {
                    routeChanging : this.routeChanging,
                }
            }
        },
    },
    created: function() {
        if (this.$mq == 'smartphone' || this.$mq == 'mobile') {
            // if small screen -- do not show camps on page load
            this.hideCamps = true;
        }
    },
    mounted: function() {
        this.evalFrameHeights();
        window.addEventListener('resize', this.evalFrameHeights);
    },
    beforeRouteUpdate: function(to, from, next) {
        this.routeChanging = true;
        setTimeout(() => {
            this.evalFrameHeights();
            this.routeChanging = false;
        }, 500);
        next();
    },
}
</script>

<style scoped>
    .small-screen.mobile,
    .small-screen.tablet {
        margin: auto 10px;
        padding: auto 0px;
    }

    .container-fluid {
        overflow-y: hidden;
    }

    /* Side navigation menu for Camps */
    .sidenav {
        height: 100%; /* 100% Full-height */
        width: 0; /* 0 width - changes when selected */
        position: absolute; /* Stay in place relative to parent */
        z-index: 2; /* Stay on top */
        top: 0; /* Stay at the top */
        right: 0;
        background-color: #111; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }

    .sidenav-open {
        width: 350px;
        padding: 15px 10px; /* Place content 15px from the top */
        background-color: var(--brand-bblue-fade-5);
        border: 1px solid var(--brand-primary);
    }
    .sidenav-open-small {
        width: 100%;
        padding: 20px 10px; /* Place content 20px from the top */
        background-color: var(--brand-bblue-fade-8);
    }
    .sidenav-open-tablet {
        width: 50%;
        padding: 20px 10px; /* Place content 20px from the top */
        background-color: var(--brand-bblue);
    }
    .sidenav-close {
        width: 0;
        background-color: white;
    }

    /* Style page content - Push the page content to the left 
        when side navigation opens */
    .main-content {
        transition: margin-right .5s;
        padding: 20px;
    }
    .main-content-open {
        margin-right: 350px;
    }
    .main-content-open-small {
        margin-right: 100%;
        visibility: hidden;
        transition: visibility 0.25s, margin-right 0.5s;
    }
    .main-content-open-tablet {
        margin-right: 50%;
    }

    /* On smaller screens, where height is less than 450px, 
        change the style of the sidenav 
        (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }

    /* Scrollbar Handle */
    .sidenav::-webkit-scrollbar-thumb {
        background: var(--brand-bblue); 
        border-radius: 10px;
    }
    /* Scrollbar Handle on hover */
    .sidenav::-webkit-scrollbar-thumb:hover {
        background: var(--brand-bblue-fade-5); 
    }

    button.btn-bblue:hover {
        background-color: var(--brand-bblue-fade-8);
    }

</style>


