<template>
  <div class="container-fluid">
    <router-view
        :formFieldList="formFieldList"
        :routeUpdate="routeUpdateChildren"
        v-on:updateData="emitChange"
        v-on:submitClick="submitClick"
    ></router-view>
  </div>
</template>

<script>
    export default {
        name: 'appType',
        props: {
            routeUpdate: {
                type: Boolean,
            },
        },
        data() {
            return {
                appType: '',
                startRoute: '',
                routePage2: '',
                routeWaiver: '',
                routeConfirm: '',
                formPages: 3,
                pagesComplete: [false, false, false],
                formFieldList: [],
                notRequired: [],
                routeUpdateChildren: false, // changes route update for children
                                            // only after this component completes context setup
            }
        },
        watch: {
            dataReady(val) {
                // re-call validator when data is ready (when data loads from databses)
                this.validator();
            },
            routeUpdate: {
                // when the route update flag is set from the parent
                // run context setup
                handler: function(val, oldVal) {
                    if (val === true) {
                        this.getType()
                        .then(res => {
                            this.contextSetup()
                            .then(res => {
                                this.routeUpdateChildren = true;
                                setTimeout(() => {
                                    this.routeUpdateChildren = false;
                                }, 250)
                            })
                        })
                    }
                }
            },
        },
        methods: {
            resetData: function() {
                return new Promise(
                    (resolve, reject) => {
                        this.formFieldList.splice(0, this.formFieldList.length);
                        this.notRequired.splice(0, this.notRequired.length);
                        resolve(true);
                    }
                )
            },
            getType: function(appType=null) {
                return new Promise(
                    (resolve, reject) => {
                        if (appType === null) {
                            this.appType = this.$route.params.appType.toLowerCase();
                        } else {
                            this.appType = appType;
                        }
                        if (this.appType === 'camper') {
                            // setup camper application context
                            this.setupCamper()
                            .then(res => { resolve(true) });
                        } else if (this.appType === 'volunteer') {
                            // setup volunteer application context
                            this.setupVolunteer()
                            .then(res => { resolve(true) });
                        } else if (this.appType === 'partner') {
                            // setup partner application context
                            this.setupPartner()
                            .then(res => { resolve(true) });
                        } else {
                            // not valid type --> redirect to applications
                            this.$router.push('/applications');
                            resolve(false);
                        }
                    }
                )
            },
            setupCamper: function() {
                return new Promise(
                    (resolve, reject) => {
                        this.startRoute = '/application/camper/1';
                        this.routePage2 = '/application/camper/2';
                        this.routeWaiver = '/application/camper/3';
                        this.routeConfirm = '/application/camper/confirm';
                        this.formPages = 3;
                        this.pagesComplete = [false, false, false];
                        this.formFieldList.push(
                            {
                                "childName": false,
                                "childAge": false,
                                "childGender": false,
                                "address1": false,
                                "address2": false,
                                "city": false,
                                "stateProvince": false,
                                "zipCode": false,
                                "country": false,
                                "phoneNumber": false,
                            },
                            {
                                "bioCamper": false,
                                "chosenCamp": false,
                            },
                            {
                                "initials": [],
                                "signature": false,
                                "signedDate": false,
                            }
                        );
                        this.notRequired.push("address2");
                        resolve(true);
                    }
                )
            },
            setupVolunteer: function() {
                return new Promise(
                    (resolve, reject) => {
                        this.startRoute = '/application/volunteer/1';
                        this.routePage2 = '/application/volunteer/2';
                        this.routeWaiver = '/application/volunteer/3';
                        this.routeConfirm = '/application/volunteer/confirm';
                        this.formPages = 3;
                        this.appContext.pagesComplete = [false, false, false];
                        this.formFieldList.push(
                            {
                                "address1": false,
                                "address2": false,
                                "city": false,
                                "stateProvince": false,
                                "zipCode": false,
                                "country": false,
                                "phoneNumber": false,
                            },
                            {
                                "bioVolunteer": false,
                                "chosenCamp": false,
                            },
                            {
                                "initials": [],
                                "signature": false,
                                "signedDate": false,
                            }
                        );
                        this.notRequired.push("address2");
                        resolve(true);
                    }
                )
            },
            setupPartner: function() {
                return new Promise(
                    (resolve, reject) => {
                        this.startRoute = '/application/partner/1';
                        this.routePage2 = '/application/partner/2';
                        this.routeConfirm = '/application/partner/confirm';
                        this.routeWaiver = this.routeConfirm;
                        this.formPages = 2;
                        this.appContext.pagesComplete = [false, false];
                        this.formFieldList.push(
                            {
                                "companyName": false,
                                "companyUrl": false,
                                "companyLogo": false,
                                "address1": false,
                                "address2": false,
                                "city": false,
                                "stateProvince": false,
                                "zipCode": false,
                                "country": false,
                                "phoneNumber": false,
                            },
                            {
                                "companyDescription": false,
                                "companyNote": false,
                            },
                        );
                        this.notRequired.push("address2", "companyUrl");
                        resolve(true);
                    }
                )
            },
            contextSetup: function() {
                return new Promise(
                    (resolve, reject) => {
                        this.appContext.appType = this.appType;
                        this.$emit('appType', this.appType);
                        this.appContext.formPages = this.formPages;
                        this.appContext.startRoute = this.startRoute;
                        this.appContext.routePage2 = this.routePage2;
                        this.appContext.routeWaiver = this.routeWaiver;
                        this.appContext.routeConfirm = this.routeConfirm;
                        resolve(true);
                    }
                )
            },
            emitChange: function() {
                this.validator();
                this.$emit('updateData');
            },
            pageValidator: function(pageIdx) {
                if (this.appContext.dataReady) {
                    let invalid = false;
                    let complete = true;
                    let appWaiver = null;
                    if (this.appType === 'camper') {
                        // the waiver key in local storage will change
                        // depending on the waiver type
                        appWaiver = this.appState.waiverCamper;
                    } else if (this.appType === 'volunteer') {
                        appWaiver = this.appState.waiverVolunteer;
                    }
                    for (let key in this.formFieldList[pageIdx]) {
                        if (Array.isArray(this.formFieldList[pageIdx][key])) {
                            for (let item in this.formFieldList[pageIdx][key]) {
                                if (this.formFieldList[pageIdx][key][item]) {
                                    invalid = true;
                                    complete = false;
                                } else if (appWaiver[key][item] === null || appWaiver[key][item] === '') {
                                    if (!this.notRequired.includes(key)) {
                                        complete = false;
                                    }
                                }
                            }
                        } else {
                            // key-value is not an array
                            if (this.formFieldList[pageIdx][key]) {
                                invalid = true;
                                complete = false;
                            } else if (typeof(this.appState[key]) != "undefined" && (this.appState[key] === null || this.appState[key] === '')) {
                                if (!this.notRequired.includes(key)) {
                                    complete = false;
                                }
                            } else if (typeof(this.appState[key]) === "undefined" && (appWaiver[key] === null || appWaiver[key] === '')) {
                                if (!this.notRequired.includes(key)) {
                                    complete = false;
                                }
                            }
                        }
                    }
                    this.appContext.pagesComplete.splice(pageIdx, 1, complete);
                    return [invalid, complete];
                }
            },
            validator: function() {
                // run validator for each page
                // if current page --> set current form complete properties
                for (let page = 0; page < this.appContext.formPages; page++) {
                    let results = this.pageValidator(page); // results = [invalid, complete]
                    if (typeof(results) != "undefined") {
                        if (page === this.appContext.formCurrPage) {
                            this.appContext.formInvalid = results[0];
                            this.appContext.formComplete = results[1];
                        }
                    }
                }
            },
            submitClick: function() {
                this.$emit('submitClick');
            },
        },
        computed: {
            appState: {
                get: function() {
                    return this.$store.state.applicationData;
                },
                set: function(value) {
                    this.$store.commit('APPLICATION', value);
                }
            },
            appContext: {
                get: function() {
                    return this.$store.state.applicationContext;
                },
                set: function(value) {
                    this.$store.commit('APPCONTEXT', value);
                }
            },
            dataReady: function() {
                return this.appContext.dataReady;
            }
        },
        created: function() {
            this.getType()
            .then(res => {
                this.contextSetup();
            })
        },
		beforeMount: function() {
            this.contextSetup();
        },
        mounted: function() {
            this.validator();
        },
        beforeRouteUpdate: function(to, from, next) {
            let routeType = to.params.appType.toLowerCase();
            if (this.appType != routeType) {
                // the application type changed -- reset the application context
                this.resetData()
                .then(res => {
                    this.getType(routeType)
                    .then(res => {
                        this.contextSetup();
                    });
                });
            }
            next();
        },
    }
</script>

<style scoped lang="postcss">
	.col-xs-2.smartphone, .col-xs-2.mobile {
		display: none !important;
	}
</style>
