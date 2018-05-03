<template>
  <div class="container mx-auto my-4">
    <div class="row col-sm-12 my-5">
      <h1>Page Title</h1>
      <small class="col-sm-12">
        Subtitle
      </small>
    </div>
    <div class="row col-sm-12 text-left my-5">
			<form v-on:submit.prevent="submit" class="form">
				<table class="table text-left my-3">
					<tbody>
					<tr v-bind:class="{ 'has-error': has_errors.name }">
						<td class="col-sm-2 pr-2 text-right align-middle">
							<h4><label class="control-label">Name</label></h4>
						</td>
						<td class="col-sm-10 text-left align-baseline" colspan="2">
							<div class="row col-sm-12 my-2">
								<input type="text" class="form-control" v-model="name" @change="validateName()">
							</div>
							<div v-if="has_errors.name" class="col-sm-12 has-error px-0">
								<label class="control-label">{{errors.name}}</label>
							</div>
						</td>
					</tr>
					<tr>
						<td class="col-sm-2 pr-2 text-right align-top">
							<span v-bind:class="{ 'has-error': has_errors.second }">
							<h4><label class="control-label">Second</label></h4>
							</span>
						</td>
						<td class="col-sm-10 text-left align-baseline" colspan="2">
							<div v-bind:class="{ 'has-error': has_errors.second }" class="row col-sm-12 my-2">
								<input class="form-control" v-model="second" @change="validateSecond()">
							</div>
							<div v-if="has_errors.second" class="col-sm-12 has-error px-0">
								<label class="control-label">{{errors.second}}</label>
							</div>
							<div v-bind:class="{ 'has-error': has_errors.third }" class="row col-sm-12 my-2">
								<textarea class="form-control col-sm-12 my-2" rows=4 v-model="third" @change="validateThird()"></textarea>
							</div>
							<div v-if="has_errors.third" class="col-sm-12 has-error px-0">
								<label class="control-label">{{errors.third}}</label>
							</div>
						</td>
					</tr>
					<tr v-for='index in items.length' :key="index">
						<td class="col-sm-2 pr-2 text-right align-top">
							<span v-bind:class="{ 'has-error': has_errors.items_each[index-1] }">
							<h4><label class="control-label" v-if="index-1 === 0">Items Header</label></h4>
							</span>
						</td>
						<td class="col-sm-8 text-left align-baseline">
							<div v-bind:class="{ 'has-error': has_errors.items_each[index-1] }" class="row col-sm-12 my-2">
								<label class="col-sm-2 control-label">Item # {{index}}</label>
								<div class="col-sm-2">
									<input type="number" class="form-control" v-model="items[index-1]" v-on:change="validateItem(index-1)">
								</div>
								<div class="col-sm-8">
									<div class="col-sm-12">
										<small>Help text.</small>
									</div>
									<div v-if="has_errors.items_each[index-1]" class="col-sm-12 has-error">
										<label class="control-label">{{errors.items[index-1]}}</label>
									</div>
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
							<button class="btn btn-warning" v-on:click="addItem">Add Item</button>
						</td>
					</tr>
					<tr>
						<td class="col-sm-2"></td>
						<td class="col-sm-10 text-right" colspan="2">
							<div class="row col-sm-12 my-2">
								<button v-on:click="cancelSubmission" class="btn btn-warning mx-4 my-5">Cancel</button>
								<button type="submit" class="btn btn-primary my-5" v-bind:disabled="missingTitle || has_errors.second || has_errors.third || has_errors.items">Save & Submit</button>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</form>
    </div>
  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  export default {
    name: "template",
    data() {
      return {
				name: '',
				second: '',
				third: '',
				items: [],

				validators: {
					name_min: 2,
					second_min: 2,
					third_min: 10,
					item_max: 100,
        },

        errors: {
          name: '',
					second: '',
					third: '',
					items: [],
        },

				has_errors: {
					name: false,
					second: false,
					third: false,
					items: false,
					items_each: [],
				}
      };
    },
    methods: {

      deleteItem(item_idx) {
        // remove the item from the list by splice to update the DOM
				this.items.splice(item_idx, 1);
				this.errors.items.splice(item_idx, 1);
				this.has_errors.items_each.splice(item_idx, 1);
      },

      addItem() {
        // add a new item object to the list
				this.items.push(0);
				this.errors.items.push('');
				this.has_errors.items_each.push(false);
      },

      cancelSubmission() {
				this.name = '';
				this.second = '';
				this.third = '';
				
				for (let idx=0; idx<this.items.length; idx++) {
					this.deleteItem(idx);
				}
      },

      validateName: function() {
				if (
					this.name === '' || 
					this.name == null ||
					this.name.length < this.validators.name_min
				) {
					this.has_errors.name = true;
					this.errors.name = "Name must be at least " + str(this.validators.name_min) + " characters."
				}
				else {
					this.has_errors.name = false;
				}
      },

      validateSecond: function() {
				if (
					this.second === '' || 
					this.second == null ||
					this.second.length < this.validators.second_min
				) {
					this.has_errors.second = true;
					this.errors.second = "Second must be at least " + str(this.validators.second_min) + " characters."
				}
				else {
					this.has_errors.second = false;
				}
			},
			
      validateThird: function() {
				if (
					this.third === '' || 
					this.third == null ||
					this.third.length < this.validators.third_min
				) {
					this.has_errors.third = true;
					this.errors.third = "Third must be at least " + str(this.validators.third_min) + " characters."
				}
				else {
					this.has_errors.third = false;
				}
      },

      spliceInvalidItem: function(item_idx, error_msg, new_value) {
				this.has_errors.items.splice(item_idx, 1, current_errors);
				this.errors.items.splice(item_idx, 1, error_msg);
      },

      validateItem: function(item_idx) {
        let current_errors = {}
        if (this.items[item_idx] === '' || 
            this.items[item_idx] == null ||
            isNaN(this.items[item_idx]) ||
            this.items[item_idx] > this.validators.item_max
          ) {
					error_msg = "Item must be a value less than " + str(validators.item_max);
          this.spliceInvalidItem(item_idx, error_msg, true);
        }
        else {
					error_msg = "";
					this.spliceInvalidItem(item_idx, error_msg, false);
				}
				
				// determine if any items have errors and set items flag
        this.has_errors.items = false;
        for (let idx=0; idx<this.has_errors.items_each.length; idx++) {
          if (this.has_errors.items_each[idx]) {
            this.has_errors.items = true;
            break;
          }
        }
      }
		},
		
    computed: {

},
    created() {


    },

    beforeMount() {

    },
    beforeRouteUpdate(to, from, next) {

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
