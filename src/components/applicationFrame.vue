<template>
	<div class="container-fluid col-md-11 col-xs-12 mx-auto">
		<div id="app-title" class="row my-1 mx-0 px-0">
			<h1>{{appContext.title}}</h1>
			<hr>
		</div>
		<div class="row mx-0 px-0">
			<div class="col-sm-6 col-xs-12 mx-0 px-0 text-left">
				<label>Applicant's Name:</label>
				{{profile.full_name}}
			</div>
			<div :class="$mq" class="email col-sm-6 col-xs-12 mx-0 px-0">
				<label for="inputEmail">Applicant Email:</label>
				{{profile.email}}
			</div>
		</div>
        <app-navigation
			v-on:prevClick="prevClick"
			v-on:nextClick="nextClick"
			v-on:startClick="startClick"
			v-on:page2Click="page2Click"
			v-on:waiverClick="waiverClick"
			v-on:confirmClick="confirmClick"
			v-on:saveClick="saveClick"
			v-on:cancelClick="cancelClick"
		></app-navigation>
		<div class="row my-8 mx-0 px-0">
			<div class="p-2 border-all" 
				v-bind:class="{ 'border-danger': appContext.formInvalid }">
				<router-view 
					:routeUpdate="routeUpdate"
					v-on:appType="setTitle"
					v-on:updateData="updateData"
					v-on:submitClick="submitClick"
				></router-view>
			</div>
		</div>
        {{evalCanSubmit}}
	</div>
</template>

<style scoped>
	.email.mobile, .email.smartphone {
		text-align: left;
	}
	.email.tablet, .email.desktop, .email.other {
		text-align: right;
	}
	table > tbody > tr > td {
		vertical-align: top !important;
		padding-top: 1em !important;
		padding-bottom: 1em !important;
	}
	.waiver{
		margin-top: 30px !important;
		margin-bottom: 30px !important;
		max-width: 950px;
		padding: 20px;
		border: 2px solid gray;
	}
	.hide-me {
		display: none;
	}
	input {
		text-align: center;
	}
	textarea {
		text-align: center;
	}
	select {
		width:50%;
		margin-left: 25%;
		text-align: center;
		text-align-last: center;
	}
</style>


