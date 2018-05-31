<template>
  <div class="container">
    <h3 class="scroller-catch">Edit Success Story</h3>
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
          <label class="col-md-2 col-form-label text-right">Image On File</label>
          <div class="col-md-10">
            <img style="height: auto; max-height: 100px;" v-bind:src="editedStory.image" />
          </div>
          <input name="image" type="file" v-on:change="previewImage" accept="image/*">
          <div class="form-group row text-left">
            <p><i>* The width to height ratio of uploaded Succes Story Images should be 1.33 : 1</i></p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Preview Section</label>
          <img :src="imageData"/>
        </div>
        <div class="form-group row">
          <div class="col-md-12 text-right">
            <router-link :to="'/admin/successEdit'">
              <button type="submit" class="btn btn-danger">Cancel</button>
            </router-link>
            <button type="submit" class="btn btn-primary" v-on:click.self="scrollToPreview()">Save & Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import localforage from '../sessionUtils';
import 'vue-scrollto';
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
      ],
      cloudinary: {
        uploadPreset: 'loazbic8',
        apiKey: '',
        cloudName: 'wernextgeneration'
      },
      file: [],
      imageData: ''
    };
  },
  methods: {
    previewImage(event) {
      this.file = event.target.files;
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    successEditSingle(evt) {
      event.preventDefault();
      this.errors = [];
      this.checkError();
      if (this.errors.length) {
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');

      // posting to Cloudinary
      axios.post(this.clUrl, formData).then(res => {
        let url = res.data.secure_url;
        let urlToSave = '';
        for (var i = 0; i < url.length; i++) {
          if (url[i] === '/') {
            var upload = url.slice(i, i + 8);
            if (upload === '/upload/') {
              var front = url.slice(0, i + 8);
              var back = url.slice(i + 8);
              urlToSave = `${front}q_auto/${back}`;
            }
          }
        }

        // taking URL from Cloudinary
        localforage
          .getItem('X_TOKEN')
          .then(session => {
            this.editedStory.image = urlToSave;
            this.imageData = '';
            axios
              .post(`/api/v1/successEdit/${this.editedStory._id.$oid}`, {
                headers: { 'x-token': session },
                params: this.editedStory
              })
              .then(res => {
                this.messages = true;
                setTimeout(() => {
                  this.messages = false;
                  this.scrollToPreview();
                  this.$router.push('/admin/successEdit');
                }, 5000);
              })
              .catch(console.error);
          })
          .catch(console.error);
      });
    },
    scrollToPreview() {
      let element = '.scroller-catch';
      let duration = 1000;
      var VueScrollTo = require('vue-scrollto');
      VueScrollTo.scrollTo(element, duration);
    },
    checkError() {
      if (this.editedStory.about && this.editedStory.learned && this.editedStory.image) {
        this.errors = [];
        return true;
      }
      if (!this.editedStory.about)
        this.errors.push('About Camper Section Required');
      if (!this.editedStory.learned)
        this.errors.push('What They Learned Section Required');
      if (!this.editedStory.image)
        this.errors.push('Image Required');
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
          axios.get("/api/v1/resources/cloudinaryapi")
          .then(res => {
            this.cloudinary.apiKey = res.data.cloudinaryApi;
          })
          .catch(err => console.error(err));
      }
    });
  },

  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  }
};
</script>
