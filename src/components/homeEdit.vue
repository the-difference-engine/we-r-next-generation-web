<template>
<div class='container-fluid'>
  <div class='row'>
    <h1>Home Page Edit</h1>
  </div>
  <hr>
  <div class='row'>
    <h3>Current Hero Image</h3>
  </div>
  <h5 class="text-success" v-if="messages">Your FAQ was successfully deleted!</h5>
  <h5>The width to height ratio of the Hero image should be 2.8 : 1</h5>
  <div class='row'>
    <img :src="homePageData.heroImage" alt="top-image" class="fit-image1">
  </div>
  <div class='row'>
    <h5 class="text-center">There are two methods of uploading a new hero image. One is to upload an image then hit the submit button. The other is to input an image url (this can be used to easily reverse changes if you saved the previous image address)</h5>
  </div>
  <div class='row'>
    <form v-on:submit="submitHeroImageFile" class="flexer">
      <input name="companyLogo" type="file" v-on:change="previewImage" accept="image/*" class="file-pad">
      <button type="submit" class="btn btn-primary submit-button pad">Add a New Hero Image to Replace Existing</button>
    </form>
  </div>
  <div v-if="imageData">
    <div class='row'>
      <h3>Preview:</h3>
    </div>
    <div class='row'>
      <img :src="imageData"/>
    </div>
  </div>
  <div class="row">
    <form v-on:submit="submitHeroImageUrl" id="url-form" class="flexer">
      <input required name="url" type='text' class="form-control pad"/>
      <button type="submit" class="btn btn-primary submit-button pad">Submit Hero Image URL</button>
    </form>
  </div>
  <h5 class="flexer">
    Last 5 URLs used for Hero Image:
    <div class="flex-list" v-for="(url, index) in homePageData.heroHistory" :key="index">{{url}}</div>
  </h5>
  <hr>
  <div class='row'>
    <h3>Partners</h3>
  </div>
  <div class='row'>
    The width to height ratio of Partner logos should be 1.33 : 1
  </div>
  <div class='row'>
    Current partner logos
    <div class="img-container2">
      <div v-for="(partner, index) in homePageData.partners" :key="index" v-bind:style="{width: Math.floor(100/homePageData.partners.length) + '%'}" class="partners">
        <img :src="partner" :alt="'partner image 1' + index" class="fit-image"/>
        <button v-on:click="removePartner" :value="index" class="btn btn-danger" type="button">X</button>
      </div>
    </div>
  </div>
  <div class='row'>
    Add partner:
  </div>
  <div class='row'>
    <form v-on:submit="submitPartnerFile" class="flexer">
      <input name="companyLogo" type="file" v-on:change="previewPartnerImage" accept="image/*" class="file-pad">
      <button type="submit" class="btn btn-primary submit-button pad">Submit New Partner Image</button>
    </form>
  </div>
  <div v-if="partnerImageData">
    <div class='row'>
      <h3>Preview:</h3>
    </div>
    <div v-bind:style="{margin: 'auto', width: Math.floor(100/homePageData.partners.length) + '%'}">
      <img :src="partnerImageData" class="fit-image" />
    </div>
  </div>
</div>

</template>

