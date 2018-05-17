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
            <vue-editor v-model="newStory.learned"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Image</label>
          <input name="image" type="file" v-on:change="previewImage" accept="image/*">
          <div class="form-group row text-left">
            <p><i>* The width to height ratio of uploaded Succes Story Images should be 1.33 : 1</i></p>
          </div>
          <div class="col-md-3 text-right">
            <button v-on:click.self="submitImage" type="submit" class="btn btn-primary submit-button">Submit</button>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Preview Section</label>
          <img :src="imageData"/>
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
      errors: [],
      cloudinary: {
        uploadPreset: 'loazbic8',
        apiKey: '234871425639756',
        cloudName: 'wernextgeneration'
      },
      file: [],
      imageData: ''
    };
  },
  methods: {
    previewImage: function(event) {
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
    }
  },
  submitImage: function(evt) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.file[0]);
    formData.append('upload_preset', this.cloudinary.uploadPreset);
    formData.append('tags', 'gs-vue,gs-vue-uploaded');
    // For debug purpose only
    // Inspects the content of formData
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
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
      // need to chain a promise here

      // taking URL from Cloudinary
      localforage
        .getItem('X_TOKEN')
        .then(session => {
          console.log('URL TO BE SENT', urlToSave);
          this.imageData = '';
          axios
            .put('/api/v1/admin/addSuccessStory', {
              headers: { 'x-token': session },
              about: '',
              learned: '',
              image: urlToSave
            })
            // edit code for page redirect
            .then(() => {
              axios
                .get('/api/v1/resources/homepage')
                .then(res => {
                  this.homePageData = res.data;
                })
                .catch(console.log);
            })
            .catch(console.error);
        })
        .catch(console.error);
    });
  }
};
</script>
