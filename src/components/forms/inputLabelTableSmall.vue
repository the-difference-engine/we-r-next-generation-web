<template>
    <td class="col-md-2 col-sm-1 pr-2 text-right align-middle">
		<input-label-only :label="label"></input-label-only>
    </td>
</template>

<script>
import inputLabelOnly from './inputLabelOnly.vue';
export default {
	name: "inputLabelTableSmall",
	components: {
		inputLabelOnly
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
