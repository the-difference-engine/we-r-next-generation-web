<template>
	<div class="container-fluid col-md-11 col-xs-12 mx-auto">
		<div id="app-title" class="row my-1 mx-0 px-0">
			<h1>{{title}}</h1>
			<hr>
		</div>
		<div class="row mx-0 px-0">
			<div class="col-sm-6 col-xs-12 mx-0 px-0 text-left">
				<label>Applicant's Name:</label>
				{{profileData.full_name}}
			</div>
			<div class="col-sm-6 col-xs-12 mx-0 px-0 text-right">
				<label for="inputEmail">Applicant Email:</label>
				{{profileData.email}}
			</div>
		</div>
		<app-navigation 
			:form-dirty="formDirty"
			:form-invalid="formInvalid"
			:form-complete="formComplete"
			:is-previous="isPrevious"
			:is-next="isNext"
			:can-submit="canSubmit"
			v-on:prevClick="prevClick"
			v-on:nextClick="nextClick"
			v-on:submitClick="submit"
			v-on:saveClick="save"
			v-on:cancelClick="cancel"
		></app-navigation>
		<div class="row my-3 mb-5 mx-0 px-0">
			<div class="p-2 border-all" 
				v-bind:class="{ 'border-danger': formInvalid }">
				<router-view :appData="appData" 
					v-on:appType="setTitle"
					v-on:isPrevious="isPrevious = $event"
					v-on:isNext="isNext = $event"
					v-on:startRoute="startRoute = $event"
					v-on:prevRoute="prevRoute = $event"
					v-on:nextRoute="nextRoute = $event"
					v-on:formDirty="formDirty = $event"
					v-on:formComplete="formComplete = $event"
					v-on:canSubmit="canSubmit = $event"
					v-on:updateData="updateData"
					v-on:formInvalid="formInvalid = $event"
				></router-view>
			</div>
		</div>
		<app-navigation 
			:form-dirty="formDirty"
			:form-invalid="formInvalid"
			:form-complete="formComplete"
			:is-previous="isPrevious"
			:is-next="isNext"
			:can-submit="canSubmit"
			v-on:prevClick="prevClick"
			v-on:nextClick="nextClick"
			v-on:submitClick="submit"
			v-on:saveClick="save"
			v-on:cancelClick="cancel"
		></app-navigation>
	</div>
</template>

