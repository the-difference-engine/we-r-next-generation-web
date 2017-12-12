<template>
  <div class="faq">
    <h1>Frequently Asked Questions</h1>
    <p>Please select which category your question is regarding</p>
    <div class="row">
      <div id="category_buttons" class="col-sm-12 col-lg-6 col-lg-offset-3">
        <button v-for="category in categories" v-on:click="curr_category = category">{{ category }}</button>
      </div>
    </div>
    <div class="question row" v-for="faq in faqs" v-if="curr_category==faq.category || curr_category=='all'">
      <div class="col-sm-12 col-lg-6 col-lg-offset-3">
        <p>{{ faq.question }}</p>
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'faq',
    data () {
      return {
        categories: ["About Camp", "Parents", "Partners", "Volunteers", "Donations", "Media"],
        curr_category: "all",
        faqs: [
          {question:"Sample Question About Camp", answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut\n" +
          "labore et dolore magna aliqua.", category: "About Camp"},
          {question:"Sample Question Parents", answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut\n" +
          "labore et dolore magna aliqua.", category: "Parents"},
          {question:"Sample Question Partners", answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut\n" +
          "labore et dolore magna aliqua.", category: "Partners"},
          {question:"Sample Question Volunteers", answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut\n" +
          "labore et dolore magna aliqua.", category: "Volunteers"},
          {question:"Sample Question Donations", answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut\n" +
          "labore et dolore magna aliqua.", category: "Donations"},
          {question:"Sample Question Media", answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut\n" +
          "labore et dolore magna aliqua.", category: "Media"},
        ]
      }
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
</style>
