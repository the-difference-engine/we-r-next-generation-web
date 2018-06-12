<template>
  <div class="container mx-auto my-4">
    <div class="row col-sm-12 my-5">
      <h1>Edit {{type_cap}} Waiver Form</h1>
      <small class="col-sm-12 text-left">
        This form will change the subject waiver for all future {{type}} applications. It will not affect waivers previously signed and stored in the database.
      </small>
      <small class="col-sm-12 text-left">
        Preview any changes on the waiver below.
      </small>
    </div>
    <div ref="updateWaiver" class="row col-sm-12">
      <div class="row col-sm-11 text-left my-5">
        <form v-on:submit.prevent="update_waiver" class="form">
          <table class="table text-left my-3">
            <tbody>
              <input-table-row :label="waiver_labels.title" type="text" 
                v-model="waiver.title" 
                :min-length="waiver_validators.title_min"
                v-on:invalid="invalid.title = $event">
              </input-table-row>
              <tr>
                <input-label-table-large v-bind:class="{ 'has-error': headers_have_errors }"
                  :label="waiver_labels.header">
                </input-label-table-large>
                <td colspan="2" class="col-sm-10 text-left align-baseline">
                  <input-row-no-label type="text" 
                    :label="waiver_labels.header"
                    v-model="waiver.header[0]" 
                    :min-length="waiver_validators.header_min"
                    v-on:invalid="headerValidator($event, 0)">
                  </input-row-no-label>
                  <div class="row col-sm-12">
                    DATE
                    <span class="mx-2" v-if="type === 'volunteer'">
                      (date) by VOLUNTEER NAME
                    </span>
                  </div>
                  <input-row-no-label type="textarea" 
                    :label="waiver_labels.header"
                    v-model="waiver.header[1]" 
                    :min-length="waiver_validators.header_min"
                    v-on:invalid="headerValidator($event, 1)">
                  </input-row-no-label>
                  <div v-if="type === 'camper'" >
                    <span class="row col-sm-12">CHILD'S NAME</span>
                    <input-row-no-label type="textarea" 
                      :label="waiver_labels.header"
                      v-model="waiver.header[2]" 
                      :min-length="waiver_validators.header_min"
                      v-on:invalid="headerValidator($event, 2)">
                    </input-row-no-label>
                    <span class="row col-sm-12">PARENT'S NAME</span>
                    <input-row-no-label type="textarea" 
                      :label="waiver_labels.header"
                      v-model="waiver.header[3]" 
                      :min-length="waiver_validators.header_min"
                      v-on:invalid="headerValidator($event, 3)">
                    </input-row-no-label>
                  </div>
                </td>
              </tr>
            <tr>
              <input-label-table-large 
                v-bind:class="{ 'has-error': items_have_errors }"
                :label="waiver_labels.items">
              </input-label-table-large>
              <td class="col-sm-8 text-left align-baseline">
                <div v-for='index in waiver.items.length' :key="index" class="border-top-bottom">
                  <input-row :label="waiver_labels.item_order" type="number" 
                    v-model="waiver.items[index-1]['order']" 
                    :small="true"
                    :min-num="waiver_validators.item_order_min"
                    :help-text="waiver_help.item_order"
                    v-on:invalid="itemValidator($event, index, 'order')">
                  </input-row>
                  <input-row :label="waiver_labels.item_title" type="text" 
                    v-model="waiver.items[index-1]['title']" 
                    :small="true"
                    :min-num="waiver_validators.item_title_min"
                    v-on:invalid="itemValidator($event, index, 'title')">
                  </input-row>
                  <input-row :label="waiver_labels.item_initials" type="checkbox"
                    v-model="waiver.items[index-1]['initials']" 
                    :small="true"
                    :required="false">
                  </input-row>
                  <input-row :label="waiver_labels.item_text" type="textarea" 
                    v-model="waiver.items[index-1]['text']" 
                    :small="true"
                    :min-num="waiver_validators.item_text_min"
                    v-on:invalid="itemValidator($event, index, 'text')">
                  </input-row>
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
              <input-table-row :label="waiver_labels.footer" type="textarea" 
                v-model="waiver.footer" 
                :min-length="waiver_validators.footer_min"
                v-on:invalid="invalid.footer = $event">
              </input-table-row>
            <tr>
              <td class="col-sm-2"></td>
              <td class="col-sm-10 text-right" colspan="2">
                <div class="row col-sm-12 my-2">
                  <div v-if="invalidForm" class="row mx-0 px-0 text-right text-danger">
                    <label>
                      Please correct the errors above before proceeding.
                    </label>
                  </div>
                  <button type="cancel" v-on:click="cancelSubmission" class="btn btn-warning mx-4 my-5">Cancel</button>
                  <button type="submit" class="btn btn-primary my-5" v-bind:disabled="invalidForm">Save & Submit</button>
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
    <waiver-read-only :waiver="waiver" :type="type"></waiver-read-only>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  import inputTableRow from './forms/inputTableRow.vue';
  import inputRow from './forms/inputRow.vue';
  import inputRowNoLabel from './forms/inputRowNoLabel.vue';
  import inputLabelTableLarge from './forms/inputLabelTableLarge.vue';
  import inputLabelOnly from './forms/inputLabelOnly.vue';
  import waiverReadOnly from './adminWaiverReadOnly.vue';
  import 'vue-scrollto';
  export default {
    name: "adminWaiverEdit",
    components: {
      inputTableRow,
      inputRow,
      inputRowNoLabel,
      inputLabelTableLarge,
      inputLabelOnly,
      waiverReadOnly
    },
    data() {
      return {
        waiver: {
          title: '',
          header: [],
          items: [],
          footer: '',

          initials: [],
          signature: '[MY FULL NAME]',
          signed_date: '',
        },

        waiver_labels: {
          title: "Title",
          header: "Header Text",
          items: "Legal Items",
          item_order: "Order #",
          item_title: "Title",
          item_initials: "Initials Required?",
          item_text: "Text",
          footer: "Footer"
        },

        waiver_help: {
          item_order: "This will define the order the items will appear on the waiver."
        },

        waiver_validators: {
          title_min: 2,
          header_min: 2,
          item_order_min: 0,
          item_text_min: 10,
          item_title_min: 2,
          footer_min: 2,
        },

        invalid: {
          title: false,
          header: [],
          items: [],
          footer: false,

          initials: [],
          signature: true,
          signed_date: true,
        },

        invalid_item: {
          'order': false,
          'title': false,
          'initials': false,
          'text': false
        },

        type: '',
        type_cap: '',

        preview_height: '',
        preview_btn_styles: {},

        headers_have_errors: false,
        items_have_errors: false,
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

          // init invalid list for each header
          this.waiver.header.forEach(h => {
            this.invalid.header.push(false);
          });

          // init invalid list for each item
          this.waiver.items.forEach(i => {
            this.invalid.items.push(this.invalid_item);
          });
          setTimeout(x => {this.matchHeight()}, 2000);
        })
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

      cancelSubmission(event) {
        if (event) { event.preventDefault(); }
        this.getWaiver(this.type);
      },

      headerValidator: function(invalid, idx) {
        this.invalid.header.splice(idx, 1, invalid);
        this.headers_have_errors = this.checkInvalidList(this.invalid.header);
      },

      itemValidator: function(invalid, idx, key) {
        let item_state = this.invalid.items[idx];
        item_state[key] = invalid;
        this.invalid.items.splice(idx, 1, item_state);
        this.items_have_errors = this.checkInvalidList(this.invalid.items);
      },

      checkInvalidList: function(list) {
        let invalid = false;
        list.forEach(i => {
          if (this.isDict(i)) {
            for (var key in i) {
              if (i[key]) { invalid = true; }
            }
          }
          else if (i) { invalid = true; }
        });
        return invalid;
      },

      isDict: function(x) {
        return typeof x==='object' && x!==null && !(x instanceof Array) && !(x instanceof Date);
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
            data: dataObj
          })
          .then(res => {
            this.$router.push('/admin/applications');
          })
        })
      },
    },

    computed: {
      // computed validators
      invalidForm: function() {
        if (this.invalid.title ||
          this.invalid.footer ||
          this.headers_have_errors ||
          this.items_have_errors) {
            return true;
          }
        else {
          return false;
        }
      },
    },

    created() {
      this.type = this.$route.params.type.toLowerCase();    // waiver type from the url params
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();
    },

    beforeMount() {
      this.getWaiver(this.$route.params.type);
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
</style>
