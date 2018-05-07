<template>
  <div>
    <h3>Edit FAQ</h3>
    <h4 class="text-success" v-if="messages">Your FAQ was successfully edited!</h4>
    <div class="row mx-0 my-3">
      <form v-on:submit.prevent="faqEditSingle">
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Question</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="qaObject.question" v-bind:placeholder="qaObject.question">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Answer</label>
          <div class="col-md-10">
            <textarea rows="4" class="form-control" v-model="qaObject.answer"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Category</label>
          <div class="col-md-10">
            <select class="form-control" id="exampleFormControlSelect1" v-model="qaObject.category">
              <option>Creativity</option>
              <option>Culture</option>
              <option>Curriculum</option>
              <option>Success</option>
              <option>Values</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12 text-right">
            <button type="submit" class="btn btn-primary">Save & Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import localforage from '../sessionUtils';
import sessionUtils from '../sessionUtils';
export default {
  name: 'faqEditSingle',
  data() {
    return {
      qaObject: {},
      messages: null
    };
  },
  methods: {
    faqEditSingle() {
      console.log('edit qaObject: ', this.qaObject);
      localforage.getItem('X_TOKEN').then(session => {
        console.log('session:', session);
        axios
          .post(`/api/v1/faqEdit/${this.qaObject._id.$oid}`, {
            headers: { 'x-token': session },
            params: this.qaObject
          })
          .then(res => {
            this.messages = true;
            setTimeout(() => {
              this.messages = null;
              this.$router.push('/faqEdit');
            }, 5000);
          })
          .catch(() => {
            setTimeout(() => {}, 3000);
          });
      });
    }
  },

  created() {
    localforage.getItem('X_TOKEN').then(session => {
      console.log('session: ', session);
      if (session) {
        const config = { headers: { 'x-token': session } };
        axios
          .get(`/api/v1/faqEdit/${this.$route.params.id}`, config)
          .then(res => {
            this.qaObject = res.data;
            console.log('qaObject: ', this.qaObject);
          })
          .catch(err => console.error(err));
      }
    });
  }
};
</script>

<style scoped>

</style>
