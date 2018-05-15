<template>
  <div class="container">
    <h3>Edit FAQ</h3>
    <h4 class="text-success" v-if="messages">Your FAQ was successfully edited!</h4>
    <div v-if="errors.length">
      <h4 class="text-danger">Please correct the following errors:</h4>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </div>
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
            <vue-editor v-model="qaObject.answer"></vue-editor>
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
            <router-link :to="'/admin/faqEdit'">
              <button type="submit" class="btn btn-danger">Cancel</button>
            </router-link>
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
import { VueEditor, Quill } from '../../node_modules/vue2-editor';
export default {
  name: 'faqEditSingle',
  components: {
    VueEditor
  },
  data() {
    return {
      qaObject: {},
      messages: false,
      errors: []
    };
  },
  methods: {
    faqEditSingle() {
      console.log('edit qaObject: ', this.qaObject);
      this.checkError();
      console.log('Jailbreak!');
      if (this.errors.length) {
        return;
      }
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
              this.messages = false;
              this.$router.push('/admin/faqEdit');
            }, 3000);
          })
          .catch(console.error);
      });
    },
    checkError() {
      console.log('checking for errors');
      if (
        this.qaObject.question &&
        this.qaObject.answer &&
        this.qaObject.category
      ) {
        this.errors = [];
        return true;
      }

      if (!this.qaObject.question) this.errors.push('Question Required');
      if (!this.qaObject.answer) this.errors.push('Answer Required');
      if (!this.qaObject.category) this.errors.push('Category Required');
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
