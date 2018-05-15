<template>
<div class="container">
  <div class="row mx-0">
    <h1 class="big">
      Edit FAQs
    </h1>
  </div>
  <hr>
  <h3 class="scroller-catch">Edit Current FAQS</h3>
  <h4 class="text-success" v-if="messages">Your FAQ was successfully deleted!</h4>
  <div class="row">
    <div class="col-md-14 text-right">
      <router-link :to="'faqAddNew'" class="btn btn-success">Add New FAQ</router-link>
    </div>
  </div>
  <div class="row">
    <div class="row mx-0 my-3" v-for="(faq, index) in faqs" :key="index">
      <form>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Question</label>
          <div class="col-md-10">
            <input readonly type="text" class="form-control" v-model="faq.question" v-bind:placeholder="faq.question">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-2 col-form-label text-right">Answer</label>
          <div class="col-md-10">
            <div readonly class="form-control" style="height: auto; max-height: 70px; overflow: auto; line-height: inherit;" v-html="faq.answer" v-bind:placeholder="faq.answer"></div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12 text-right">
            <button type="submit" class="btn btn-danger" v-on:click.self="faqDelete(faq); scrollToPreview()">Delete Question</button>
            <router-link :to="{ name: 'faqEditSingle', params: { id: faq._id.$oid } }">
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
  name: 'faq',
  methods: {
    faqUpdate: function(evt) {
      this.$store.dispatch('faqUpdate', {
        updated_faq: this.faq,
        faqs_id: this.faq_id,
        router: this.$router
      });
      this.editFAQ();
    },
    faqGet: function() {
      this.$store
        .dispatch('faqGet', {
          faq_id: this.$route.params.id
        })
        .then(data => {
          this.faq = data;
          this.faq_id = this.faq._id.$oid;
        });
    },
    faqDelete: function(value) {
      localforage.getItem('X_TOKEN').then(session => {
        axios
          .delete(`/api/v1/faqEdit/${value._id.$oid}`, {
            headers: { 'x-token': session },
            params: value
          })
          .then(res => {
            this.messages = true;
            setTimeout(() => {
              this.messages = false;
              this.$router.go(this.$router.currentRoute);
            }, 5000);
          })
          .catch(console.error);
      });
    },
    scrollToPreview() {
      let element = '.scroller-catch';
      let duration = 2000;
      var VueScrollTo = require('vue-scrollto');
      VueScrollTo.scrollTo(element, duration);
    }
  },
  data() {
    return {
      category_set: new Set(),
      curr_category: 'all',
      faqs: {},
      messages: false
    };
  },
  computed: {
    get_faq: function() {
      return this.faqGet();
    }
  },
  created() {
    axios
      .get('/api/v1/faq')
      .then(response => {
        this.faqs = response.data;
        for (let faq of response.data) {
          this.category_set.add(faq.category);
        }
        this.categories = Array.from(this.category_set);
      })
      .catch(e => {
        this.errors = e;
      });
  }
};
</script>