<script>
  import axios from 'axios';
  import localforage from '../sessionUtils';
  export default {
    name: 'homeEdit',
    data () {
      return {
        homePageData: {
          sStories: [{text:''}]
        },
        cloudinary: {
              uploadPreset: 'loazbic8',
              apiKey: '234871425639756',
              cloudName: 'wernextgeneration'
        },
        file: [],
        partnerFile: [],
        imageData: '',
        partnerImageData: '',
        heroImageManualUrl: '',
        messages: ''
      }
    },
    created() {
      axios.get('/api/v1/resources/homepage')
      .then(res => {
        this.homePageData = res.data
      })
      .catch(console.error)
    },
    methods: {
      previewImage: function(event){
        this.file = event.target.files
        let input = event.target;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
              this.imageData = e.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
      },
      previewPartnerImage: function(event){
        this.partnerFile = event.target.files
        let input = event.target;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
              this.partnerImageData = e.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
      },
      submitHeroImageFile: function(event){
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', this.file[0]);
        formData.append('upload_preset', this.cloudinary.uploadPreset);
        formData.append('tags', 'gs-vue,gs-vue-uploaded');
        axios.post(this.clUrl, formData).then(res => {
          let url = res.data.secure_url
          let urlToSave = ''
          for (var i = 0; i < url.length; i++) {
            if (url[i] === '/') {
              var upload = url.slice(i, i+8);
              if (upload === '/upload/') {
                var front = url.slice(0, i+8)
                var back = url.slice(i+8)
                urlToSave = `${front}q_auto/${back}`
              }
            }
          }
          localforage.getItem('X_TOKEN')
          .then(session => {
            this.imageData = ''
            axios.put('/api/v1/resources/update/heroimage', {
              headers: { 'x-token': session },
                heroImage: urlToSave
            })
            .then(()=>{
              axios.get('/api/v1/resources/homepage')
            .then(res => {
              this.homePageData = res.data
            })
            .catch(console.error)
            })
          .catch(console.error)})
        .catch(console.error)
        })
        .catch(console.error)
      },
      submitPartnerFile: function(event){
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', this.partnerFile[0]);
        formData.append('upload_preset', this.cloudinary.uploadPreset);
        formData.append('tags', 'gs-vue,gs-vue-uploaded');
        axios.post(this.clUrl, formData).then(res => {
          let url = res.data.secure_url
          let urlToSave = ''
          for (var i = 0; i < url.length; i++) {
            if (url[i] === '/') {
              var upload = url.slice(i, i+8);
              if (upload === '/upload/') {
                var front = url.slice(0, i+8)
                var back = url.slice(i+8)
                urlToSave = `${front}q_auto/${back}`
              }
            }
          }
          localforage.getItem('X_TOKEN')
          .then(session => {
            this.partnerImageData = ''
            axios.post('/api/v1/admin/partner/add', {
              headers: { 'x-token': session },
                partner: urlToSave
            })
            .then(()=>{
              axios.get('/api/v1/resources/homepage')
            .then(res => {
              this.homePageData = res.data
            })
            .catch(console.error)
            })
          .catch(console.error)})
        .catch(console.error)
        })
      },
      submitHeroImageUrl: function(event){
        event.preventDefault()
        localforage.getItem('X_TOKEN')
        .then(session => {
          axios.put('/api/v1/resources/update/heroimage', {
            headers: { 'x-token': session },
              heroImage: event.target.url.value
          })
          .then(()=>{
            axios.get('/api/v1/resources/homepage')
            .then(res => {
              this.homePageData = res.data
            })
            .catch(console.error)
          })
          .catch(console.error)})
        .catch(console.error)
      },
      removePartner: function(event){
        event.preventDefault()
        localforage.getItem('X_TOKEN')
        .then(session => {
        axios.post('/api/v1/admin/partner/delete', {
          headers: { 'x-token': session },
          index: event.target.value})
          .then(()=>{
          axios.get('/api/v1/resources/homepage')
            .then(res => {
              this.homePageData = res.data
            })
            .catch(console.error)
        }).catch(console.error)
      })
    },
    },
    computed: {
      clUrl: function(){
          return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
      }
    }}
</script>

<style scoped>
  .row {
    margin-bottom: 10px;
  }
  .img-container1 {
    /* padding-bottom: 35.67%;
    height:0;
    overflow: hidden; */
    /* display:flex;
    justify-content: center;
    align-items: center */
  }
  .fit-image1 {
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 60%;
    height:auto;
  }
  .img-container2 {
    display:flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .submit-button {
    background-color: #5FAAF6;
    border-color: #5FAAF6;
  }
  .fit-image {
    width: 100%;
  }
  .partners {
    padding: 15px;
  }
  @media (max-width: 600px) {
    .partners {
      padding: 7px
    }
  }
  input {
    margin: auto;
  }
  .pad {
    margin: 5px;
  }
  .file-pad {
    margin: 5px 5px 5px 75px;
  }
  .flexer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-control {
    width:60%;
  }
  .flex-list {
  font: 200 16px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
  }
</style>
