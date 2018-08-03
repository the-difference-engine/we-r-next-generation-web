<template>
	<div v-bind:class="{ 'has-error': invalid }" class="row col-xs-12 my-2 mx-0 px-0">
		<input-label-div-small v-if="small" :label="label"></input-label-div-small><!-- Comment to remove row white space!
		--><input-label-div-large v-if="!small" :label="label"></input-label-div-large><!-- Comment to remove row white space!
		--><div :class="$mq" class="col-md-10 col-xs-12 mx-0 px-0 align-middle">
			<input-row-no-label 
				:type=type
				:label="label"
				:pre-add-on-text="preAddOnText"
				:add-on-color="addOnColor"
				:value="rowInput"
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
				v-on:input="rowInput = $event"
				v-on:invalid="invalid = $event"
				v-on:errMsgs="errMsgs = $event">
			</input-row-no-label>
		</div>
	</div>
</template>

<script>
import inputRowNoLabel from './inputRowNoLabel.vue';
import inputLabelDivLarge from './inputLabelDivLarge.vue';
import inputLabelDivSmall from './inputLabelDivSmall.vue';
export default {
	name: "inputRow",
	components: {
        inputRowNoLabel,
        inputLabelDivLarge,
        inputLabelDivSmall
	},
	props: {
		// properties must meet the following criteria
		label: {
			// input label
			type: String,
			required: true
		},
		preAddOnText: {
			// include a Bootstrap add on prefix
			// the prop value should be the string
			// to include in the input prefix
			type: String,
			default: ''
		},
		addOnColor: {
			// adapt the default color for add ons
			type: String,
			default: ''
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
            type: String,
            default: null
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
            rowInput: null,
			invalid: false,
			errMsgs: []
		}
	},
	watch: {
		// emit changes from child to parent
		rowInput(val) {
			this.$emit('input', val);
		},

		invalid(val) {
			this.$emit('invalid', val);
		},

		errMsgs(val) {
			this.$emit('errMsgs', val);
		},

		// listen to changes from parent to child
		value: function(val) {
			this.rowInput = val;
		},

		hasErrors(val) {
			this.invalid = val;
		},

		errors(val) {
			this.errMsgs = val;
		}
    },
    mounted: function() {
        this.rowInput = this.value;
    },
}
</script>

<style scoped lang="postcss">
	.align-middle.tablet, .align-middle.smartphone, .align-middle.mobile {
		display: block !important;
	}
</style>
