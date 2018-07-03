<template>
    <td class="col-md-2 col-sm-1 pr-2 text-right align-middle">
		<input-label-large :label="label"></input-label-large>
    </td>
</template>

<script>
import inputLabelLarge from './inputLabelLarge.vue';
export default {
	name: "inputLabelTableLarge",
	components: {
		inputLabelLarge
	},
	props: {
		// properties must meet the following criteria
		label: {
			// input label
			type: String,
			required: true
		},
	},
}
</script>
