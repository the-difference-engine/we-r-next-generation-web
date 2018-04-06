<template>
  <div class="container">
	<div class="row col-sm-12">
		<h1>Thank you for your Application</h1>
		<div class="col-sm-12 my-4">
			<p>Your application submitted successfully. Our staff and leadership team will review your application and contact you about next steps or if we need any further information.</p>
			<p>Please print and save a copy of the signed waiver for your records.</p>
		</div>
		<div class="col-sm-12 my-4">
			{{waiver}}
		</div>
	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
	name: "application_submitted",
	data() {
		return {};
	}
};
</script>

<style scoped>

</style>
