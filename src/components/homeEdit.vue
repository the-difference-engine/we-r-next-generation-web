<template>
<div class='container-fluid'>
  <div class='row'>
    The width to height ratio of the Hero image should be 2.8 : 1
  </div>
  <div class='row'>
    <div class="img-container1">
      <span>current hero image</span>
      <img :src="homePageData.heroImage" alt="top-image" class="fit-image1">
    </div>
  </div>
  <div class='row'>
    <span>There are two methods of uploading a new hero image. One is to upload an image then hit the submit button. The other is to input an image url (this can be used to easily reverse changes if you saved the previous image address)</span>
  </div>
  <div class='row'>
    <form v-on:submit="submitHeroImageFile">
      <input name="companyLogo" type="file" v-on:change="previewImage" accept="image/*">
      <button type="submit" class="btn btn-primary submit-button">add a new hero image to replace existing</button>
    </form>
  </div>
  <div class='row'>
    <span>preview section:</span>
    <img :src="imageData"/>
  </div>
  <div class='row'>
    <form v-on:submit="submitHeroImageUrl">
    <input required name="url" type='text'/>
    <button type="submit" class="btn btn-primary submit-button">Submit hero image url</button>
    </form>
  </div>
  <div class='row'>
    The width to height ratio of Partner logos should be 1.33 : 1
  </div>
  <div class='row'>
    Current partner logos
    <div class="img-container2">
      <div v-for="(partner, index) in homePageData.partners" :key="index" v-bind:style="{width: Math.floor(100/homePageData.partners.length) + '%'}" class="partners">
        <img :src="partner" :alt="'partner image 1' + index" class="fit-image"/>

      </div>
    </div>
  </div>
  <div class='row'>
    button for adding partner logo
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
        imageData: '',
        heroImageManualUrl: '',
      }
    },
    created() {
      axios.get('/api/v1/resources/homepage')
      .then(res => {
        this.homePageData = res.data
      })
      .catch(console.log)
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
      submitHeroImageFile: function(evt){
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', this.file[0]);
        formData.append('upload_preset', this.cloudinary.uploadPreset);
        formData.append('tags', 'gs-vue,gs-vue-uploaded');
        // For debug purpose only
        // Inspects the content of formData
        for(var pair of formData.entries()) {
            console.log(pair[0]+', '+pair[1]);
        }
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
            console.log('URL TO BE SENT', urlToSave)
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
            .catch(console.log)
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
            .catch(console.log)
          })
          .catch(console.error)})
        .catch(console.error)
      }
    },
    computed: {
      clUrl: function(){
          return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
      }
    }
  }
</script>

<style scoped>
  .row {
    margin-bottom: 10px;
  }
  .img-container1 {
    /* padding-bottom: 35.67%;
    height:0;
    overflow: hidden; */
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center
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
</style>
