<template>
  <div class="container">
    <h3>Add New FAQ</h3>
    <h4 class="text-success" v-if="messages">Your FAQ was successfully added!</h4>
    <div v-if="errors.length">
      <h4 class="text-danger">Please correct the following errors:</h4>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </div>
    <div class="row mx-0 my-3">
      <form v-on:submit.prevent="faqAdd">
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Question</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="newFaq.question" v-bind:placeholder="newFaq.question">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Answer</label>
          <div class="col-md-10">
            <vue-editor v-model="newFaq.answer" :editorToolbar="customToolbar"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Category</label>
          <div class="col-md-10">
            <select class="form-control" id="exampleFormControlSelect1" v-model="newFaq.category">
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
            <router-link :to="'faqEdit'">
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
  name: 'faqAdd',
  components: {
    VueEditor
  },
  data() {
    return {
      newFaq: {},
      messages: false,
      errors: [],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    };
  },
  methods: {
    faqAdd() {
      this.errors = [];
      this.checkError();
      if (this.errors.length) {
        return;
      }
      localforage.getItem('X_TOKEN').then(session => {
        axios
          .post(`/api/v1/admin/faqAdd`, {
            headers: { 'x-token': session },
            params: this.newFaq
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
      if (this.newFaq.question && this.newFaq.answer && this.newFaq.category) {
        this.errors = [];
        return true;
      }
      if (!this.newFaq.question) this.errors.push('Question Required');
      if (!this.newFaq.answer) this.errors.push('Answer Required');
      if (!this.newFaq.category) this.errors.push('Category Required');
    }
  },

  created() {
    localforage.getItem('X_TOKEN').then(session => {
      if (session) {
        const config = { headers: { 'x-token': session } };
      }
    });
  }
};
</script>
