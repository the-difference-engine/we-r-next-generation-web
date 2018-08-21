<template>
<div class="container-fluid mx-0 px-0">
    <div class="col-xs-8 text-left">
        <h2 class="font-weight-bold">{{ sessionInfo.full_name }}</h2>
        <h4 class="font-weight-bold gray">Address</h4>
        <span class="col-xs-12 mx-0 px-0">{{sessionInfo.address1}}</span>
        <span v-if="sessionInfo.address2 !== ''" class="col-xs-12 mx-0 px-0">{{sessionInfo.address2}}</span>
        <span class="col-xs-12 mx-0 px-0">{{sessionInfo.city}}, {{sessionInfo.state_province}} {{sessionInfo.zip_code}}</span>
        <span class="col-xs-12 mx-0 px-0">{{countryName}}</span>
        <div class="row mx-0 px-0">
            <div class="col-md-3 col-xs-4 mx-0 px-0 align-bottom">
                <h4 class="font-weight-bold gray">Email</h4>
            </div><!-- Comment to remove white space for align-bottom class! 
            --><div class="col-md-9 col-xs-8 align-bottom">
                <p class="gray font-weight-light">{{ sessionInfo.email }}</p>
            </div>
        </div>
        <div class="row mx-0 px-0">
            <div class="col-md-3 col-xs-4 mx-0 px-0 align-bottom">
                <h4 class="font-weight-bold gray">Phone</h4>
            </div><!-- Comment to remove white space for align-bottom class! 
            --><div class="col-md-9 col-xs-8 align-bottom">
                <p class="gray font-weight-light">{{ sessionInfo.phone_number }}</p>
            </div>
        </div>
        <div class="row mx-0 px-0">
            <div class="col-md-3 col-xs-4 mx-0 px-0 align-bottom">
                <h4 class="font-weight-bold gray">Status</h4>
            </div><!-- Comment to remove white space for align-bottom class! 
            --><div class="col-md-9 col-xs-8 align-bottom">
                <p class="gray font-weight-light">{{ getStatus }}</p>
            </div>
        </div>
    </div>
    <div class="col-xs-4">
        <img class="col-xs-12 mx-0 px-0" :src="userImage" alt="Image not found">
    </div>
</div>
</template>

<script>
import json from '../../json/countries.json';
export default {
    name: "viewUserProfile",
    props: {
        sessionInfo: {
            type: Object,
            required: true
        },
        userImage: {
            type: String,
            default: 'static/assets/crayons-min.jpg',
        },
    },
    data() {
        return {
            countriesJson: json,
            countriesDict: {},
        }
    },
    methods: {
        countriesJsonToDict: function() {
            for (let country in this.countriesJson) {
                this.countriesDict[this.countriesJson[country]["value"]] = this.countriesJson[country]["text"];
            }
        },
        sentenceCase: function(string) {
            if (string !== undefined) {
                return string[0].toUpperCase() + string.slice(1);
            } else {
                return "";
            }
        },
        getActiveString: function() {
            return (this.sessionInfo.active) ? "Active" : "Inactive";
        },
    },
    computed: {
        countryName: function() {
            return this.countriesDict[this.sessionInfo.country];
        },
        getStatus: function() {
            if (this.sessionInfo.role === null) {
                return this.getActiveString();
            } else {
                return this.sentenceCase(this.sessionInfo.role) + " (" + this.getActiveString() + ")";
            }
        }
    },
    mounted: function() {
        this.countriesJsonToDict();
    },
};
</script>
