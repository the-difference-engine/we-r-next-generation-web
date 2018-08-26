<template>
    <div class="container-fluid">
        <div :class="$mq" 
            class="row my-6 mx-0 px-0 small-screen-left">
            <div v-if="appContext.appType == 'camper'"
                class="row mx-0 px-0">
                <div class="row col-xs-12 my-2 mx-0 px-0">
                    <input-label-div-large label="Child's Name"></input-label-div-large>
                    <div class="col-md-9 mx-0 px-0 align-middle text-left">
                        {{appState.childName}}
                    </div>
                </div>
                <div class="row col-xs-12 my-2 mx-0 px-0">
                    <input-label-div-large label="Gender"></input-label-div-large>
                    <div class="col-md-9 mx-0 px-0 align-middle text-left">
                        {{appState.childGender}}
                    </div>
                </div>
                <div class="row col-xs-12 my-2 mx-0 px-0">
                    <input-label-div-large label="Child's Age"></input-label-div-large>
                    <div class="col-md-9 mx-0 px-0 align-middle text-left">
                        {{appState.childAge}}
                    </div>
                </div>
            </div>
            <div class="row mx-0 px-0" v-if="appContext.appType === 'partner'">
                <div class="row col-xs-12 my-2 mx-0 px-0">
                    {{appState.companyName}}
                </div>
                <div class="row col-xs-12 my-2 mx-0 px-0">
                    {{appState.companyUrl}}
                </div>
                <div class="row col-xs-12 my-2 mx-0 px-0">
                    {{appState.companyLogo}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="Street Address 1"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.address1}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="Street Address 2"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.address2}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="City"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.city}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="State/ Province"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.stateProvince}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="Postal Code"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.zipCode}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="Country"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.countryName}}
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="Phone Number"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.phoneNumber}}
                </div>
            </div>
        </div>
        <hr class="my-6">
        <div class="row my-6 mx-0 px-0">
            <div v-if="appContext.appType !== 'partner'" class="row col-xs-12 my-2 mx-0 px-0">
                <input-label-div-large label="Selected Camp"></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle text-left">
                    {{appState.chosenCampName}}
                </div>
            </div>
            <div v-if="appContext.appType == 'camper'"
                class="row col-xs-12 my-6 mx-0 px-0">
                <input-label-div-large label=""></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle">
                    <div class="row mx-0 px-0">
                        <h4 class="font-weight-bold">How do you think your child could benefit from Creativity Camp?</h4>
                    </div>
                    <div class="row mx-0 px-0 text-left">
                        {{appState.bioCamper}}
                    </div>
                </div>
            </div>
            <div v-if="appContext.appType == 'volunteer'"
                class="row col-xs-12 my-6 mx-0 px-0">
                <input-label-div-large label=""></input-label-div-large>
                <div class="col-md-9 mx-0 px-0 align-middle">
                    <div class="row mx-0 px-0">
                        <h4 class="font-weight-bold">Please tell us a little bit about yourself:</h4>
                    </div>
                    <div class="row mx-0 px-0 text-left">
                        {{appState.bioVolunteer}}
                    </div>
                </div>
            </div>
            <div v-if="appContext.appType == 'partner'"
                class="row col-xs-12 my-6 mx-0 px-0">
                <div class="col-md-10 my-6 mx-0 px-0 align-middle">
                    <div class="row mx-0 px-0">
                        <h4 class="font-weight-bold text-left">Provide a description about your organization that you would like to show on our website:</h4>
                    </div>
                    <div class="row mx-0 px-0 text-left">
                        {{appState.companyDescription}}
                    </div>
                </div>
                <div class="col-md-10 my-6 mx-0 px-0 align-middle">
                    <div class="row mx-0 px-0">
                        <h4 class="font-weight-bold text-left">Tell us more information about how and why you would like to partner with our organization:</h4>
                    </div>
                    <div class="row mx-0 px-0 text-left">
                        {{appState.companyNote}}
                    </div>
                </div>
            </div>
        </div>
        <hr class="my-6">
        <div v-if="appContext.appType !== 'partner'" ref="waiver" class="row waiver mx-auto px-0">
            <div class="row col-xs-12 my-6 mx-0 px-0">
                <h3 ref="waiverTitle">{{waiver.title}}</h3>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <p class="col-md-12 text-left mx-0 px-0 my-3">
                    <span ref="waiverHeader0">{{waiver.header[0]}}</span>
                    <span class="mx-2 font-size-2">
                        <u ref="waiverDateString">{{getDateAsString()}}</u>
                    </span>
                    <span v-if="appContext.appType == 'camper'">
                        <span ref="waiverHeader1">{{waiver.header[1]}}</span>
                        <span class="mx-2 font-size-2">
                            <u ref="waiverChildName">{{appState.childName}}</u>
                        </span>
                        <span ref="waiverHeader2">{{waiver.header[2]}}</span>
                        <span class="mx-2 font-size-2">
                            <u ref="waiverFullName">{{profile.full_name}}</u>
                        </span>
                        <span ref="waiverHeader3">{{waiver.header[3]}}</span>
                    </span>
                    <span v-if="appContext.appType == 'volunteer'">
                        <span>(date) by</span>
                        <span class="mx-2 font-size-2">
                            <u>{{profile.full_name}}</u>
                        </span>
                        <span>(“Volunteer”), releases</span>
                        <span>{{waiver.header[1]}}</span>
                        <span>{{waiver.header[2]}}</span>
                    </span>
                </p>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <p class="col-md-12 text-left mx-0 px-0 my-3">
                    <span>Please initial your agreement with each item below.</span>
                </p>
            </div>
            <div class="row col-xs-12 text-left my-3">
                <div v-for='index in waiver.items.length' 
                    v-bind:key="index-1"
                    class="row col-xs-12 mx-0 px-0 my-3"
                ><div class="col-xs-4 col-sm-1 text-right align-middle">
                        <span ref="waiverItemNumbers">
                            {{waiver.items[index-1].order}}
                        </span>.
                    </div>
                    <div class="col-xs-7 col-sm-1 pr-0 text-center align-middle">
                        <span ref="waiverInitials">
                            {{waiver.initials[index-1]}}
                        </span>
                    </div>
                    <div class="col-xs-12 col-sm-9 text-left align-middle">
                        <span class="mr-2">
                            <strong><u>
                                <span ref="waiverItemTitles">
                                    {{waiver.items[index-1].title}}:
                                </span>
                            </u></strong>
                        </span>
                        <span ref="waiverItemTexts">
                            {{waiver.items[index-1].text}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row col-xs-12 my-2 mx-0 px-0">
                <p class="col-md-12 text-left mx-0 px-0 my-3">
                    <span ref="waiverFooter">{{waiver.footer}}</span>
                </p>
            </div>
            <div class="row col-md-12 my-5">
                <div :class="$mq" class="col-md-8 small-screen-left">
                    <label class="form-label row mx-0 px-0">Please type your full name*:</label>
                    <span ref="waiverSignature" class="row">
                        {{waiver.signature}}
                    </span>
                    <small class="row mx-0 px-0">* If you are under 18, your parent/guardian must sign for you.</small>
                </div>
                <div :class="$mq" class="col-md-4 small-screen-left">
                    <label class="form-label row mx-0 px-0">Today's Date (mm/dd/yyyy):</label>
                    <span ref="waiverSignedDate" class="row">
                        {{waiver.signedDate}}
                    </span>
                </div>
            </div>
        </div>
        <div class="row my-10 mx-0 px-0">
            <button 
                class="col-md-5 col-xs-11 btn btn-warning text-white mx-auto" 
                v-on:click.prevent.stop="submitClick"
                v-bind:disabled="!appContext.canSubmit">
                <span class="mx-1 font-size-2 font-weight-bold">Submit</span>
                <span class="glyphicon glyphicon-ok font-size-2 mx-4" aria-hidden="false" aria-label="Submit" title="Submit"></span>
            </button>
        </div>
    </div>
</template>

<script>
import inputLabelDivLarge from "./forms/inputLabelDivLarge";
import inputLabelDivSmall from "./forms/inputLabelDivSmall";
import swal from 'sweetalert2';
export default {
	name: "appConfirm",
	components: {
        inputLabelDivSmall,
        inputLabelDivLarge,
	},
	props: {
		formFieldList: {
			type: Array,
        },
	},
	data() {
		return {
			isPrevious: true,
			isNext: false,
            readonly: true,
            waiver: {
                header: [],
                items: [],
                initials: [],
            },
            componentReady: false,
		};
    },
	methods: {
        verifyPermission: function() {
            if (!this.appContext.canSubmit) {
                swal({
                    title: 'Permission Denied',
                    text: 'You must complete the form before you proceed to this page.',
                    type: 'warning'
                })
                this.$router.push(this.appContext.startRoute);
            } else {
                this.setWaiverForSumbit();
                this.$emit('submitClick');
            }
        },
		contextSetup: function() {
            this.appContext.isPrevious = this.isPrevious;
            this.appContext.isNext = this.isNext;
            this.appContext.nextRoute = "";
            if (this.appContext.appType !== 'partner') {
                this.appContext.formCurrPage = 3;
                this.appContext.prevRoute = this.appContext.routeWaiver;
            } else {
                this.appContext.formCurrPage = 2;
                this.appContext.prevRoute = this.appContext.routePage2;
            }
        },
        waiverSetup: function() {
            // determine whether to use camper or volunteer waiver
            return new Promise(
                (resolve, reject) => {
                    if (this.appContext.appType === 'camper') {
                        this.waiver = this.appState.waiverCamper;
                    }
                    else if (this.appContext.appType === 'volunteer') {
                        this.waiver = this.appState.waiverVolunteer;
                    }
                    resolve(true);
                }
            )
        },
        setWaiverForSumbit: function() {
            if (this.appContext.appType !== 'partner') {
                this.appState.waiverForm = this.$refs.waiver.innerHTML;
            } else {
                this.appState.waiverForm = {}
            }
        },
		getDateAsString() {
			// initializes today's date as readable string
			const monthNames = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			];
			let dt = new Date(this.waiver.signedDate);
			let day = dt.getDate() + 1;
			let month = monthNames[dt.getMonth()];
			let year = dt.getFullYear();
			return month + " " + day + ", " + year;
        },
        submitClick: function() {
            this.verifyPermission();
        }
    },
	computed: {
		appState: {
			get: function() {
				return this.$store.state.applicationData;
			},
			set: function(value) {
				this.$store.commit("APPLICATION", value);
			}
		},
		appContext: {
            get: function() {
                return this.$store.state.applicationContext;
            },
            set: function(value) {
				this.$store.commit("APPCONTEXT", value);
            }
		},
		profile() {
			return this.$store.state.userInfo;
        },
    },
	created: function() {
        this.contextSetup();
        this.$emit('updateData');
        this.$store.watch(
            (state) => {
                // when the parent loads saved application data to state
                // it will set the dataReady flag
                return this.$store.state.applicationContext.dataReady;
            },
            (newValue, oldValue)=>{
                this.waiverSetup();
            },
        )
    },
    mounted: function() {
        this.componentReady = true;
        if (this.$store.state.applicationContext.dataReady) {
            this.waiverSetup();
        }
    },
    beforeRouteLeave: function(to, from, next) {
        // the componentReady flag is used to prevent
        // the state dataReady watcher (above) from
        // firing when the parent component retrieves from local
        // storage again
        // set it to false when leaving this component
        this.componentReady = false;
        next();
    }
};
</script>

<style scoped lang="postcss">
	.col-xs-2.smartphone,
	.col-xs-2.mobile {
		display: none !important;
	}
</style>
