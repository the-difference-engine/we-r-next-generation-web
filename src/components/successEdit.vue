<template>
<div class="container">
  <div class="row mx-0">
    <h1>
      Edit Success Stories
    </h1>
  </div>
  <hr>
  <h3 class="scroller-catch">Edit Current Success Stories</h3>
  <h4 class="text-success" v-if="messages">Your Success Story was successfully deleted!</h4>
  <div class="row">
    <div class="col-md-14 text-right">
      <router-link :to="'successAddNew'" class="btn btn-success">Add New Success Story</router-link>
    </div>
  </div>
  <div class="row">
    <div class="row mx-0 my-3" v-for="(successStory, index) in successStories" :key="index">
      <form>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">About Camper</label>
          <div class="col-md-10">
            <input readonly type="text" class="form-control" v-model="successStory.about" v-bind:placeholder="successStory.about">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">What They Learned</label>
          <div class="col-md-10">
            <div readonly class="form-control" style="height: auto; max-height: 70px; overflow: auto; line-height: inherit;" v-html="successStory.learned" v-bind:placeholder="successStory.learned"></div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12 text-right">
            <button type="submit" class="btn btn-danger" v-on:click.self="successDelete(successStory); scrollToPreview()">Delete Success Story</button>
            <router-link :to="{ name: 'successEditSingle', params: { id: successStory._id.$oid } }">
              <button type="submit" class="btn btn-primary">Edit</button>
            </router-link>
          </div>
        </div>
        <hr>
      </form>
    </div>
  </div>
</div>
</template>



<script>
import axios from 'axios';
import 'vue-scrollto';
import localforage from '../sessionUtils';
export default {
  name: 'successStory',
  data() {
    return {
      successStories: {},
      messages: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    };
  },
  methods: {
    successDelete: function(value) {
      localforage.getItem('X_TOKEN').then(session => {
        axios
          .delete(`/api/v1/successEdit/${value._id.$oid}`, {
            headers: { 'x-token': session },
            params: value
          })
          .then(res => {
            this.messages = true;
            setTimeout(() => {
              this.messages = false;
              this.scrollToPreview();
              this.$router.go(this.$router.currentRoute);
            }, 5000);
          })
          .catch(console.error);
      });
    },
    scrollToPreview() {
      let element = '.scroller-catch';
      let duration = 1000;
      var VueScrollTo = require('vue-scrollto');
      VueScrollTo.scrollTo(element, duration);
    }
  },
  created() {
    axios
      .get('/api/v1/successStories')
      .then(response => {
        this.successStories = response.data;
      })
      .catch(e => {
        this.errors = e;
      });
  }
};
</script>
