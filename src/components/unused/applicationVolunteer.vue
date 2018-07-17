<template>
  <div class="container-fluid">
    <router-view
        :formFieldList="formFieldList"
        v-on:updateData="emitChange"
    ></router-view>
  </div>
</template>

<script>
    export default {
        name: 'appVolunteer',
        data() {
            return {
                startRoute: '/application/volunteer/1',
                appType: 'volunteer',
                formPages: 3,
                pagesComplete: [false, false, false],
                formFieldList: [
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
                ],
                notRequired: [
                    "address2",
                ]
            }
        },
        watch: {
            dataReady(val) {
                // re-call validator when data is ready (when data loads from databses)
                this.validator();
            }
        },
        methods: {
            contextSetup: function() {
                this.appContext.appType = this.appType;
                this.appContext.formPages = this.formPages;
                this.appContext.pagesComplete = this.pagesComplete;
                this.appContext.startRoute = this.startRoute;
            },
            emitChange: function() {
                this.validator();
                this.$emit('updateData');
            },
            pageValidator: function(pageIdx) {
                if (this.appContext.dataReady) {
                    let invalid = false;
                    let complete = true;
                    for (let key in this.formFieldList[pageIdx]) {
                        if (Array.isArray(this.formFieldList[pageIdx][key])) {
                            for (let item in this.formFieldList[pageIdx][key]) {
                                if (this.formFieldList[pageIdx][key][item]) {
                                    invalid = true;
                                    complete = false;
                                } else if (this.appState.waiverVolunteer[key][item] == null || this.appState.waiverVolunteer[key][item] == '') {
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
                            } else if (typeof(this.appState[key]) != "undefined" && (this.appState[key] == null || this.appState[key] == '')) {
                                if (!this.notRequired.includes(key)) {
                                    complete = false;
                                }
                            } else if (typeof(this.appState[key]) == "undefined" && (this.appState.waiverVolunteer[key] == null || this.appState.waiverVolunteer[key] == '')) {
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
                        if (page == this.appContext.formCurrPage) {
                            this.appContext.formInvalid = results[0];
                            this.appContext.formComplete = results[1];
                        }
                    }
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
            dataReady: function() {
                return this.appContext.dataReady;
            }
        },
		beforeMount: function() {
            this.$emit('appType', this.appType);
            this.contextSetup();
        },
        mounted: function() {
            this.validator();
        },
    }
</script>

<style scoped lang="postcss">
	.col-xs-2.smartphone, .col-xs-2.mobile {
		display: none !important;
	}
</style>
