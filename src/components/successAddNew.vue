<template>
  <div class="container">
    <h3 class="scroller-catch">Add New Success Story</h3>
    <h4 class="text-success" v-if="messages">Your Success Story was successfully added!</h4>
    <div v-if="errors.length">
      <h4 class="text-danger">Please correct the following errors:</h4>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </div>
    <div class="row mx-0 my-3">
      <form v-on:submit.prevent="addSuccess">
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Camper Name</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="newStory.name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">About Camper</label>
          <div class="col-md-10">
            <vue-editor id="newStoryAbout" v-model="newStory.about" :editorToolbar="customToolbar"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">What They Learned</label>
          <div class="col-md-10">
            <vue-editor id="newStoryLearned" v-model="newStory.learned" :editorToolbar="customToolbar"></vue-editor>
          </div>
        </div>
        <div class="form-group row">
          <hr>
          <div class="form-group row">
            <p><i>* The width and height ratio of uploaded Succes Story Images should be 1:1</i></p>
          </div>
          <div class="form-group row; text-left">
            <label class="col-md-2 col-form-label text-right">Camper Image</label>
            <input name="camperImage" type="file" v-on:change="camperPreviewImage" accept="camperImage/*">
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label text-right">Preview Section</label>
            <img style="max-height: 300px; max-height: 300px" :src="camperImageData"/>
          </div>
          <hr>
          <div class="form-group row">
            <label class="col-md-2 col-form-label text-right">Artwork Image</label>
            <input name="artworkImage" type="file" v-on:change="artworkPreviewImage" accept="image/*">
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label text-right">Preview Section</label>
            <img style="max-height: 300px; max-height: 300px" :src="artworkImageData"/>
         </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12 text-right">
            <router-link :to="'successEdit'">
              <button type="submit" class="btn btn-danger">Cancel</button>
            </router-link>
            <button type="submit" class="btn btn-primary" v-on:click.self="scrollToPreview()">Save & Submit New Success Story</button>
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
  name: 'successAddNew',
  components: {
    VueEditor
  },
  data() {
    return {
      newStory: {},
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
      camperFile: [],
      artworkFile: [],
      camperImageData: '',
      artworkImageData: ''
    };
  },
  methods: {
    camperPreviewImage(event) {
      this.camperFile = event.target.files;
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          this.camperImageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    artworkPreviewImage(event) {
      this.artworkFile = event.target.files;
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          this.artworkImageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    addSuccess(evt) {
      event.preventDefault();
      this.errors = [];
      this.checkError();
      if (this.errors.length) {
        return;
      }

      const formData = new FormData();
      formData.append('file', this.camperFile[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');

      // posting to Cloudinary
      axios.post(this.clUrl, formData).then(res => {
        let url = res.data.secure_url;
        let camperUrlToSave = '';
        for (var i = 0; i < url.length; i++) {
          if (url[i] === '/') {
            var upload = url.slice(i, i + 8);
            if (upload === '/upload/') {
              var front = url.slice(0, i + 8);
              var back = url.slice(i + 8);
              camperUrlToSave = `${front}q_auto/${back}`;
            }
          }
        }

        const formData = new FormData();
        formData.append('file', this.artworkFile[0]);
        formData.append('upload_preset', this.cloudinary.uploadPreset);
        formData.append('tags', 'gs-vue,gs-vue-uploaded');

        axios.post(this.clUrl, formData).then(res => {
          let url = res.data.secure_url;
          let artworkUrlToSave = '';
          for (var i = 0; i < url.length; i++) {
            if (url[i] === '/') {
              var upload = url.slice(i, i + 8);
              if (upload === '/upload/') {
                var front = url.slice(0, i + 8);
                var back = url.slice(i + 8);
                artworkUrlToSave = `${front}q_auto/${back}`;
              }
            }
          }

          // taking URL from Cloudinary
          localforage
            .getItem('X_TOKEN')
            .then(session => {
              this.newStory.image = camperUrlToSave;
              this.camperImageData = '';
              this.newStory.artwork = artworkUrlToSave;
              this.artworkImageData = '';
              axios
                .post(`/api/v1/admin/successAdd`, {
                  headers: { 'x-token': session },
                  params: this.newStory
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
      });
    },

    scrollToPreview() {
      let element = '.scroller-catch';
      let duration = 1000;
      var VueScrollTo = require('vue-scrollto');
      VueScrollTo.scrollTo(element, duration);
    },
    checkError() {
      if (
        this.newStory.name &&
        this.newStory.about &&
        this.newStory.learned &&
        this.camperImageData &&
        this.artworkImagedata
      ) {
        this.errors = [];
        return true;
      }
      if (!this.newStory.name) {
        this.errors.push('Camper Name Required');
      }
      if (!this.newStory.about) {
        this.errors.push('About Camper Section Required');
      }
      if (!this.newStory.learned) {
        this.errors.push('What They Learned Section Required');
      }
      if (!this.camperImageData) {
        this.errors.push('Camper Image Required');
      }
      if (!this.artworkImageData) {
        this.errors.push('Artwork Image Required');
      }
    }
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },

  created() {
    localforage.getItem('X_TOKEN').then(session => {
      if (session) {
        const config = { headers: { 'x-token': session } };
        axios
          .get('/api/v1/resources/cloudinaryapi')
          .then(res => {
            this.cloudinary.apiKey = res.data.cloudinaryApi;
          })
          .catch(err => console.error(err));
      }
    });
  }
};
</script>
