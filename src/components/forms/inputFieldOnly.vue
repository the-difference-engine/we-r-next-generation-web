<template>
    <div>
        <div v-if="type=='textarea'" class="row col-sm-12 my-2 mx-0 px-0">
            <textarea class="form-control" rows=4 
				v-model="inValEscaped" 
				@change="validateInput"
				@blur="lostFocus"
				:placeholder="placeholder"
				:readonly="readonly"
				:autocomplete="autocomplete"
			></textarea>
        </div>
		<div v-else-if="type=='select'" class="row col-sm-12 my-2 mx-0 px-0">
			<select class="col-sm-12 form-control"
				:readonly="readonly"
				:autocomplete="autocomplete"
				v-model="inValEscaped" 
				@change="validateInput"
				@blur="lostFocus">
				<option disabled value="">Please select one...</option>
				<option v-for="choice in choices" v-bind:value="choice.value">{{choice.text}}</option>
			</select>
		</div>
		<div v-else-if="type=='radio'" class="row col-sm-12 my-2 mx-0 px-1">
			<div v-for="choice in choices">
				<input type="radio" 
					class="form-control radio align-middle" 
					v-model="inValEscaped" 
					@change="validateInput"
					@blur="lostFocus"
					v-bind:value="choice.value">
				<label :for="choice.value" class="control-label align-middle my-0">{{choice.text}}</label>
			</div>
		</div>
        <div v-else class="row col-sm-12 my-2 mx-0 px-0">
            <input :type="type" 
				v-bind:class="[{ 'checkbox' : isCheckbox() }]"
				class="form-control" 
				:placeholder="placeholder"
				:readonly="readonly"
				:autocomplete="autocomplete"
				v-model="inValEscaped" 
				@change="validateInput"
				@blur="lostFocus">
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
	name: "inputFieldOnly",
	props: {
		// properties must meet the following criteria
		label: {
			// input label
			type: String,
			required: true
		},
		type: {
			// input type
			type: String,
			default: 'text',
			validate: function(val) {
				let types = [
					'text',
					'textarea',
					'password',
					'submit',
					'reset',
					'radio',
					'checkbox',
					'button',
					'date',
					'color',
					'datetime-local',
					'email',
					'month',
					'number',
					'range',
					'search',
					'select',
					'tel',
					'time',
					'url',
					'week'
				]
				return (types.indexOf(val.toLowerCase()) > -1)
			}
		},
		defaultValue: {
			// input default
			type: [String, Number, Boolean, Array],
			default: ''
		},
		choices: {
			// input choices for radio, checkbox, or select
			type: Array,
			default: function() { return [] }
		},
		helpText: {
			// input help text
			type: String
		},
		placeholder: {
			// placeholder for input field
			type: String,
			default: ''
		},
		autocomplete: {
			// autocomplete provided by HTML standard to help users
			// use previously entered data to autofill standard forms
			type: String,
			default: ''
		},
		toUpper: {
			// boolean flag used to set the input to upper case characters
			type: Boolean,
			default: false
		},
		required: {
			// input value is required?
			type: Boolean,
			default: true
		},
		readonly: {
			// boolean to indicate a read only input field
			type: Boolean,
			default: false
		},
		minLength: {
			// minimum string length used for input validation
			type: Number
		},
		maxLength: {
			// maximum string length used for input validation
			type: Number
		},
		minNum: {
			// minimum number value
			type: Number
		},
		maxNum: {
			// maximum number value
			type: Number
		},
		minDate: {
			// minimum date value
			type: Date
		},
		maxDate: {
			// maximum date value
			type: Date
		},
		value: {
			// input value
			type: [String, Number, Boolean, Array],
			default: ''
		},
		hasErrors: {
			// Boolean indicator whether input has errors
			// Validation is handled on the parent component
			type: Boolean,
			default: false
		},
		errors: {
			// list of error messages
			type: Array
		},
		pristine: {
			// boolean flag indicates whether the field is clean (unused)
			// set to true when form created (or cleared, e.g., on cancel)
			// set to false when field loses focus
			type: Boolean,
			default: true
		},
	},
	data() {
		return {
			input: '',
			invalid: false,
			errMsgs: [],
			isPristine: true,
		}
	},
	watch: {
		// emit changes from child to parent
		input(val) {
			this.$emit('input', val);
		},
		invalid(val) {
			this.$emit('invalid', val);
		},
		errMsgs(val) {
			this.$emit('errMsgs', val);
		},

		// listen to changes from parent to child
		value(val) {
			this.input = val;
			// run validators if the input field is not empty on setup
			if (val == null || val == '') { } else {
				this.validateInput();
			}
		},
		hasErrors(val) {
			this.invalid = val;
		},
		errors(val) {
			this.errMsgs = val;
		},
		pristine(val) {
			if (val == true) {
				this.clearValidators();
			}
			this.isPristine = val;
		}
	},
	methods: {
		requiredInvalid: function() {
			if (this.required) {
				if (this.input == null || this.input == '') {
					this.errMsgs.push(this.label + " is required");
					return true;
				}
			}
			return false
		},
		stringMinInvalid: function() {
			if (this.minLength) {
				if (this.input.length < this.minLength) {
					this.errMsgs.push(this.label + " must be at least " + this.minLength.toString() + " characters");
					return true;
				}
			}
			return false;
		},
		stringMaxInvalid: function() {
			if (this.maxLength) {
				if (this.input.length > this.maxLength) {
					this.errMsgs.push(this.label + " must be less than " + this.maxLength.toString() + " characters");
					return true;
				}
			}
			return false;
		},
		numMinInvalid: function() {
			if (this.minNum != null) {
				if (this.input < this.minNum) {
					this.errMsgs.push(this.label + " must be greater than " + this.minNum.toString());
					return true;
				}
			}
			return false;
		},
		numMaxInvalid: function() {
			if (this.maxNum) {
				if (this.input > this.maxNum) {
					this.errMsgs.push(this.label + " must be less than " + this.maxLength.toString());
					return true;
				}
			}
			return false;
		},
		dateMinInvalid: function() {
			if (this.minDate) {
				if (this.input < this.minDate) {
					this.errMsgs.push(this.label + " must be greater than " + this.minDate.toString());
					return true;
				}
			}
			return false;
		},
		dateMaxInvalid: function() {
			if (this.maxDate) {
				if (this.input > this.maxDate) {
					this.errMsgs.push(this.label + " must be less than " + this.maxDate.toString());
					return true;
				}
			}
			return false;
		},

		runValidators: function() {
			this.errMsgs = [];
			let validators = [
				this.requiredInvalid,
				this.stringMinInvalid,
				this.stringMaxInvalid,
				this.numMinInvalid,
				this.numMaxInvalid,
				this.dateMinInvalid,
				this.dateMaxInvalid
			]
			let invalid = false;
			validators.forEach(v => {
				if (v()) { invalid = true; }
			});
			this.invalid = invalid;
		},
		lostFocus: function() {
			// run validators immediately on losing focus
			this.isPristine = false;
			this.runValidators();
		},
		validateInput: function() {
			if (this.isPristine == false) {
				this.debouncedValidator();
			}
		},
		clearValidators: function() {
			// reset invalid property to false
			// and clear error messages
			// fired when the pristine flag is true
			// e.g., on cancel event
			this.invalid = false;
			this.errMsgs = [];
		},
		escapeChars (str) {
			str = str.replace(/</g, '&lt;');
			return str.replace(/>/g, '&gt;');
		},
		setUpper: function(str) {
			return str.toUpperCase();
		},
        isCheckbox: function() {
            if (this.type == 'checkbox' || this.type == 'radio') {
                return true;
            }
            else {
                return false;
            }
		},
	},
	computed: {
		inValEscaped: {
			get () {
				return this.input;
			},
			set (value) {
				if (typeof(value) == "string") {
					this.input = this.escapeChars(value);
					if (this.toUpper) {
						this.input = this.setUpper(this.input);
					}
				}
				else {
					this.input = value;
				}
			}
		},
	},
	mounted() {
		// _.debounce is a function provided by lodash to limit how
		// often a particularly expensive operation can be run.
		// In this case, we want to limit how we set the invalid property,
		// waiting until the user has completely finished typing
		// https://lodash.com/docs/4.17.5#debounce
		this.debouncedValidator = _.debounce(this.runValidators, 2000);
		this.validateInput();
	},
}
</script>

<style scoped>
	.checkbox {
		position: relative;
		display: inline-block;
		border: 1px solid #a9a9a9;
		border-radius: .25em;
		width: 1em;
		height: 1.4em;
		float: left;
		margin-right: .5em;
	}
	.radio {
		position: relative;
		display: inline-block;
		border: 1px solid #a9a9a9;
		border-radius: .25em;
		width: 1em;
		height: 1.4em;
		margin-right: .5em;
	}
</style>
