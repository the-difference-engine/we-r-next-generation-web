<template>
  <div class="container-fluid">
	<div class="waiver mx-auto">
		<div v-if="appContext.appType == 'camper'" class="row col-xs-12 my-2 mx-0 px-0">
			<h3>{{appState.waiverCamper.title}}</h3>
		</div>
		<div v-if="appContext.appType == 'volunteer'" class="row col-xs-12 my-2 mx-0 px-0">
			<h3>{{appState.waiverVolunteer.title}}</h3>
		</div>
		<div v-if="appContext.appType == 'camper'" class="row col-xs-12 my-2 mx-0 px-0">
			<p class="col-md-12 text-left mx-0 px-0 my-3">
				<span>{{appState.waiverCamper.header[0]}}</span>
				<span class="mx-2 font-size-2">
					<u>{{getDateAsString}}</u>
				</span>
				<span>{{appState.waiverCamper.header[1]}}</span>
				<span class="ml-2 font-size-2">
					<u>{{appState.childName}}</u>
				</span>
				<span>{{appState.waiverCamper.header[2]}}</span>
				<span class="ml-2 font-size-2">
					<u>{{profile.full_name}}</u>
				</span>
				<span>{{appState.waiverCamper.header[3]}}</span>
			</p>
		</div>
		<div v-if="appContext.appType == 'volunteer'" class="row col-xs-12 my-2 mx-0 px-0">
			<p class="col-md-12 text-left mx-0 px-0 my-3">
				<span>{{appState.waiverVolunteer.header[0]}}</span>
				<span class="mx-2 font-size-2">
					<u>{{getDateAsString}}</u>
				</span>
                <span>(date) by</span>
                <span class="mx-2 font-size-2">
                    <u>{{profile.full_name}}</u>
                </span>
                <span>(“Volunteer”), releases</span>
                <span>{{appState.waiverVolunteer.header[1]}}</span>
				<span>{{appState.waiverVolunteer.header[2]}}</span>
			</p>
		</div>
		<div class="row col-xs-12 my-2 mx-0 px-0">
			<p class="col-md-12 text-left mx-0 px-0 my-3">
				<span>Please initial your agreement with each item below.</span>
			</p>
		</div>
		<div class="row col-xs-12 text-left my-3">
			<div v-if="appContext.appType == 'camper'" 
				v-for='index in appState.waiverCamper.items.length' 
				v-bind:key="index-1"
				class="row col-xs-12 mx-0 px-0 my-3"
				><div class="col-xs-4 col-sm-1 text-right align-middle">
					<span>
						{{appState.waiverCamper.items[index-1].order}}
					</span>.
				</div>
				<div class="col-xs-7 col-sm-1 pr-0 text-center align-middle">
					<span>
						<input-row-no-label label="Initial" type="text"
							class="text-center mb-0"
							v-model="appState.waiverCamper.initials[index-1]"
							placeholder="Initial"
							:to-upper="true"
							:readonly="readonly"
							:min-length="2"
							:max-length="3"
			                :pristine="appContext.formPristine"
							v-on:input="emitChange"
							v-on:invalid="validateItem(index-1, $event)"
						></input-row-no-label>
					</span>
				</div>
				<div class="col-xs-12 col-sm-9 text-left align-middle">
					<span class="mr-2">
						<strong><u>
							{{appState.waiverCamper.items[index-1].title}}:
						</u></strong>
					</span>
					<span>
						{{appState.waiverCamper.items[index-1].text}}
					</span>
				</div>
			</div>
			<div v-if="appContext.appType == 'volunteer'" 
				v-for='index in appState.waiverVolunteer.items.length' 
				v-bind:key="index-1"
				class="row col-xs-12 mx-0 px-0 my-3"
			><div class="col-xs-4 col-sm-1 text-right align-middle">
					<span>
						{{appState.waiverVolunteer.items[index-1].order}}
					</span>.
				</div>
				<div class="col-xs-7 col-sm-1 pr-0 text-center align-middle">
					<span>
						<input-row-no-label label="Initial" type="text"
							class="text-center mb-0"
							v-model="appState.waiverVolunteer.initials[index-1]"
							placeholder="Initial"
							:to-upper="true"
							:readonly="readonly"
							:min-length="2"
							:max-length="3"
			                :pristine="appContext.formPristine"
							v-on:input="emitChange"
							v-on:invalid="validateItem(index-1, $event)"
						></input-row-no-label>
					</span>
				</div>
				<div class="col-xs-12 col-sm-9 text-left align-middle">
					<span class="mr-2">
						<strong><u>
							<span>
								{{appState.waiverVolunteer.items[index-1].title}}:
							</span>
						</u></strong>
					</span>
					<span>
						{{appState.waiverVolunteer.items[index-1].text}}
					</span>
				</div>
			</div>
		</div>
		<div class="row col-xs-12 my-2 mx-0 px-0">
			<p class="col-md-12 text-left mx-0 px-0 my-3">
				<span v-if="appContext.appType == 'camper'">{{appState.waiverCamper.footer}}</span>
				<span v-if="appContext.appType == 'volunteer'">{{appState.waiverVolunteer.footer}}</span>
			</p>
		</div>
		<div class="row col-md-12 my-5">
			<div class="col-md-8">
				<label class="form-label col-sm-12">Please type your full name*:</label>
				<input-row-no-label v-if="appContext.appType == 'camper'" 
					label="Signature" 
					type="text"
					class="text-center mb-0"
					v-model="appState.waiverCamper.signature"
					placeholder="Your Signature"
					:readonly="readonly"
					:min-length="profile.full_name.length"
					:max-length="100"
	                :pristine="appContext.formPristine"
					v-on:input="emitChange"
					v-on:invalid="invalidFields.signature = $event"
				></input-row-no-label>
				<input-row-no-label v-if="appContext.appType == 'volunteer'" 
					label="Signature" 
					type="text"
					class="text-center mb-0"
					v-model="appState.waiverVolunteer.signature"
					placeholder="Your Signature"
					:readonly="readonly"
					:min-length="profile.full_name.length"
					:max-length="100"
	                :pristine="appContext.formPristine"
					v-on:input="emitChange"
					v-on:invalid="invalidFields.signature = $event"
				></input-row-no-label>
				<small class="col-xs-12">* If you are under 18, your parent/guardian must sign for you.</small>
			</div>
			<div class="col-md-4">
				<label class="form-label col-sm-12">Today's Date (mm/dd/yyyy):</label>
				<input-row-no-label v-if="appContext.appType == 'camper'" 
					label="Today's Date" 
					type="date"
					class="text-center"
					:readonly="readonly"
					v-model="appState.waiverCamper.signedDate"
	                :pristine="appContext.formPristine"
					v-on:input="emitChange"
					v-on:invalid="invalidFields.signedDate = $event"
				></input-row-no-label>
				<input-row-no-label v-if="appContext.appType == 'volunteer'" 
					label="Today's Date" 
					type="date"
					class="text-center"
					:readonly="readonly"
					v-model="appState.waiverVolunteer.signedDate"
	                :pristine="appContext.formPristine"
					v-on:input="emitChange"
					v-on:invalid="invalidFields.signedDate = $event"
				></input-row-no-label>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import inputRow from "./forms/inputRow.vue";
