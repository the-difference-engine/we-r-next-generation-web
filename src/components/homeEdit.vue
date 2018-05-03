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
    <button class="btn btn-primary submit-button">add a new hero image to replace existing</button>
  </div>
  <div class='row'>
    The width to height ratio of Partner logos should be 2.8 : 1
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
  export default {
    name: 'homeEdit',
    data () {
      return {
        homePageData: {
          sStories: [{text:''}]
        }
      }
    },
    created() {
      axios.get('/api/v1/resources/homepage')
      .then(res => {
        this.homePageData = res.data
      })
      .catch(console.log)
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
</style>
