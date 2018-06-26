<template>
	<div v-bind:class="{ 'has-error': invalid }" class="row col-sm-12 my-2 mx-0 px-0">
		<input-label-div-small v-if="small" :label="label"></input-label-div-small>
		<input-label-div-large v-if="!small" :label="label"></input-label-div-large>
		<div :class="$mq" class="col-md-9 col-sm-12 align-middle">
			<input-row-no-label 
				:type=type
				:label="label"
				:value="rowInput"
				:defaultValue="defaultValue"
				:help-text="helpText"
				:required="required"
				:minLength="minLength"
				:max-length="maxLength"
				:min-num="minNum"
				:max-num="maxNum"
				:min-date="minDate"
				:max-date="maxDate"
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
            type: String,
            default: null
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
		},
		small: {
			// sets the label to a smaller size
			type: Boolean,
			default: false
		}
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
		value: function() {
			this.rowInput = this.value;
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
