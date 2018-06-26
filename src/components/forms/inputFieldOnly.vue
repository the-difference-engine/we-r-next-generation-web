<template>
    <div>
        <div v-if="type=='textarea'" class="row col-sm-12 my-2 mx-0 px-0">
            <textarea class="form-control" rows=4 v-model="inValEscaped" @change="validateInput"></textarea>
        </div>
        <div v-if="type!='textarea'" class="row col-sm-12 my-2 mx-0 px-0">
            <input :type="type" 
				v-bind:class="[{ 'checkbox' : isCheckbox() }]"
				class="form-control" 
				v-model="inValEscaped" @change="validateInput">
        </div>
    </div>
</template>

<script>
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
		helpText: {
			// input help text
			type: String
		},
		required: {
			// input value is required?
			type: Boolean,
			default: true
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
		}
	},
	data() {
		return {
			input: '',
			invalid: false,
			errMsgs: []
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
		},

		hasErrors(val) {
			this.invalid = val;
		},

		errors(val) {
			this.errMsgs = val;
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
			return invalid;
		},

		validateInput: function() {
			if (this.runValidators()) {
					this.invalid = true;
				}
			else {
				this.invalid = false;
				console.log("Validate", this.invalid);
			}
		},

		escapeChars (str) {
			str = str.replace(/</g, '&lt;');
			return str.replace(/>/g, '&gt;');
		},

        isCheckbox: function() {
            if (this.type == 'checkbox') {
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
				}
				else {
					this.input = value;
				}
			}
		},
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
</style>
