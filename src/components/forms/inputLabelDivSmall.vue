<template>
    <div class="col-md-2 col-sm-12 align-middle text-right">
		<input-label-only :label="label"></input-label-only>
    </div>
</template>

<script>
import inputLabelOnly from './inputLabelOnly.vue';
export default {
	name: "inputLabelDivSmall",
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
