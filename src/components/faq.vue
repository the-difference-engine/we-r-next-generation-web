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
    <div class="row">
      <div id="submit_question" class="col-sm-12 col-lg-6 col-lg-offset-3">
        <h1>Have a Question?</h1>
        <p>Hey, If there are any questions we did not answer, please feel free to contact us or leave us a feedback below.  Thanks for your support.</p>
        <form class="form-horizontal" action="mailto:sample@email.go" method="post" enctype="text/plain">
          <label for="name" class="col-sm-2 control-label">Name:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="name">
          </div><br><br>
          <label for="email" class="col-sm-2 control-label">E-mail:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="mail">
          </div><br><br>
          <label for="message" class="col-sm-2 control-label">Message:</label>
          <div class="col-sm-10">
            <textarea class="form-control" name="message" rows="3"></textarea>
          </div><br><br>
          <div class="col-sm-offset-2 col-sm-10">
            <input id="submit" type="submit" value="Submit">
          </div>
        </form>
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

  input, textarea, label{
    margin: 10px auto;
  }

  #submit{
    background-color:#EA8432;
    width: 50%;
    padding: 10px;
  }
</style>