<style scoped>
	hr {
		display: block;
		position: relative;
		padding: 0;
		margin: 8px auto;
		height: 0;
		width: 70%;
		max-height: 0;
		font-size: 1px;
		line-height: 0;
		clear: both;
		border: none;
		border-top: 1px solid #aaaaaa;
		border-bottom: 1px solid #ffffff;
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
				title: '',
				formDirty: false,
				formInvalid: false,
				formComplete: false,
				isPrevious: true,
				isNext: true,
				startRoute: '',
				prevRoute: '',
				nextRoute: '',
				canSubmit: false,

				profileData: {},
				appData: this.setupAppData(),

				// windowHeight: window.innerHeight,
				// titleHeight: 0,
				// footerHeight: 0,
				// formHeight: 0,


			}
		},
		methods: {
			setupAppData: function() {
				return {
					bio: '',
					camps: [
						{
							text: '',
							value: ''
						},
						{
							text: '',
							value: ''
						},
					],
					chosencamp: '',

					errors: [],
					disable_edits: false,

					childName: '',

					waiver: {
						title: '',
						header: [],
						items: [],
						footer: '',

						initials: [],
						signature: '',
						signed_date: '',
					}
				}
			},
			updateData: function(newData) {
				if (this.setup) {
					// do not update data in the first few seconds
					// of setup while components are loading
					this.appData = newData;
					this.debouncedAutoSave()	// auto save with debounce
				}
			},
			prevClick: function() {
				this.saveByPromise().then(res => {
					this.$router.push(this.prevRoute);
				});
			},
			nextClick: function() {
				this.saveByPromise().then(res => {
					this.$router.push(this.nextRoute);
				});
			},
			cancel: function() {
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
						localforage.removeItem('appData')
						.then(res => {
							this.appData = this.setupAppData();
						}).then(res => {
							this.saveByPromise();
						}).then(res => {
							swal(
								'Deleted!',
								'Your application is starting over.',
								'success'
							);
							this.$router.push(this.startRoute);
						});
					}
				});
			},
			save: function() {
				this.saveByPromise();
			},
			submit: function() {

			},

			// calcTitleHeight: function() {
			// 	this.titleHeight = document.getElementById('app-title').clientHeight;
			// },
			// calcFooterHeight: function() {
			// 	this.footerHeight = document.getElementById('app-nav').clientHeight;
			// },
			// calcFormHeight: function() {
			// 	this.formHeight = this.windowHeight - this.titleHeight - this.footerHeight;
			// },
			// calculateHeights: function() {
			// 	this.calcTitleHeight();
			// 	this.calcFooterHeight();
			// 	this.calcFormHeight();
			// },
			routeSetup: function() {
				// setup routines to run each time the application advances
				// child routes will not trigger the created or mounted process
				this.getSavedData();
				this.getCamps();
				this.pauseEmits();
			},
			pauseEmits: function() {
				setInterval(() => {
					// delay a setup flag by 2 seconds to allow
					// components to load and prevent components
					// from updating the appData
					this.setup = true;
				}, 2500);
			},
			getCamps: function() {
				localforage.getItem('X_TOKEN')
				.then(session => {
					// get list of camps
					axios.get('/api/v1/camp/session/get', {
						'headers': { 'x-token': session }
					})
					.then(response => {
						this.appData.camps = [];
						for (let i=0; i<response.data.length; i++) {
							let text = response.data[i].name + " (";
							text += response.data[i].date_start;
							text += " to ";
							text += response.data[i].date_end;
							text += ")";
							this.appData.camps.push(
								{
									text: text,
									value: response.data[i]._id.$oid
								}
							)
						}
					})
					.catch(console.error);
				});
			},
			setTitle: function(title) {
				this.title = title.toLowerCase();
				this.title = this.title[0].toUpperCase() + this.title.slice(1);
				this.title += ' Application';
			},
			saveByPromise: function() {
				return new Promise(
					(resolve, reject) => {
						this.autoSave();
						this.formDirty = false;
						resolve(true);
					}
				)
			},
			autoSave: function() {
				// autosave to local forage -- called by debounced function
				localforage.setItem('appData', this.appData);
			},
			getSavedData: function() {
				// if appData was auto saved, repopulate the form
				localforage.getItem('appData')
				.then(appData => {
					if (appData !== null) {
						this.appData = appData;
					}
				});
			}

		},
	    beforeRouteUpdate(to, from, next) {
			this.setup = false;
			this.routeSetup();
			next();
		},
		created() {
			localforage.getItem('X_TOKEN')
			.then(session => {
				// get user profile data
				axios.get('/api/v1/profile/' + session, { 'headers': { 'x-token': session } })
				.then(response => {
					this.profileData = response.data;
				})
				.catch(console.error);
			});

			// _.debounce is a function provided by lodash to limit how
			// often a particularly expensive operation can be run.
			// In this case, we want to limit how often we save,
			// waiting until the user has completely finished typing
			// https://lodash.com/docs/4.17.5#debounce
			this.debouncedAutoSave = _.debounce(this.autoSave, 5000);
		},
		mounted: function() {
			// change form height to fit the screen dimensions
			// this.calculateHeights();
			// this.$nextTick(() => {
			// 	window.addEventListener('resize', () => {
			// 		this.windowHeight = window.innerHeight;
			// 		// this.calculateHeights();
			// 	});
			// });
			this.routeSetup();
		},
	}
</script>