import inputRowNoLabel from "./forms/inputRowNoLabel.vue";
export default {
	name: "appPage3",
	components: {
		inputRow,
		inputRowNoLabel
	},
	props: {
		formFieldList: {
			type: Array,
			required: true
		},
		routeUpdate: {
			type: Boolean,
		},
	},
	data() {
		return {
			formCurrPage: 2,
			isPrevious: true,
			isNext: true,
			invalidFields: {},
			readonly: false,
		};
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
		constructItemFields: function() {
			// the invalid fields for items requires a dynamic list
			// populate the list with a boolean set equal to the number of items
			return new Promise(
				(resolve, reject) => {
					let waiverItems = null;
					if (this.appContext.appType == 'camper') {
						waiverItems = this.appState.waiverCamper.items;
					} else {
						waiverItems = this.appState.waiverVolunteer.items;
					}
					for (let item in waiverItems) {
						if (this.formFieldList[this.formCurrPage].initials.length > 0) {
							this.formFieldList[this.formCurrPage].initials.splice(item, 1, false);
						} else {
							this.formFieldList[this.formCurrPage].initials.splice(item, 0, false);
						}
					}
					resolve(true);
				}
			)
		},
		contextSetup: function() {
			this.initTodayDate();
			this.appContext.formCurrPage = this.formCurrPage;
			this.appContext.isPrevious = this.isPrevious;
			this.appContext.isNext = this.isNext;
			this.appContext.prevRoute = this.appContext.routePage2;
			this.appContext.nextRoute = this.appContext.routeConfirm;
		},
		validateItem(idxNum, invalid) {
			this.formFieldList[this.formCurrPage].initials.splice(idxNum, 1, invalid);
		},
		emitChange: function() {
			this.$emit("updateData");
			if (this.appContext.dataReady) {
				this.appContext.formDirty = true;
			}
		},
		initTodayDate() {
			// initializes today's date for the waiver form
			let today = new Date();
			let day = today.getDate();
			if (day < 10) {
				day = "0" + day;
			}
			let month_num = today.getMonth() + 1;
			if (month_num < 10) {
				month_num = "0" + month_num;
			}
			let year = today.getFullYear().toString();
			let dateText = year + "-" + month_num + "-" + day;
			if (this.appContext.appType == 'camper') {
				this.appState.waiverCamper.signedDate = dateText;
			} else {
				this.appState.waiverVolunteer.signedDate = dateText;
			}
		},
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
		appContext() {
			return this.$store.state.applicationContext;
		},
		profile() {
			return this.$store.state.userInfo;
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
			let dt = null;
			if (this.appContext.appType == 'camper') {
				dt = new Date(this.appState.waiverCamper.signedDate);
			} else {
				dt = new Date(this.appState.waiverVolunteer.signedDate);
			}
			let day = dt.getDate() + 1;
			let month = monthNames[dt.getMonth()];
			let year = dt.getFullYear();
			return month + " " + day + ", " + year;
		},
	},
	created: function() {
		this.appContext.dataReady = false;	// tell parent validator to wait for data
		let waiverType = "waiver_" + this.appContext.appType;
		this.contextSetup();
		// get waiver text from database storage
		this.$store.dispatch("getWaiverResources", {
			resource: waiverType
		})
		.then(res => {
			if (this.appContext.appType == 'camper') {
				this.appState.waiverCamper.title = res["title"];
				this.appState.waiverCamper.header = res["headers"];
				this.appState.waiverCamper.items = res["items"];
				this.appState.waiverCamper.footer = res["footer"];
			} else {
				this.appState.waiverVolunteer.title = res["title"];
				this.appState.waiverVolunteer.header = res["headers"];
				this.appState.waiverVolunteer.items = res["items"];
				this.appState.waiverVolunteer.footer = res["footer"];
			}
		})
		.then(res => {
			this.constructItemFields()
			.then(res => {
				this.invalidFields = this.formFieldList[this.formCurrPage];
				this.appContext.dataReady = true;
			})
		})
	},
};
</script>

<style scoped lang="postcss">
	.col-xs-2.smartphone,
	.col-xs-2.mobile {
		display: none !important;
	}
</style>
