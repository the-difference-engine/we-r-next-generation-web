<template>
  <div class="container">
    <h3>Add New Success Story</h3>
    <h4 class="text-success" v-if="messages">Your FAQ was successfully added!</h4>
    <div v-if="errors.length">
      <h4 class="text-danger">Please correct the following errors:</h4>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </div>
    <div class="row mx-0 my-3">
      <form v-on:submit.prevent="addSuccess">
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">About Camper</label>
          <div class="col-md-10">
            <vue-editor v-model="newStory.about"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">What They Learned</label>
          <div class="col-md-10">
            <vue-editor v-model="newStory.about"></vue-editor>
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
  name: 'addSuccess',
  components: {
    VueEditor
  },
  data() {
    return {
      newStory: {},
      messages: null,
      errors: []
    };
  }
};
</script>
