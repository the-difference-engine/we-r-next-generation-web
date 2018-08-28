<template>
<div class="container-fluid">
  <h1>Partner Application</h1>
  <hr>
  <form v-on:submit.prevent="submit">
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="companyName">Company Name</label>
        <input name="companyName" type="text" class="form-control" id="companyName" placeholder="Fictional Holdings LLC" required>
      </div>
      <div class="form-group col-sm-6">
        <label for="companyUrl">Company URL</label>
        <input name="companyUrl" type="text" class="form-control" id="companyUrl" placeholder="www.yoursite.com">
    	</div>
    </div>
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="form-group col-sm-6">
        <label for="inputImage">Upload Logo/Partner Picture (for Home Page)</label>
        <input required type="file" class="form-control" id="inputImage" rows="3" name="image" accept="image/*" v-on:change="storeFile">
      </div>
    </div>
    <div class="form-group">
      <label for="inputBio">Optional Note</label>
      <textarea v-model="bio" class="form-control" id="inputBio" rows="3" placeholder="If you want to add any information" name="bio"></textarea>
    </div>
    <div class="lds-default row" v-if="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div class="row">
      <button id="submit" type="submit" class="btn btn-primary">Submit</button>
    </div>
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
        file: [],
        loading: false,
        profileData: {},
        bio: '',
        cloudinary: {
          uploadPreset: 'loazbic8',
          apiKey: '234871425639756',
          cloudName: 'wernextgeneration'
        },
        success: false
      }
    },
    methods: {
      storeFile: function(event) {
        this.file = event.target.files
      },
      submit: function(evt){
        this.loading = true;
        const formData = new FormData()
        formData.append('file', this.file[0]);
        formData.append('upload_preset', this.cloudinary.uploadPreset);
        formData.append('tags', 'gs-vue,gs-vue-uploaded');
        axios.post(
          this.clUrl,
          formData
        ).then(res => {
          let url = res.data.secure_url
          let urlToSave = ''
          let today = new Date();
          let dd = today.getDate();
          let mm = today.getMonth()+1; //January is 0!
          let yyyy = today.getFullYear();
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
              axios.post('/api/v1/applications', {
                headers: {
                  'x-token': session
                },
                params: {
                  companyName: evt.target.companyName.value,
                  companyLogo: urlToSave,
                  companyUrl: evt.target.companyUrl.value,
                  type: 'partner',
                  status: 'submitted',
                  bio: evt.target.bio.value,
                  profileId: this.profileData._id.$oid,
                  full_name: this.profileData.full_name,
                  email: this.profileData.email,
                  address_line_1: this.profileData.address_line_1,
                  address_line_2: this.profileData.address_line_2,
                  city: this.profileData.city,
                  state_province: this.profileData.state_province,
                  zip_code: this.profileData.zip_code,
                  country: this.profileData.country,
                  phone_number: this.profileData.phone_number,
                  date_signed: yyyy + '-' + mm + '-' + dd
                }
              }).then(()=> {
                this.loading = false;
                this.$router.push('/profile');
              }).catch(console.error)
            }).catch(console.error)
        }).catch(console.error)
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
    margin-bottom: 10px;
  }
  .lds-default {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-default div {
    position: absolute;
    width: 5px;
    height: 5px;
    background: #333;
    border-radius: 50%;
    animation: lds-default 1.2s linear infinite;
  }
  .lds-default div:nth-child(1) {
    animation-delay: 0s;
    top: 29px;
    left: 53px;
  }
  .lds-default div:nth-child(2) {
    animation-delay: -0.1s;
    top: 18px;
    left: 50px;
  }
  .lds-default div:nth-child(3) {
    animation-delay: -0.2s;
    top: 9px;
    left: 41px;
  }
  .lds-default div:nth-child(4) {
    animation-delay: -0.3s;
    top: 6px;
    left: 29px;
  }
  .lds-default div:nth-child(5) {
    animation-delay: -0.4s;
    top: 9px;
    left: 18px;
  }
  .lds-default div:nth-child(6) {
    animation-delay: -0.5s;
    top: 18px;
    left: 9px;
  }
  .lds-default div:nth-child(7) {
    animation-delay: -0.6s;
    top: 29px;
    left: 6px;
  }
  .lds-default div:nth-child(8) {
    animation-delay: -0.7s;
    top: 41px;
    left: 9px;
  }
  .lds-default div:nth-child(9) {
    animation-delay: -0.8s;
    top: 50px;
    left: 18px;
  }
  .lds-default div:nth-child(10) {
    animation-delay: -0.9s;
    top: 53px;
    left: 29px;
  }
  .lds-default div:nth-child(11) {
    animation-delay: -1s;
    top: 50px;
    left: 41px;
  }
  .lds-default div:nth-child(12) {
    animation-delay: -1.1s;
    top: 41px;
    left: 50px;
  }
  @keyframes lds-default {
    0%, 20%, 80%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
</style>
