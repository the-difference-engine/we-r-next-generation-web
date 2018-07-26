<template>
    <div :class="$mq" class="col-md-2 col-sm-12 align-middle text-right">
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

<style scoped lang="postcss">
	.text-right.smartphone, .text-right.mobile {
		text-align: center !important;
	}
</style>
