<template>
  <div class="container">
    <h3>Edit Success Story</h3>
    <h4 class="text-success" v-if="messages">Your Success Story was successfully edited!</h4>
    <div v-if="errors.length">
      <h4 class="text-danger">Please correct the following errors:</h4>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </div>
    <div class="row mx-0 my-3">
      <form v-on:submit.prevent="successEditSingle">
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">About Camper</label>
          <div class="col-md-10">
            <vue-editor id="editAbout" v-model="editedStory.about" v-bind:placeholder="editedStory.about" :editorToolbar="customToolbar"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">What They Learned</label>
          <div class="col-md-10">
            <vue-editor id="editLearned" v-model="editedStory.learned" v-bind:placeholder="editedStory.learned" :editorToolbar="customToolbar"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12 text-right">
            <router-link :to="'/admin/successEdit'">
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
  name: 'successEditSingle',
  components: {
    VueEditor
  },
  data() {
    return {
      editedStory: {},
      messages: false,
      errors: [],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    };
  },
  methods: {
    successEditSingle() {
      this.checkError();
      if (this.errors.length) {
        return;
      }
      localforage.getItem('X_TOKEN').then(session => {
        axios
          .post(`/api/v1/successEdit/${this.editedStory._id.$oid}`, {
            headers: { 'x-token': session },
            params: this.editedStory
          })
          .then(res => {
            this.messages = true;
            setTimeout(() => {
              this.messages = false;
              this.$router.push('/admin/successEdit');
            }, 3000);
          })
          .catch(console.error);
      });
    },
    checkError() {
      if (this.editedStory.about && this.editedStory.learned) {
        this.errors = [];
        return true;
      }
      if (!this.editedStory.about)
        this.errors.push('About Camper Section Required');
      if (!this.editedStory.learned)
        this.errors.push('What They Learned Section Required');
    }
  },

  created() {
    localforage.getItem('X_TOKEN').then(session => {
      if (session) {
        const config = { headers: { 'x-token': session } };
        axios
          .get(`/api/v1/successEdit/${this.$route.params.id}`, config)
          .then(res => {
            this.editedStory = res.data;
          })
          .catch(err => console.error(err));
      }
    });
  }
};
</script>
