<template>
  <div class="container mx-auto my-4">
    <div class="row col-sm-12 my-5">
      <h1>Edit {{type_cap}} Waiver Form</h1>
      <small class="col-sm-12">
        This form will change the subject waiver for all future {{type}} applications. It will not affect waivers previously signed and stored in the database.
      </small>
      <small class="col-sm-12">
        Preview any changes on the waiver below.
      </small>
    </div>
    <div ref="updateWaiver" class="row col-sm-12">
      <div class="row col-sm-11 text-left my-5">
        <form v-on:submit.prevent="update_waiver" class="form">
          <table class="table text-left my-3">
            <tbody>
            <tr v-bind:class="{ 'has-error': missingTitle }">
              <td class="col-sm-2 pr-2 text-right align-middle">
                <h4><label class="control-label">Title</label></h4>
              </td>
              <td class="col-sm-10 text-left align-baseline" colspan="2">
                <div class="row col-sm-12 my-2">
                  <input type="text" class="form-control" v-model="waiver.title">
                </div>
                <div v-if="missingTitle" class="col-sm-12 has-error px-0">
                  <label class="control-label">{{waiver_errors.title}}</label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="col-sm-2 pr-2 text-right align-top">
                <span v-bind:class="{ 'has-error': headers_have_errors }">
                <h4><label class="control-label">Header Text</label></h4>
                </span>
              </td>
              <td class="col-sm-10 text-left align-baseline" colspan="2">
                <div v-bind:class="{ 'has-error': invalid_headers[0] }" class="row col-sm-12 my-2">
                  <input class="form-control" v-model="waiver.header[0]" @change="validateHeader(0)">
                </div>
                <div v-if="invalid_headers[0]" class="col-sm-12 has-error px-0">
                  <label class="control-label">{{waiver_errors.header}}</label>
                </div>
                <div class="row col-sm-12 my-2">
                  DATE
                  <span class="mx-2" v-if="type === 'volunteer'">
                    (date) by VOLUNTEER NAME
                  </span>
                </div>
                <div v-bind:class="{ 'has-error': invalid_headers[1] }" class="row col-sm-12 my-2">
                  <textarea class="form-control col-sm-12 my-2" rows=4 v-model="waiver.header[1]" @change="validateHeader(1)"></textarea>
                </div>
                <div v-if="invalid_headers[1]" class="col-sm-12 has-error px-0">
                  <label class="control-label">{{waiver_errors.header}}</label>
                </div>
                <div v-if="type === 'camper'" class="row col-sm-12 my-2">
                  <span class="row col-sm-12 my-2">CHILD'S NAME</span>
                  <span v-bind:class="{ 'has-error': invalid_headers[2] }">
                    <textarea class="form-control col-sm-12" rows=4 v-model="waiver.header[2]" @change="validateHeader(2)"></textarea>
                  </span>
                  <div v-if="invalid_headers[2]" class="col-sm-12 has-error px-0">
                    <label class="control-label">{{waiver_errors.header}}</label>
                  </div>
                  <span class="row col-sm-12 my-2">PARENT'S NAME</span>
                  <span v-bind:class="{ 'has-error': invalid_headers[3] }">
                    <textarea class="form-control col-sm-12" rows=4 v-model="waiver.header[3]" @change="validateHeader(3)"></textarea>
                  </span>
                  <div v-if="invalid_headers[3]" class="col-sm-12 has-error px-0">
                    <label class="control-label">{{waiver_errors.header}}</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for='index in waiver.items.length' :key="index">
              <td class="col-sm-2 pr-2 text-right align-top">
                <span v-bind:class="{ 'has-error': items_have_errors }">
                <h4><label class="control-label" v-if="index-1 === 0">Legal Items</label></h4>
                </span>
              </td>
              <td class="col-sm-8 text-left align-baseline">
                <div v-bind:class="{ 'has-error': invalid_items[index-1]['order'] }" class="row col-sm-12 my-2">
                  <label class="col-sm-2 control-label">Order #</label>
                  <div class="col-sm-2">
                    <input type="number" class="form-control" v-model="waiver.items[index-1]['order']" v-on:change="validateItem(index-1)">
                  </div>
                  <div class="col-sm-8">
                    <div class="col-sm-12">
                      <small>This will define the order the items will appear on the waiver.</small>
                    </div>
                    <div v-if="invalid_items[index-1]['order']" class="col-sm-12 has-error">
                      <label class="control-label">{{waiver_errors.item_order}}</label>
                    </div>
                  </div>
                </div>
                <div v-bind:class="{ 'has-error': invalid_items[index-1]['title'] }" class="row col-sm-12 my-2">
                  <label class="col-sm-2 control-label">Title</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="waiver.items[index-1]['title']" @change="validateItem(index-1)">
                  </div>
                  <div v-if="invalid_items[index-1]['title']" class="col-sm-12 has-error text-right">
                    <label class="control-label">{{waiver_errors.item_title}}</label>
                  </div>
                </div>
                <div class="row col-sm-12 my-2">
                  <label class="col-sm-2">Initials Required?</label>
                  <div class="col-sm-1">
                    <input type="checkbox" class="form-control checkbox" v-model="waiver.items[index-1]['initials']">
                  </div>
                </div>
                <div v-bind:class="{ 'has-error': invalid_items[index-1]['text'] }" class="row col-sm-12 my-2">
                  <label class="col-sm-2 control-label">Text</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows="5" v-model="waiver.items[index-1]['text']" @change="validateItem(index-1)"></textarea>
                  </div>
                  <div v-if="invalid_items[index-1]['text']" class="col-sm-12 has-error text-right">
                    <label class="control-label">{{waiver_errors.item_text}}</label>
                  </div>
                </div>
              </td>
              <td class="col-sm-1 text-left align-top">
                <button class="btn btn-danger" v-on:click="deleteItem(index-1)">Delete</button>
              </td>
            </tr>
            <tr>
              <td class="col-sm-2"></td>
              <td class="col-sm-10 text-right" colspan="2">
                <button class="btn btn-warning" v-on:click="addItem">Add Legal Item</button>
              </td>
            </tr>
            <tr v-bind:class="{ 'has-error': missingFooter }">
              <td class="col-sm-2 pr-2 text-right align-middle">
                <h4><label class="control-label">Footer</label></h4>
              </td>
              <td class="col-sm-10 text-left align-baseline" colspan="2">
                <div class="row col-sm-12 my-2">
                  <textarea class="form-control" rows="3" v-model="waiver.footer"></textarea>
                </div>
                <div v-if="missingFooter" class="col-sm-12 has-error px-0">
                  <label class="control-label">{{waiver_errors.footer}}</label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="col-sm-2"></td>
              <td class="col-sm-10 text-right" colspan="2">
                <div class="row col-sm-12 my-2">
                  <button v-on:click="cancelSubmission" class="btn btn-warning mx-4 my-5">Cancel</button>
                  <button type="submit" class="btn btn-primary my-5" v-bind:disabled="missingTitle || missingFooter || headers_have_errors || items_have_errors">Save & Submit</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div ref="preview_btn" class="col-sm-1 sticky-top">
        <div v-bind:style="preview_btn_styles">
          <button class="btn btn-primary sticky btn-preview" v-on:click="scrollToPreview">Preview Changes</button>
        </div>
      </div>
    </div>
    <div class="row col-sm-12 my-5">
      <h2>Preview Compiled Waiver</h2>
      <div id="waiver_preview" ref="waiver_preview" class="waiver mx-auto">
        <div class="mx-auto">
          <h3>{{waiver.title}}</h3>
          <p class="col-md-12 text-left my-3">
            <span>{{waiver.header[0]}}</span>
            <span class="mx-2 font-size-2"><u>{{get_date_as_string}}</u></span>
            <span class="mx-2" v-if="type === 'volunteer'">
              (date) by
              <span class="mx-2 font-size-2"><u>{{profileData.full_name}}</u></span>
            </span>
            <span class="mx-2">{{waiver.header[1]}}</span>
            <span v-if="type === 'camper'">
              <span class="font-size-2"><u>CHILD'S NAME</u></span>
              <span class="mr-2">{{waiver.header[2]}}</span>
              <span class="font-size-2"><u>PARENT'S NAME</u></span>
              <span class="mx-2">{{waiver.header[3]}}</span>
            </span>
          </p>
          <table class="col-md-12 text-left my-3">
            <tbody>
            <tr v-for='index in waiver.items.length' :key="index">
              <td class="col-sm-1 pr-0 text-center">
                <span>
                  <input :readonly="disable_edits" type="text" class="col-sm-12 form-control text-center" v-model="waiver.initials[index-1]">
                </span>
                <small class="col-sm-12">Initial</small>
              </td>
              <td class="col-sm-1 text-right">
                <span>
                  {{waiver.items[index-1].order}}
                </span>.
              </td>
              <td class="col-sm-10 text-left">
                <span class="mr-2">
                  <strong><u>
                    <span>
                      {{waiver.items[index-1].title}}:
                    </span>
                  </u></strong>
                </span>
                <span>
                  {{waiver.items[index-1].text}}
                </span>
              </td>
            </tr>
            </tbody>
          </table>
          <p class="col-md-12 text-left my-3">
            <span>
              {{waiver.footer}}
            </span>
          </p>
          <div class="col-md-12 row my-5">
            <div class="col-md-8">
              <label class="col-sm-12">Please type your full name*:</label>
              <u><strong><span>
                <input :readonly="disable_edits" type="text" class="form-control text-center" v-model="waiver.signature">
              </span></strong></u>
              <small class="col-sm-12">* If you are under 18, your parent/guardian must sign for you.</small>
            </div>
            <div class="col-md-4">
              <label class="col-sm-12">Today's Date (mm/dd/yyyy):</label>
              <u><strong><span>
                <input :readonly="disable_edits" type="date" class="form-control text-center" v-model="waiver.signed_date">
              </span></strong></u>
            </div>
          </div>
          <span disabled class="btn btn-light my-5">Save & Submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  import 'vue-scrollto';
  export default {
    name: "admin_waiver_edit",
    data() {
      return {
        profileData: {
          full_name: '[MY FULL NAME]',
          child_name: "[MY CHILD'S FULL NAME]"
        },
        waiver: {
          title: '',
          header: [],
          items: [],
          footer: '',

          initials: [],
          signature: '[MY FULL NAME]',
          signed_date: '',
        },

        waiver_validators: {
          title_min: 2,
          header_min: 2,
          item_text_min: 10,
          item_title_min: 2,
          footer_min: 2,
        },

        waiver_errors: {
          title: '',
          header: '',
          item_order: '',
          item_title: '',
          item_text: '',
          footer: '',
        },

        type: '',
        type_cap: '',
        disable_edits: true,

        preview_height: '',
        preview_btn_styles: {},

        attemptSubmit: false,
        headers_have_errors: false,
        items_have_errors: false,
        invalid_headers: [],
        invalid_items: [],
      };
    },
    methods: {
      getWaiver: function(type) {
        // get waiver text from database storage
        let resource_type = "waiver_" + type;
        this.$store.dispatch('getWaiverResources', {
          resource: resource_type
        })
        .then(data => {
          this.waiver.title = data['title'];
          this.waiver.header = data['headers'];
          this.waiver.items = data['items'];
          this.waiver.footer = data['footer'];
          for (let idx=0; idx<this.waiver.header.length; idx++) {
            this.invalid_headers.push(false);
          }
          for (let idx=0; idx<this.waiver.items.length; idx++) {
            this.invalid_items.push(
              {
                'order': false,
                'title': false,
                'text': false,
              }
            );
          }
          setTimeout(x => {this.matchHeight()}, 2000);
        })
      },

      updateWaiver: function() {
        this.$store.dispatch('campSessionUpdate', {
          updated_camp: this.camp,
          camp_id: this.camp_id,
          router: this.$router,
          that: this
        })
        this.editCamp();
      },

      matchHeight() {
        let preview_height = this.$refs.updateWaiver.scrollHeight - 50;
        this.preview_btn_styles = {'height': preview_height + 'px'};
      },

      scrollToPreview() {
        let element = '#waiver_preview';
        let duration = 2000;
        var VueScrollTo = require('vue-scrollto');
        VueScrollTo.scrollTo(element, duration)
      },

      deleteItem(item_idx) {
        // remove the item from the list
        this.waiver.items.splice(item_idx, 1);
      },

      addItem() {
        let count = this.waiver.items.length;
        // add a new item object to the list
        this.waiver.items.push(
          {
            'order': count + 1,
            'title': '',
            'text': '',
            'initials': true
          }
        );
      },

      cancelSubmission() {
        this.getWaiver(this.type);
      },

      validateHeader: function(item_idx) {
        // for (let idx=0; idx<this.waiver.header.length; idx++) {
          if (
            this.waiver.header[item_idx] === '' || 
            this.waiver.header[item_idx] == null ||
            this.waiver.header[item_idx].length < this.waiver_validators.header_min
          ) {
            this.invalid_headers.splice(item_idx, 1, true);
          }
          else {
            this.invalid_headers.splice(item_idx, 1, false);
          }
        // }
        this.headers_have_errors = false;
        for (let idx=0; idx<this.invalid_headers.length; idx++) {
          if (this.invalid_headers[idx] == true) {
            this.headers_have_errors = true;
            break;
          }
        }
      },

      spliceInvalidItem: function(item_idx, key, new_value) {
        let current_errors = this.invalid_items[item_idx];
        current_errors[key] = new_value;
        this.invalid_items.splice(item_idx, 1, current_errors);
      },

      validateItem: function(item_idx) {
        let current_errors = {}
        // validate item order
        if (this.waiver.items[item_idx].order === '' || 
            this.waiver.items[item_idx].order == null ||
            isNaN(this.waiver.items[item_idx].order) ||
            this.waiver.items[item_idx].order < 0
          ) {
          this.spliceInvalidItem(item_idx, 'order', true);
        }
        else {
          if (this.invalid_items[item_idx]['order']) {
            this.spliceInvalidItem(item_idx, 'order', false);
          }
        }

        // validate item title
        if (this.waiver.items[item_idx].title === '' || 
            this.waiver.items[item_idx].title == null ||
            this.waiver.items[item_idx].title.length < this.waiver_validators.item_title_min
          ) {
          this.spliceInvalidItem(item_idx, 'title', true);
        }
        else {
          if (this.invalid_items[item_idx]['title']) {
            this.spliceInvalidItem(item_idx, 'title', false);
          }
        }

        // validate item text
        if (this.waiver.items[item_idx].text === '' || 
            this.waiver.items[item_idx].text == null ||
            this.waiver.items[item_idx].text.length < this.waiver_validators.item_text_min
          ) {
          this.spliceInvalidItem(item_idx, 'text', true);
        }
        else {
          if (this.invalid_items[item_idx]['text']) {
            this.spliceInvalidItem(item_idx, 'text', false);
          }
        }
        this.items_have_errors = false;
        for (let idx=0; idx<this.invalid_items.length; idx++) {
          if (this.invalid_items[idx]['order'] ||
              this.invalid_items[idx]['title'] ||
              this.invalid_items[idx]['text']
            ) {
            this.items_have_errors = true;
            break;
          }
        }
      },

      update_waiver() {
        let dataObj = {
          'title': this.waiver.title,
          'headers': this.waiver.header,
          'items': this.waiver.items,
          'footer': this.waiver.footer
        }
        localforage.getItem('X_TOKEN')
        .then(session => {
          axios.put('/api/v1/admin/waiver/' + this.type + '/update', {
            headers: { 'x-token': session },
            dataObj: dataObj
          })
          .then(res => {
            this.$router.push('/admin/applications');
          })
        })
      }
    },
    computed: {
      init_today_date() {
        // initializes today's date for the waiver form
        let today = new Date();
        let day = today.getDate();
        if (day < 10) { day = '0' + day }
        let month_num = today.getMonth() + 1;
        if (month_num < 10) { month_num = '0' + month_num }
        let year = today.getFullYear();

        this.waiver.signed_date = year + '-' + month_num + '-' + day;
      },
      get_date_as_string() {
        // initializes today's date as readable string
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        let dt = new Date(this.waiver.signed_date);
        let day = dt.getDate() + 1;
        let month = monthNames[dt.getMonth()];
        let year = dt.getFullYear();

        return month + ' ' + day + ', ' + year;
      },

      // computed validators
      missingTitle: function() { return this.waiver.title === '' || this.waiver.title.length < this.waiver_validators.title_min; },
      missingFooter: function() { return this.waiver.footer === '' || this.waiver.footer.length < this.waiver_validators.footer_min; },

    },
    created() {
      this.type = this.$route.params.type.toLowerCase();    // waiver type from the url params
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();

      // concatenate strings to construct validation error messages
      this.waiver_errors.title = "Title is required and must be at least " + this.waiver_validators.title_min + " characters.";
      this.waiver_errors.header = "Header is required and must be at least " + this.waiver_validators.header_min + " characters.";
      this.waiver_errors.item_order = "Item order is required and must be greater than 0";
      this.waiver_errors.item_title = "Item title is required and must be at least " + this.waiver_validators.item_title_min + " characters.";
      this.waiver_errors.item_text = "Item text is required and must be at least " + this.waiver_validators.item_text_min + " characters.";
      this.waiver_errors.footer = "Footer is required and must be at least " + this.waiver_validators.footer + " characters.";
    },

    beforeMount() {
      this.getWaiver(this.$route.params.type);
      try { this.init_today_date(); }
      catch (error) { }
    },
    beforeRouteUpdate(to, from, next) {
      this.type = to.params.type.toLowerCase();       // if waiver type changes in URL, update the data and waiver
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();
      this.getWaiver(to.params.type);
      next();
    },
  }
</script>

<style>
  table > tbody > tr > td {
    /*vertical-align: top !important;*/
    padding-top: 1em !important;
    padding-bottom: 1em !important;
  }
</style>

<style scoped>
  .container {
    margin-bottom: 30px !important;
  }
  .waiver {
    padding: 25px;
    border: 2px solid gray;
  }

  .sticky {
    top: 150px;
    margin-top: 150px;
    position: sticky;
  }
  .btn-preview {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  h4 {
    font-weight: bold;
  }

  .checkbox {
    position: relative;
    display: inline-block;
    border: 1px solid #a9a9a9;
    border-radius: .25em;
    width: 1.3em;
    height: 1.3em;
    float: left;
    margin-right: .5em;
  }
</style>
