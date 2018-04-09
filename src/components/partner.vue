<template>
<div class="container-fluid">
  <h1>Partner Application</h1>
  <hr>
  <form v-on:submit.prevent="submit">
    <div>
      <div class="form-group col-sm-6">
        <label for="companyName">Company Name</label>
        <input name="companyName" type="text" class="form-control" id="companyName" placeholder="Fictional Holdings LC" required>
      </div>
      <div class="form-group col-sm-6">
        <label for="companyLogo">Company Logo URL</label>
        <input name="companyLogo" type="text" class="form-control" id="companyLogo" placeholder="optional">
    </div>
    </div>
    <div class="form-group col-sm-6">
      <label for="companyUrl">Company URL</label>
      <input name="companyUrl" type="text" class="form-control" id="companyUrl" placeholder="www.yoursite.com">
    </div>
    <div class="form-group col-sm-6">
      <label for="inputImage">Upload Photo</label>
      <input type="file" class="form-control" id="inputImage" rows="3" name="image" accept="image/*" v-on:change="upload">
    </div>
    <div class="form-group">
      <label for="inputBio">Optional Note</label>
      <textarea v-model="bio" class="form-control" id="inputBio" rows="3" placeholder="optional" name="bio"></textarea>
    </div>
    <button id="submit" type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from 'axios'
  export default {
    name: 'partner',
    data () {
      return {
          profileData: {},
          bio: '',
          cloudinary: {
              uploadPreset: 'tpg3m6fv',
              cloudName: 'wernextgeneration',
              apiKey: '234871425639756'
          },
          imageUrl: ''
      }
    },
    methods: {
        upload: function(file) {
            const formData = new FormData()
            formData.append('file', file[0]);
            formData.append('upload_preset', this.cloudinary.uploadPreset);
            formData.append('tags', 'gs-vue,gs-vue-uploaded');
            // For debug purpose only
            // Inspects the content of formData
            for(var pair of formData.entries()) {
                console.log(pair[0]+', '+pair[1]);
            }
            axios.post(this.clUrl, formData).then(res => {
                this.imageUrl = res.data
                })
        },
        submit: function(evt){

            localforage.getItem('X_TOKEN')
            .then(session => {
                axios.post('/api/v1/applications', {
                    headers: { 'x-token': session },
                    params: {
                        companyName: evt.target.companyName.value,
                        companyLogo: evt.target.companyLogo.value,
                        companyUrl: evt.target.companyUrl.value,
                        bio: evt.target.bio.value,
                        }
                })
                .catch(console.error)})
            .catch(console.error)

        }
    },
    computed: {
        clUrl: function(){
            return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
        },
        charactersLeft(){
            let words = this.bio.split(' ').filter((entry)=>{ return entry.trim() != ''; })
            let count = words.length
            let cap = 300
            return (cap-count) + ' / ' + cap + ' words remaining'
        }
    },
    created() {
      localforage.getItem('X_TOKEN')
      .then(session => {
        axios.get('/api/v1/profile/' + session, { 'headers': { 'x-token': session } })
        .then(response => {
          this.profileData = response.data
        })
        .catch(console.error)
      })
      .catch(console.error)
    }
  }
</script>

<style scoped>
  .container{
    margin: 30px;
  }
  .waiver{
    margin: 25px;
    padding: 25px;
    border: 2px solid gray;
  }
  input {
      text-align: center;
  }
  textarea {
      text-align: center;
  }
  #inputImage {
      padding-left: 30%;
  }
  @media (max-width: 900px) {
      #inputImage {
          padding-left: 25%;
      }
  }
  @media (max-width: 765px) {
      #inputImage {
          padding-left: 30%;
      }
  }
  @media (max-width: 450px) {
      #inputImage {
          padding-left: 17%;
      }
  }
  #submit {
      margin-bottom: 20px;
  }
</style>
