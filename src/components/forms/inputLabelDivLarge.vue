<template>
    <div class="col-md-2 col-sm-12 align-middle">
		<input-label-large :label="label"></input-label-large>
    </div>
</template>

<script>
import inputLabelLarge from './inputLabelLarge.vue';
export default {
	name: "inputLabelDivLarge",
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
