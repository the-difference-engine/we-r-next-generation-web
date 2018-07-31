<template>
    <!-- 
        View campers in a sidebar on left
        and camp session view and edit on the right (center) 
    -->
    <div :class="$mq" class="container-fluid mx-0 px-0">
        <div class="row mx-0 px-0">
            <div class="camper-sidenav mx-0 px-0"
                v-bind:style="{ 
                    maxHeight : sidebarMaxHeight,
                    minHeight : sidebarMinHeight,
                    top : navBarHeight+'px',
                }"
                v-bind:class="{ 
                    'camper-sidenav-open-small' : !hideCamperBar && (
                        $mq == 'smartphone' || $mq == 'mobile'),
                    'camper-sidenav-open-tablet' : !hideCamperBar && $mq == 'tablet',
                    'camper-sidenav-open' : !hideCamperBar && (
                        $mq == 'desktop' || $mq == 'other'),
                    'camper-sidenav-close' : hideCamperBar,
                }">
                <div ref="camperSidebar" class="camper-sidenav-content mx-auto px-0">
                    <admin-campers-of-camp 
                        :route-changing="routeChanged"
                    ></admin-campers-of-camp>
                </div>
            </div><!-- Comment to remove white space in row! 
            --><div ref="campContent" class="camp-content mx-0 px-0"
                v-bind:style="{ 
                    maxHeight : campContentMaxHeight,
                    minHeight : campContentMinHeight
                }"
                v-bind:class="{ 
                    'camp-content-open-small' : !hideCamperBar && (
                        $mq == 'smartphone' || $mq == 'mobile'),
                    'camp-content-open-tablet' : !hideCamperBar && $mq == 'tablet',
                    'camp-content-open' : !hideCamperBar && (
                        $mq == 'desktop' ||  $mq == 'other'),
                }">
                <h1 class="big">View and Edit Camp</h1>
                <hr>
                <admin-camp-form
                    :camp-route="campRoute"
                    :route-changing="routeChanged"
                ></admin-camp-form>
            </div>
        </div>
    </div>
</template>
<script>
import adminCampersOfCamp from './camps/adminCampersOfCamp.vue';
import adminCampForm from './camps/adminCampForm.vue';
export default {
    name: 'adminCampEdit',
    components: {
        adminCampersOfCamp,
        adminCampForm,
    },
    props: {
        hideCampers: {
            type: Boolean,
            default: false,
        },
        routeChanging: {
            type: Boolean,
            default: false,
        },
        campNavHeight: {
            type: Number,
        },
    },
    data () {
        return {
            hideCamperBar: false,
            campRoute: 'edit',
            navBarHeight: 0,
            routeChanged: false,
            frameHeight: null,
            sidebarHeight: null,
            sidebarMaxHeight: 'none',
            sidebarMinHeight: 0,
            campContentHeight: null,
            campContentMaxHeight: 'none',
            campContentMinHeight: 'none',
        }
    },
    watch: {
        hideCampers: function(val) {
            this.hideCamperBar = val;
        },
        routeChanging: function(val) {
            this.routeChanged = val;
        },
        campNavHeight: function(val) {
            this.setCampNavHeight();
        }
    },
    methods: {
        clearHLimits: function() {
            this.sidebarMaxHeight = 'none';
            this.sidebarMinHeight = 'none';
            this.campContentMinHeight = 0;
            this.campContentMaxHeight = 'none';
        },
        setCampNavHeight: function() {
            this.navBarHeight = this.campNavHeight + 20;
        },
        getSidebarHeight: function() {
            this.sidebarHeight = this.$refs.camperSidebar.clientHeight + 100;
            this.campContentMaxHeight = this.sidebarHeight + 'px';
            if (!this.hideCamperBar) {
                this.sidebarMinHeight = this.sidebarHeight + 'px';
                this.campContentMinHeight = this.sidebarHeight + 'px';
            }
        },
        getcampContentHeight: function() {
            this.campContentHeight = this.$refs.campContent.clientHeight;
            this.sidebarMaxHeight = this.campContentHeight + 'px';
        },
        evalFrameHeights: function() {
            // if campers are hidden, then clear the max-height limits
            this.clearHLimits();
            if (!this.hideCamperBar) {
                // if campers are shown, set main content or sidebar height
                this.setFrameHeight();
            }
        },
        setFrameHeight: function() {
            if (this.$mq == 'mobile' || this.$mq == 'smartphone') {
                // if campers are currently shown and the screen size is small,
                // then limit the main content height to the height of the sidebar
                setTimeout(() => {
                    this.getSidebarHeight();
                }, 1100)
            } else {
                // if campers are currently shown with main content visible
                // (screen size is tablet, desktop, or other), then limit
                // the sidebar height to the main content height
                setTimeout(() => {
                    this.getcampContentHeight();
                }, 1100)
            }
        },
    },
    computed: {
    },
    created: function() {
        if (this.$mq == 'smartphone' || this.$mq == 'mobile') {
            // if small screen -- do not show camps on page load
            this.hideCamperBar = true;
        }
        this.$emit('campRoute', this.campRoute);
    },
    mounted: function() {
        this.setCampNavHeight();
        this.evalFrameHeights();
        window.addEventListener('resize', this.evalFrameHeights);
    },
}
</script>

<style scoped>
    .container-fluid {
        overflow-y: hidden;
    }

    /* Side navigation menu for Camps */
    .camper-sidenav {
        height: 100%; /* 100% Full-height */
        width: 0; /* 0 width - changes when selected */
        position: absolute; /* Stay in place relative to parent */
        z-index: 2; /* Stay on top */
        left: 0;
        background-color: #111; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }

    .camper-sidenav-open {
        width: 375px;
        padding: 15px 10px; /* Place content 15px from the top */
        background-color: var(--brand-bblue-fade-5);
        border: 1px solid var(--brand-primary);
    }
    .camper-sidenav-open-small {
        width: 100%;
        padding: 20px 10px; /* Place content 20px from the top */
        background-color: var(--brand-bblue-fade-8);
    }
    .camper-sidenav-open-tablet {
        width: 50%;
        padding: 20px 10px; /* Place content 20px from the top */
        background-color: var(--brand-bblue);
    }
    .camper-sidenav-close {
        width: 0;
        background-color: white;
    }

    /* Style page content - Push the page content to the left 
        when side navigation opens */
    .camp-content {
        transition: margin-left .5s;
    }
    .camp-content-open {
        margin-left: 375px;
    }
    .camp-content-open-small {
        margin-left: 100%;
        visibility: hidden;
        transition: visibility 0.25s, margin-left 0.5s;
    }
    .camp-content-open-tablet {
        margin-left: 50%;
    }

    /* On smaller screens, where height is less than 450px, 
        change the style of the sidenav 
        (less padding and a smaller font size) */
    @media screen and (max-height: 450px) {
        .camper-sidenav {padding-top: 15px;}
        .camper-sidenav a {font-size: 18px;}
    }

    /* Scrollbar Handle */
    .camper-sidenav::-webkit-scrollbar-thumb {
        background: var(--brand-bblue); 
        border-radius: 10px;
    }
    /* Scrollbar Handle on hover */
    .camper-sidenav::-webkit-scrollbar-thumb:hover {
        background: var(--brand-bblue-fade-5); 
    }

</style>



