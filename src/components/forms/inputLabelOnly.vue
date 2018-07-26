<template>
    <label class="control-label my-0">{{label}}</label>
</template>

<script>
export default {
	name: "inputLabelOnly",
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
