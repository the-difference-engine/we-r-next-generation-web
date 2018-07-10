<template>
    <h4><input-label-only :label="label"></input-label-only></h4>
</template>

<script>
import inputLabelOnly from './inputLabelOnly.vue';
export default {
	name: "inputLabelLarge",
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