<script>
	import localforage from '../sessionUtils';
	import axios from 'axios';
	import _ from 'lodash';
	import swal from 'sweetalert2';
    import appNavigation from './applications/applicationNav.vue';
	export default {
		name: 'appFrame',
		components: {
			appNavigation
		},
		data () {
			return {
				setup: false,
				appType: '',
				routeUpdate: false,
			}
		},
		methods: {
			blankAppState: function() {
				let countryName = '';
				this.$store.dispatch('getCountryNameFromKey', this.profile.country)
				.then(name => {
					countryName = name;
				})
                // resets all app state fields to original blank state
				return {
					childName: '',
					childAge: '',
					childGender: '',
					address1: this.profile.address1,
					address2: this.profile.address2,
					city: this.profile.city,
					stateProvince: this.profile.state_province,
					zipCode: this.profile.zip_code,
					country: this.profile.country,
					countryName: countryName,
					phoneNumber: this.profile.phone_number,
					bioCamper: '',
					bioVolunteer: '',
					chosenCamp: '',
					chosenCampName: '',
					camps: [
						{
							text: '',
							value: ''
						},
					],
					campsIdx: {},

					// company data fields
					companyName: '',
					companyLogo: '',
					companyUrl: '',
					companyDescription: '',
					companyNote: '',

					waiverForm: '',

					waiverCamper: {
						title: '',
						header: [],
						items: [],
						footer: '',

						initials: [],
						signature: '',
						signedDate: '',
					},
					waiverVolunteer: {
						title: '',
						header: [],
						items: [],
						footer: '',

						initials: [],
						signature: '',
						signedDate: '',
					}
				}
			},
            resetAppState: function() {
				return new Promise(
					(resolve, reject) => {
						// clear saved app data
						let lfKey = 'appData-' + this.appType;
						localforage.removeItem(lfKey)
						.then(res => {
                            // reset app data and get camps
                            this.appState = this.blankAppState();
                        })
                        .then(res => {
                            this.getCamps();
                        })
                        .then(res => {
                            resolve(true);
                        });
					}
				)
            },
            resetAppContext: function() {
				return new Promise(
					(resolve, reject) => {
						// reset form context for validation
						this.appContext.formPristine = true;
						this.appContext.formDirty = false;
						this.appContext.formInvalid = false;
						this.appContext.formComplete = false;
						if (this.appContext.appType !== 'partner') {
							this.appContext.pagesComplete = [false, false, false];
						} else {
							this.appContext.pagesComplete = [false, false];
						}
						this.appContext.canSubmit = false;
						resolve(true);
					}
				)
            },
			updateData: function(newData) {
				if (this.setup) {
					// do not update data in the first few seconds
					// of setup while components are loading
					this.appContext.formPristine = false;
					this.debouncedAutoSave()	// auto save with debounce
				}
			},
			prevClick: function() {
				this.saveByPromise().then(res => {
                    this.$router.push(this.appContext.prevRoute);
				});
			},
			nextClick: function() {
				this.saveByPromise().then(res => {
					this.$router.push(this.appContext.nextRoute);
				});
			},
			startClick: function() {
				this.saveByPromise().then(res => {
					this.$router.push(this.appContext.startRoute);
				});
			},
			page2Click: function() {
				if (this.appContext.pagesComplete[0]) {
					this.saveByPromise().then(res => {
						this.$router.push(this.appContext.routePage2);
					});
				}
			},
			waiverClick: function() {
				if (this.appContext.pagesComplete[0] && this.appContext.pagesComplete[1]) {
					this.saveByPromise().then(res => {
						this.$router.push(this.appContext.routeWaiver);
					});
				}
			},
			confirmClick: function() {
				if (this.appContext.canSubmit) {
					this.saveByPromise().then(res => {
						this.$router.push(this.appContext.routeConfirm);
					});
				}
			},
			cancelClick: function() {
				// this will start the application over again
                // request user confirmation before continuing
				swal({
					title: 'Are you sure?',
					text: "This will clear your entire application! You won't be able to revert this!",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, continue!'
				}).then((result) => {
					if (result.value) {
                        this.resetAppState()
                        .then(res => {
							let startRoute = this.appContext.startRoute;
                            this.resetAppContext()
                            .then(res => {
								this.saveByPromise();
                            }).then(res => {
                                swal(
                                    'Deleted!',
                                    'Your application is starting over.',
                                    'success'
								);
                                this.$router.push(startRoute);
                            })
                        })
					}
				});
			},
			saveClick: function() {
				this.saveByPromise()
				.then(res => {
					swal({
						title: 'Saved!',
						text: "Your application was saved temporarily, but it was not submitted to our server. When you return to this page, you may continue where you left off.",
						type: 'success',
					});
				})
			},
			getTodayDate: function() {
				let today = new Date();
				let day = this.doubleDigitDate(today.getDate());
				let month = this.doubleDigitDate(today.getMonth() + 1);
				let year = today.getFullYear();
				return year + '-' + month + '-' + day;
			},
			doubleDigitDate: function(num) {
				return num < 10 ? '0' + num : num;
			},
			constCamperApp: function() {
				return {
					profileId: this.profile._id.$oid,
					full_name: this.profile.full_name,
					email: this.profile.email,
					address_line_1: this.appState.address1,
					address_line_2: this.appState.address2,
					city: this.appState.city,
					state_province: this.appState.stateProvince,
					zip_code: this.appState.zipCode,
					country: this.appState.country,
					phone_number: this.appState.phoneNumber,
					childName: this.appState.childName,
					age: this.appState.childAge,
					gender: this.appState.childGender,
					bio: this.appState.bioCamper,
					camp: this.appState.chosenCamp,
					date_signed: this.appState.waiverCamper.signedDate,
					type: 'camper',
					status: 'submitted'
				}
			},
			constVolunteerApp: function() {
				return {
					profileId: this.profile._id.$oid,
					full_name: this.profile.full_name,
					email: this.profile.email,
					address_line_1: this.appState.address1,
					address_line_2: this.appState.address2,
					city: this.appState.city,
					state_province: this.appState.stateProvince,
					zip_code: this.appState.zipCode,
					country: this.appState.country,
					phone_number: this.appState.phoneNumber,
					bio: this.appState.bioCamper,
					camp: this.appState.chosenCamp,
					date_signed: this.appState.waiverVolunteer.signedDate,
					type: 'volunteer',
					status: 'submitted'
				}
			},
			constPartnerApp: function() {
				return {
					profileId: this.profile._id.$oid,
					companyName: this.appState.companyName,
					email: this.profile.email,
					address_line_1: this.appState.address1,
					address_line_2: this.appState.address2,
					city: this.appState.city,
					state_province: this.appState.stateProvince,
					zip_code: this.appState.zipCode,
					country: this.appState.country,
					phone_number: this.appState.phoneNumber,
					companyLogo: this.appState.companyLogo,
					companyUrl: this.appState.companyUrl,
					bio: this.appState.companyDescription,
					appNote: this.appState.companyNote,
					date_signed: this.getTodayDate(),
					type: 'partner',
					status: 'submitted'
				}
			},
			getApplication: function() {
				if (this.appContext.appType === 'camper') {
					return this.constCamperApp();
				} else if (this.appContext.appType === 'volunteer') {
					return this.constVolunteerApp();
				} else {
					return this.constPartnerApp();
				}
			},
			constWaiver: function() {
				if (this.appContext.appType === 'camper') {
					return {
						applicant: this.profile._id.$oid,
						waiver_form: this.appState.waiverForm,
						signed_by: this.appState.waiverCamper.signature,
						signed_date: this.appState.waiverCamper.signedDate
					}
				} else if (this.appContext.appType === 'volunteer') {
					return {
						applicant: this.profile._id.$oid,
						waiver_form: this.appState.waiverForm,
						signed_by: this.appState.waiverVolunteer.signature,
						signed_date: this.appState.waiverVolunteer.signedDate
					}
				} else {
					// application type is a partner; there is no waiver
					return {}
				}
			},
			submitRoute: function() {
				return (this.appContext.appType !== 'partner') ? '/api/v1/applications/waiver' : '/api/v1/applications'
			},
			submitParams: function() {
				return (this.appContext.appType !== 'partner') ? {
					application: this.getApplication(),
					waiver: this.constWaiver()
				} : this.getApplication()
			},
			submitClick: function() {
				// submit form to database
				localforage.getItem('X_TOKEN')
				.then(session => {
					axios.post(this.submitRoute(), {
						headers: {'x-token': session},
						params: this.submitParams()
					})
                    .then(res => {
                      // redirect to application submitted page -- API returns application ID
                      this.$router.push('/applications/' + res.data._id.$oid + '/submitted');
                    })
                    .catch(console.error);
                })
                .catch(console.error);
			},
			routeSetup: function() {
				// setup routines to run each time the application advances
				// child routes will not trigger the created or mounted process
				this.setup = false;
				this.appContext.dataReady = false;
				return new Promise(
					(resolve, reject) => {
						this.getSavedData()
						.then(res => {
							this.getCamps()
							.then(res => {
								this.setup = true;
								this.appContext.dataReady = true;

								// _.debounce is a function provided by lodash to limit how
								// often a particularly expensive operation can be run.
								// In this case, we want to limit how often we save,
								// waiting until the user has completely finished typing
								// https://lodash.com/docs/4.17.5#debounce
								this.debouncedAutoSave = _.debounce(this.autoSave, 5000);
								resolve(true);
							})
						});
					}
				)
			},
            orderedCamps(list) {
                return _.orderBy(list, 'date_start', 'desc');
            },
			getCamps: function() {
				return new Promise(
					(resolve, reject) => {
						localforage.getItem('X_TOKEN')
						.then(session => {
							// get list of camps
							axios.get('/api/v1/camp/session/get', {
								'headers': { 'x-token': session }
							})
							.then(response => {
								// sort camps then append to list with dates
								let camps = this.orderedCamps(response.data);
								this.appState.camps = [];
								for (let i = 0; i < camps.length; i++) {
									let text = camps[i].name + " -- ( ";
									text += camps[i].date_start;
									text += "  to  ";
									text += camps[i].date_end;
									text += " )";
									this.appState.camps.push(
										{
											text: text,
											value: camps[i]._id.$oid
										}
									)
									this.appState.campsIdx[camps[i]._id.$oid] = text;
								}
							})
							.then(response => {
								resolve(true);
							})
							.catch(console.error);
						});
					}
				)
			},
			setTitle: function(title) {
				this.appType = title;
				this.appContext.title = title.toLowerCase();
				this.appContext.title = this.appContext.title[0].toUpperCase() + this.appContext.title.slice(1);
				this.appContext.title += ' Application';
			},
			saveByPromise: function() {
				return new Promise(
					(resolve, reject) => {
						this.appContext.formDirty = false;
						this.autoSave();
						resolve(true);
					}
				)
			},
			autoSave: function() {
				// autosave to local forage -- called by debounced function
				let lfKey = 'appData-' + this.appType;
                localforage.setItem(lfKey, this.appState);
			},
			getSavedData: function() {
				// if appData was auto saved, repopulate the form
				return new Promise(
					(resolve, reject) => {
						let lfKey = 'appData-' + this.appType;
						localforage.getItem(lfKey)
						.then(appData => {
							if (appData !== null) {
								this.$store.commit('APPLICATION', appData);
							}
						})
						.then(res => {
							resolve(true);
						});
					}
				)
			}
        },
        computed: {
            appState: {
                get: function () {
                    return this.$store.state.applicationData;
                },
                set: function (value) {
                    this.$store.commit('APPLICATION', value);
                }
            },
            appContext: {
                get: function () {
                    return this.$store.state.applicationContext;
                },
                set: function (value) {
                    this.$store.commit('APPCONTEXT', value);
                }
            },
            profile() {
                return this.$store.state.userInfo;
            },
            evalCanSubmit() {
                // check if all form pages are complete
                let complete = true;
                for (let page in this.appContext.pagesComplete) {
                    if (this.appContext.pagesComplete[page] === false) {
                        complete = false;
                        break;
                    }
                }
                this.appContext.canSubmit = complete;
			},
        },
	    beforeRouteUpdate(to, from, next) {
			this.routeSetup()
			.then(res => {
				this.routeUpdate = true;
				setTimeout(() => {
					// set a flag for the child components
					// to trigger child context setup
					this.routeUpdate = false;
				}, 250);
				next();
			});
		},
		mounted() {
			this.routeSetup();
		}
	}
</script>