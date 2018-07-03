<template>
    <div class="container mx-auto my-4">
        <h2>{{type_cap}} Waiver Changes Saved Successfully</h2>
        <div class="row mx-0 px-0">
          <button v-on:click.stop.prevent="editLink" class="btn btn-warning mx-4 my-5">Edit Again</button>
          <button v-on:click.stop.prevent="returnLink" class="btn btn-primary my-5">Return to Applications</button>
        </div>
        <waiver-read-only :waiver="waiver" :type="type"></waiver-read-only>
    </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from "axios";
  import waiverReadOnly from './adminWaiverReadOnly.vue';
  import 'vue-scrollto';
  export default {
    name: "adminWaiverReview",
    components: {
      waiverReadOnly
    },
    data() {
      return {
        waiver: {
          title: '',
          header: [],
          items: [],
          footer: '',

          initials: [],
          signature: '[MY FULL NAME]',
          signed_date: '',
        },

        type: '',
        type_cap: '',
      };
    },
    methods: {
      getWaiver: function(type) {
        // get waiver text from database storage
        let resource_type = "waiver_" + type;
        this.$store.dispatch('getWaiverResources', {
          resource: resource_type
        })
        .then(data => {
          this.waiver.title = data['title'];
          this.waiver.header = data['headers'];
          this.waiver.items = data['items'];
          this.waiver.footer = data['footer'];

          // init invalid list for each header
          this.waiver.header.forEach(h => {
            this.invalid.header.push(false);
          });

          // init invalid list for each item
          this.waiver.items.forEach(i => {
            this.invalid.items.push(this.invalid_item);
          });
          setTimeout(x => {this.matchHeight()}, 2000);
        })
      },

      editLink: function() {
        this.$router.push('/admin/waiver/' + this.type + '/edit');
      },

      returnLink: function() {
        this.$router.push('/admin/applications');
      },
    },

    created() {
      this.type = this.$route.params.type.toLowerCase();    // waiver type from the url params
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();
    },
    beforeMount() {
      this.getWaiver(this.$route.params.type);
    },
    beforeRouteUpdate(to, from, next) {
      this.type = to.params.type.toLowerCase();       // if waiver type changes in URL, update the data and waiver
      this.type_cap = this.type[0].toUpperCase() + this.type.slice(1).toLowerCase();
      this.getWaiver(to.params.type);
      next();
    },
  }
</script>

<style>
  table > tbody > tr > td {
    /*vertical-align: top !important;*/
    padding-top: 1em !important;
    padding-bottom: 1em !important;
  }
</style>

<style scoped>
  .container {
    margin-bottom: 30px !important;
  }
  .waiver {
    padding: 25px;
    border: 2px solid gray;
  }

  .sticky {
    margin-top: 150px;
    position: sticky;
  }
  .btn-preview {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  h4 {
    font-weight: bold;
  }
</style>
