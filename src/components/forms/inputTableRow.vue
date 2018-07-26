<template>
	<tr v-bind:class="{ 'has-error': invalid }">
		<input-label-table-small v-if="small" :label="label"></input-label-table-small>
		<input-label-table-large v-if="!small" :label="label"></input-label-table-large>
		<td class="col-sm-10 text-left align-baseline">
			<div class="row col-sm-12 mx-0 px-0">
				<input-field-only :type=type
					:label="label"
					v-model="input"
					:defaultValue="defaultValue"
					:placeholder="placeholder"
					:readonly="readonly"
					:autocomplete="autocomplete"
					:to-upper="toUpper"
					:choices="choices"
					:help-text="helpText"
					:required="required"
					:minLength="minLength"
					:max-length="maxLength"
					:min-num="minNum"
					:max-num="maxNum"
					:min-date="minDate"
					:max-date="maxDate"
					:pristine="pristine"
					v-on:input="input = $event"
					v-on:invalid="invalid = $event"
					v-on:errMsgs="errMsgs = $event">
				</input-field-only>
				<div v-if="helpText" class="col-sm-12 px-0">
					<small>{{helpText}}</small>
				</div>
				<div v-if="invalid" class="col-sm-12 has-error px-0">
					<label v-for="e in errMsgs" class="row col-sm-12 control-label">{{e}}</label>
				</div>
			</div>
		</td>
	</tr>
</template>

<script>
import inputFieldOnly from './inputFieldOnly.vue';
import inputLabelTableLarge from './inputLabelTableLarge.vue';
import inputLabelTableSmall from './inputLabelTableSmall.vue';
export default {
	name: "inputTableRow",
	components: {
		inputFieldOnly,
		inputLabelTableLarge,
		inputLabelTableSmall
	},
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
		placeholder: {
			// placeholder for input field
			type: String,
			default: ''
		},
		autocomplete: {
			// autocomplete provided by HTML standard to help users
			// use previously entered data to autofill standard forms
			type: String,
		},
		toUpper: {
			// boolean flag used to set the input to upper case characters
			type: Boolean,
			default: false
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
		small: {
			// sets the label to a smaller size
			type: Boolean,
			default: false
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
    mounted: function() {
        this.input = this.value;
    },
}
</script>
