<template>
  <div class="container mx-auto my-4">
    <div class="row col-sm-12">
      <h1>Thank you for your Application</h1>
      <div class="row col-sm-12 my-4 text-left">
        <p>Your application submitted successfully. Our staff and leadership team will review your application and contact you about next steps or if we need any further information.</p>
        <p>Please print and save a copy of the signed waiver for your records.</p>
      </div>
      <div class="col-sm-12 my-4 waiver">
        <span v-html="waiver"></span>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from '../sessionUtils'
import axios from "axios";
export default {
	name: "applicationSubmitted",
	data() {
		return {
			waiver: ''
		};
	},
    created() {
		let application_id = this.$route.params.id;
        localforage.getItem('X_TOKEN')
        .then(session => {
            axios.get('/api/v1/applications/' + application_id + '/waiver', {
                    'headers': { 'x-token': session }
                })
                .then(response => {
                    this.waiver = response.data.waiver_form
                })
                .catch()
        })
        .catch()
    },
};
</script>

<style>
    table > tbody > tr > td {
        vertical-align: top !important;
        padding-top: 1em !important;
        padding-bottom: 1em !important;
    }
</style>

<style scoped>
	.container {
		margin-bottom: 30px !important;
	}
	.waiver{
		padding: 25px;
		border: 2px solid gray;
	}
</style>
