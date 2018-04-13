
<template>
  <div class="container-fluid">
    <h1>Camp Application</h1>
    <hr>
    <form v-on:submit.prevent="submit">
      <div class="form-row">
        <div class="form-group col-sm-6">
          <label for="inputFullName">Full Name</label>
          {{profileData.full_name}}
        </div>
        <div class="form-group col-sm-6">
            <label for="inputEmail">Email</label>
            {{profileData.email}}
        </div>
      </div>
      <div class="form-group col-sm-6">
        <label for="inputAddress1">Child's Address line 1</label>
        <input type="text" name="address1" class="form-control" id="inputAddress1" placeholder="1234 Main St">
      </div>
      <div class="form-group col-sm-6">
        <label for="inputAddress2">Child's Address line 2</label>
        <input type="text" name="address2" class="form-control" id="inputAddress1" placeholder="1234 Main St">
      </div>
      <div class="form-group col-sm-6">
      <label for="city">City</label>
      <input name="city" type="text" class="form-control" id="city" placeholder="City">
      </div>
      <div class="form-group col-sm-6">
        <label for="stateProvince">State/Province</label>
        <input name="stateProvince" type="text" class="form-control" id="stateProvince" placeholder="State/Province">
      </div>
      <div class="form-group col-sm-6">
        <label for="zipCode">Zip Code</label>
        <input name="zipCode" type="text" class="form-control" id="zipCode" placeholder="Zip Code">
      </div>
      <div class="form-group col-sm-6">
        <label for="country">Country</label>
        <input name="country" type="text" class="form-control" id="country" placeholder="Country">
      </div>
      <div class="form-group col-sm-6">
        <label for="inputPhone">Phone Number</label>
        <input type="text" class="form-control" id="inputPhone" placeholder="Phone Number" name="phoneNumber">
      </div>
      <hr>
      <div class="form-group col-sm-6">
        <label for="inputChildName">Child's Name</label>
        <input type="text" class="form-control" id="inputChildName" placeholder="Child's Name" v-model="child_name">
      </div>
      <div class="form-group col-sm-6">
        <label for="inputChildAge">Child's Age</label>
        <input type="number" class="form-control" id="inputChildAge" placeholder="Child's Age" name="age">
      </div>
      <div class="form-group col-sm-6">
        <label for="inputChildGender">Child's Gender</label>
        <input type="text" class="form-control" id="inputChildGender" placeholder="Child's Gender" name="gender">
      </div>
      <div class="form-group">
        <label for="textarea">How do you think they could benefit from Creativity Camp?</label>
        <textarea class="form-control" id="textarea" rows="3" placeholder="" name="bio"></textarea>
        {{charactersLeft}}
      </div>
      <div class="form-group">
        <label for="selector">Which camp would you like your child to attend? (Select one):</label>
        <select v-model="chosencamp" class="form-control" id="selector">
            <option value="" disabled hidden>Select Camp</option>
            <option v-for="(camp, index) in orderedCamps(camps)" v-bind:key="index" name="camp" :value="camp._id.$oid">{{ camp.name }}</option>
        </select>
      </div>
      <div ref="waiver_el" class="waiver mx-auto">
        <div class="mx-auto">
          <h3 ref="waiver_title">{{waiver.title}}</h3>
          <p class="col-md-12 text-left my-3">
            <span ref="waiver_header_0">{{waiver.header[0]}}</span>
            <span class="mx-2 font-size-2"><u ref="waiver_date_string">{{get_date_as_string}}</u></span>
            <span ref="waiver_header_1">{{waiver.header[1]}}</span>
            <span class="ml-2 font-size-2"><u ref="waiver_child_name">{{child_name}}</u></span>
            <span ref="waiver_header_2">{{waiver.header[2]}}</span>
            <span class="ml-2 font-size-2"><u ref="waiver_full_name">{{profileData.full_name}}</u></span>
            <span ref="waiver_header_3">{{waiver.header[3]}}</span>
          </p>
          <table class="col-md-12 text-left my-3">
            <tbody>
            <tr v-for='index in waiver.items.length'>
              <td class="col-sm-1 pr-0 text-center">
                            <span ref="waiver_initials">
                                <input :readonly="disable_edits" type="text" class="col-sm-12 form-control text-center" v-model="waiver.initials[index-1]">
                            </span>
                <small class="col-sm-12">Initial</small>
              </td>
              <td class="col-sm-1 text-right">
                            <span ref="waiver_item_numbers">
                                {{waiver.items[index-1].order}}
                            </span>.
              </td>
              <td class="col-sm-10 text-left">
                            <span class="mr-2">
                                <strong><u>
                                    <span ref="waiver_item_titles">
                                        {{waiver.items[index-1].title}}:
                                    </span>
                                </u></strong>
                            </span>
                <span ref="waiver_item_texts">
                                {{waiver.items[index-1].text}}
                            </span>
              </td>
            </tr>
            </tbody>
          </table>
          <p class="col-md-12 text-left my-3">
                <span ref="waiver_footer">
                    {{waiver.footer}}
                </span>
          </p>
          <div class="col-md-12 row my-5">
            <div class="col-md-8">
              <label class="col-sm-12" for="inputSignature">Please type your full name*:</label>
              <u><strong><span ref="waiver_signature">
                        <input :readonly="disable_edits" type="text" class="form-control text-center" v-model="waiver.signature">
                    </span></strong></u>
              <small class="col-sm-12">* If you are under 18, your parent/guardian must sign for you.</small>
            </div>
            <div class="col-md-4">
              <label for="inputDate" class="col-sm-12">Today's Date (mm/dd/yyyy):</label>
              <u><strong><span ref="waiver_signed_date">
                        <input :readonly="disable_edits" type="date" class="form-control text-center" v-model="waiver.signed_date">
                    </span></strong></u>
            </div>
          </div>
          <div ref="waiver_form_submit">
            <div v-if="errors.length" class="col-md-12 my-4 text-left">
              <h4 class="font-weight-bold text-danger"><u>Please correct the following error(s) before proceeding:</u></h4>
              <ul>
                <li v-for="error in errors" class="font-weight-bold text-dark">{{error}}</li>
              </ul>
            </div>
            <button :class="{ 'hide-me': disable_edits }" type="submit" class="btn btn-primary my-5">Save & Submit</button>
          </div>
        </div>
      </div>
    </form>

    {{init_waiver}}
    {{init_today_date}}

  </div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from 'axios'
  export default {
    name: 'camper',
    data () {
      return {
        profileData: {},
        bio: '',
        camps: [],
        chosencamp: '',

        errors: [],
        disable_edits: false,

        child_name: '',

        waiver: {
          title: '',
          header: [],
          items: [],
          footer: '',

          initials: [],
          signature: '',
          signed_date: '',
        },
      }
    },
    methods: {
      lock_waiver_inputs: function() {
        return new Promise((resolve, reject) => {
          // locks all inputs in the waiver form -- replaces input fields
          // with the text of the input values -- removes errors and submit button
          this.$refs.waiver_title.innerHTML = this.waiver.title;
          this.$refs.waiver_date_string.innerHTML = this.get_date_as_string;
          this.$refs.waiver_child_name.innerHTML = this.child_name;
          this.$refs.waiver_full_name.innerHTML = this.profileData.full_name;

          this.$refs.waiver_header_0.innerHTML = this.waiver.header[0];
          this.$refs.waiver_header_1.innerHTML = this.waiver.header[1];
          this.$refs.waiver_header_2.innerHTML = this.waiver.header[2];
          this.$refs.waiver_header_3.innerHTML = this.waiver.header[3];

          for (let idx=0; idx<this.waiver.items.length; idx++) {
            this.$refs.waiver_initials[idx].innerHTML = this.waiver.initials[idx];
            this.$refs.waiver_item_numbers[idx].innerHTML = this.waiver.items[idx].order;
            this.$refs.waiver_item_titles[idx].innerHTML = this.waiver.items[idx].title;
            this.$refs.waiver_item_texts[idx].innerHTML = this.waiver.items[idx].text;
          }

          this.$refs.waiver_footer.innerHTML = this.waiver.footer;
          this.$refs.waiver_signature.innerHTML = this.waiver.signature;
          this.$refs.waiver_signed_date.innerHTML = this.waiver.signed_date;
          this.$refs.waiver_form_submit.innerHTML = "";
          resolve(true);
        });
      },

      confirm_waiver_signed: function() {
        // validates waiver fields are filled out
        // appends error messages and returns false if any validations fail
        // returns true if validation succeeds
        let no_errors = true;
        if (this.child_name == '' || this.child_name == null) {
          this.errors.push("Please add your child's name");
          no_errors = false;
        }
        for (let idx=0; idx<this.waiver.items.length; idx++) {
          let item_position = idx + 1;
          if (this.waiver.initials[idx] == '' || this.waiver.initials[idx] == null) {
            this.errors.push("Please initial your agreement with item #" + item_position);
            no_errors = false;
          }
          else if (this.waiver.initials[idx].length > 3) {
            this.errors.push("Initials should be no longer than three characters. (Reference Item #" + item_position + ")");
            no_errors = false;
          }
        }
        if (this.waiver.signature == '' || this.waiver.signature == null) {
          this.errors.push("Please sign your name to the waiver to indicate your understanding and agreement");
          no_errors = false;
        }
        else if (this.waiver.signature.length > 50) {
          this.errors.push("Your signature is too long");
          no_errors = false;
        }
        if (this.waiver.signature.length < this.profileData.full_name.length) {
          this.errors.push("Your signature must include your full name");
          no_errors = false;
        }
        if (this.waiver.signed_date == '' || this.waiver.signed_date == null) {
          this.errors.push("Please add a date to record the date you signed the waiver");
          no_errors = false;
        }
        return no_errors;
      },

      submit: function(evt){
        this.errors = [];       // clear all previous errors before validating the form again

        // validate the waiver was signed before submitting
        if (this.confirm_waiver_signed()) {
          this.disable_edits = true;              // make inputs read-only
          this.lock_waiver_inputs()               // convert the waiver form to static HTML
            .then(resolved => {
              let waiver_form = this.$refs.waiver_el.innerHTML;   // waiver static HTML
              localforage.getItem('X_TOKEN')
                .then(session => {
                  // post the application and waiver; returns the application id string
                  axios.post('/api/v1/applications/waiver', {
                    headers: {'x-token': session},
                    params: {
                      application: {
                        full_name: this.profileData.full_name,
                        email: this.profileData.email,
                        address_line_1: evt.target.address1.value,
                        address_line_2: evt.target.address2.value,
                        city: evt.target.city.value,
                        state_province: evt.target.stateProvince.value,
                        zip_code: evt.target.zipCode.value,
                        country: evt.target.country.value,
                        phone_number: evt.target.phoneNumber.value,
                        childName: this.child_name,
                        age: evt.target.age.value,
                        gender: evt.target.gender.value,
                        bio: evt.target.bio.value,
                        camp: this.chosencamp,
                        date_signed: this.waiver.signed_date,
                        type: 'camper',
                        status: 'pending'
                      },
                      waiver: {
                        applicant: this.profileData._id.$oid,
                        waiver_form: waiver_form,
                        signed_by: this.waiver.signature,
                        signed_date: this.waiver.signed_date
                      }
                    }
                  })
                    .then(res => {
                      // redirect to application submitted page -- API returns application ID
                      this.$router.push('/applications/' + res.data + '/submitted');
                    })
                    .catch(console.error);
                })
                .catch(console.error);
            })
        }
      },
      getWaiver: function() {
        // get waiver text from database storage
        this.$store.dispatch('getWaiverResources', {
          resource: "waiver_camper"
        })
        .then(data => {
          this.waiver.title = data['title'];
          this.waiver.header = data['headers'];
          this.waiver.items = data['items'];
          this.waiver.footer = data['footer'];
        })
      },
      orderedCamps(list) {
          return _.orderBy(list, 'created_at', 'desc');
      }
    },
    computed: {
        charactersLeft(){
            let words = this.bio.split(' ').filter((entry)=>{ return entry.trim() != ''; })
            let count = words.length
            let cap = 300
            return (cap-count) + ' / ' + cap + ' words remaining'
        },
        init_waiver() {
          // launches the get waiver function on page load
          this.getWaiver();
        },
        init_today_date() {
          // initializes today's date for the waiver form
          let today = new Date();
          let day = today.getDate();
          if (day < 10) { day = '0' + day }
          let month_num = today.getMonth() + 1;
          if (month_num < 10) { month_num = '0' + month_num }
          let year = today.getFullYear();

          this.waiver.signed_date = year + '-' + month_num + '-' + day;
        },
        get_date_as_string() {
          // initializes today's date as readable string
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          let dt = new Date(this.waiver.signed_date);
          let day = dt.getDate() + 1;
          let month = monthNames[dt.getMonth()];
          let year = dt.getFullYear();

          return month + ' ' + day + ', ' + year;
        },
    },
    created() {
      localforage.getItem('X_TOKEN')
      .then(session => {
        axios.get('/api/v1/camp/session/get', {
                    'headers': { 'x-token': session }
                })
                .then(response => {
                    this.camps = response.data
                })
                .catch(console.error)
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
  table > tbody > tr > td {
    vertical-align: top !important;
    padding-top: 1em !important;
    padding-bottom: 1em !important;
  }
  .waiver{
    margin-top: 30px !important;
    margin-bottom: 30px !important;
    max-width: 950px;
    padding: 20px;
    border: 2px solid gray;
  }
  .hide-me {
    display: none;
  }
  input {
    text-align: center;
  }
  textarea {
    text-align: center;
  }
  select {
    text-align: center;
  }
</style>
