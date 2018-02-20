<template>
  <div class="faq">
    <img src="static/assets/faq_page_image.jpg" alt="Group photo of active campers and volunteer" width="80%">
    <h1>Frequently Asked Questions</h1>
    <p>Please select which category your question is regarding</p>
    <div class="row">
      <div id="category_buttons" class="col-sm-12 col-lg-6 col-lg-offset-3">
        <button type="button" class="btn btn-default" v-for="category in categories" v-on:click="curr_category = category">{{ category }}</button>
      </div>
    </div>
    <div class="question row" v-for="faq in faqs" v-if="curr_category==faq.category || curr_category=='all'">
      <div class="col-sm-12 col-lg-6 col-lg-offset-3">
        <p class="question_text">{{ faq.question }}</p>
        <p>{{{ faq.answer }}}</p>
      </div>
    </div>
    <div class="row" v-if="!questionSubmitted">
      <div id="submit_question" class="col-sm-12 col-lg-6 col-lg-offset-3">
        <h1>Have a Question?</h1>
        <p>Hey, If there are any questions we did not answer, please feel free to contact us or leave us a feedback below.  Thanks for your support.</p>
        <form class="form-horizontal" v-on:submit.prevent="submitQuestion">
          <label for="name" class="col-sm-2 control-label">Name:</label>
          <div class="col-sm-10">
            <input v-model="newQuestion.name" class="form-control">
          </div><br><br>
          <label for="email" class="col-sm-2 control-label">E-mail:</label>
          <div class="col-sm-10">
            <input v-model="newQuestion.email" class="form-control">
          </div><br><br>
          <label for="message" class="col-sm-2 control-label">Message:</label>
          <div class="col-sm-10">
            <textarea v-model="newQuestion.message" class="form-control" rows="3"></textarea>
          </div><br><br>
          <div class="col-sm-offset-2 col-sm-10">
            <input id="submit" type="submit" value="Submit">
          </div>
        </form>
      </div>
    </div>
    <div class="row" v-if="questionSubmitted">
      <div class="col-sm-12 col-lg-6 col-lg-offset-3">
        <h1>Thank you for submitting your question.</h1>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: 'faq',
    data () {
      return {
        category_set: new Set(),
        curr_category: "all",
        faqs: [],
        newQuestion: {
          name: "",
          email: "",
          message: "",
        },
        questionSubmitted: false
      }
    },
    methods: {
      submitQuestion: function(evt) {
        axios.post('/api/v1/faq', this.newQuestion).then(response => {
          this.questionSubmitted = true
        }).catch( e=> {
          this.errors = e
        })
      }
    },
    created() {
      axios.get('/api/v1/faq').then(response => {
        this.faqs = response.data
        for (let faq of response.data) {
          this.category_set.add(faq.category)
        }
        this.categories = Array.from(this.category_set)
      }).catch(e => {
        this.errors = e
      })
    },
  }
</script>

<style scoped>
  #category_buttons{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }

  .question{
    text-align: left;
    margin: 10px;
  }

  .question_text{
    font-weight: bold;
  }

  input, textarea, label{
    margin: 10px auto;
  }

  #submit{
    background-color:#EA8432;
    width: 50%;
    padding: 10px;
  }
</style>
