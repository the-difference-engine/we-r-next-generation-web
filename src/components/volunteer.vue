<!--An empty component to replace the header and/or footer on pages where it is not required-->

<template>
<div class="container">
  <h1>Volunteer Application</h1>
  <hr>
  <form v-on:submit.prevent="submit">
    <div>
      <div class="form-group col-md-6">
        <label for="inputFullName">Full Name</label>
        {{profileData.full_name}}
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail">Email</label>
        {{profileData.email}}
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress1">Address Line 1</label>
      <input name="address1" type="text" class="form-control" id="inputAddress1" placeholder="1234 Main St">
    </div>
    <div class="form-group">
      <label for="inputAddress2">Address Line 2</label>
      <input name="address2" type="text" class="form-control" id="inputAddress1" placeholder="Address Line 2 as needed">
    </div>
    <div class="form-group">
      <label for="city">City</label>
      <input name="city" type="text" class="form-control" id="city" placeholder="City">
    </div>
    <div class="form-group">
      <label for="stateProvince">State/Province</label>
      <input name="stateProvince" type="text" class="form-control" id="stateProvince" placeholder="State/Province">
    </div>
    <div class="form-group">
      <label for="zipCode">Zip Code</label>
      <input name="zipCode" type="text" class="form-control" id="zipCode" placeholder="Zip Code">
    </div>
    <div class="form-group">
      <label for="country">Country</label>
      <input name="country" type="text" class="form-control" id="country" placeholder="Country">
    </div>
    <div class="form-group">
      <label for="inputPhone">Phone Number</label>
      <input name="phoneNumber" type="text" class="form-control" id="inputPhone" placeholder="Phone Number">
    </div>
    <p>Please tell us a little bit about yourself:</p>
    <div class="form-group">
      <label for="inputBio">Bio</label>
      <textarea v-model="bio" class="form-control" id="inputBio" rows="3" placeholder="Bio" name="bio"></textarea>
      {{charactersLeft}}
    </div>
    <p>Which camp would you like to teach at (Select one):</p>
    <div class="form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" name="camp" value="camp1">
        Camp 1
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" name="camp" value="camp2">
        Camp 2
      </label>
    </div>
  <div class="waiver">
      <h3>Volunteer Release and Waiver of Liability Form</h3>
      <br>
      This Release and Waiver of Liability (the “release”) executed on _____ (date) by ________(“Volunteer”) releases We R NextGeneration, Inc. a nonprofit corporation organized and existing under the laws of the State of Maryland and each of its directors, officers, employees, and agents. The Volunteer desires to provide volunteer services for Nonprofit and engage in activities related to serving as a volunteer.
      Volunteer understands that the scope of Volunteer’s relationship with Nonprofit is limited to a volunteer position and that no compensation is expected in return for services provided by Volunteer; that Nonprofit will not provide any benefits traditionally associated with employment to Volunteer; and that Volunteer is responsible for his/her own insurance coverage in the event of personal injury or illness as a result of Volunteer’s services to Nonprofit.<br>
  <br>
  <ol>
      <li>Waiver and Release: I, the Volunteer, release and forever discharge and hold harmless Nonprofit and its successors and assigns from any and all liability, claims, and demands of whatever kind of nature, either in law or in equity, which arise or may hereafter arise from the services I provide to Nonprofit. I understand and acknowledge that this Release discharges Nonprofit from any liability or claim that I may have against Nonprofit with respect to bodily injury, personal injury, illness, death, or property damage that may result from the services I provide to Nonprofit or occurring while I am providing volunteer services.<br>
          <div class="initial">
              <div class="form-group col-md-2">
                  <label for="inputInitial">Your initials:</label>
                  <input type="text" class="form-control" id="inputInitial" placeholder="">
              </div>
          </div>
      </li>
      <br>
    <li>Insurance: Further I understand that Nonprofit does not assume any responsibility for or obligation to provide me with financial or other assistance, including but not limited to medical, health, or disability benefits or insurance. I expressly waive any such claim for compensation or liability on the part of Nonprofit beyond what may be offered freely by Nonprofit in the event of injury or medical expenses incurred by me.<br>
          <div class="initial">
              <div class="form-group col-md-2">
                  <label for="inputInitial">Your initials:</label>
                  <input type="text" class="form-control" id="inputInitial" placeholder="">
              </div>
          </div>
      </li>
    <br>

    <li>Medical Treatment: I hereby Release and forever dischargeNonprofit from any claim whatsoever which arises or may hereafter arise on account of any first-aid treatment or other medical services rendered in connection with an emergency during my tenure as a volunteer with Nonprofit.<br>
          <div class="initial">
              <div class="form-group col-md-2">
                  <label for="inputInitial">Your initials:</label>
                  <input type="text" class="form-control" id="inputInitial" placeholder="">
              </div>
          </div>
      </li>
    <br>
    <li>Assumption of Risk: I understand that the services I provide to Nonprofit may include activities that may be hazardous to me including, but not limited to ______________ involving inherently dangerous activities. As a volunteer, I hereby expressly assume risk of injury or harm from these activities and Release Nonprofit from all liability.<br>
          <div class="initial">
              <div class="form-group col-md-2">
                  <label for="inputInitial">Your initials:</label>
                  <input type="text" class="form-control" id="inputInitial" placeholder="">
              </div>
          </div>
      </li>
      <li>Photographic Release: I grant and convey to Nonprofit all right, title, and interests in any and all photographs, images, video, or audio recordings of me or my likeness or voice made by Nonprofit in connection with my providing volunteer services to Nonprofit.<br>
          <div class="initial">
              <div class="form-group col-md-2">
                  <label for="inputInitial">Your initials:</label>
                  <input type="text" class="form-control" id="inputInitial" placeholder="">
              </div>
          </div>
      </li>
    <br>
    <li>Other: As a volunteer, I expressly agree that this Release is intended to be as broad and inclusive as permitted by the laws of the State of  Maryland and that this Release shall be governed by and interpreted in accordance with the laws of the State of Maryland. I agree that in the event that any clause or provision of this Release is deemed invalid, the enforceability of the remaining provisions of this Release shall not be affected.<br>
          <div class="initial">
              <div class="form-group col-md-2">
                  <label for="inputInitial">Your initials:</label>
                  <input type="text" class="form-control" id="inputInitial" placeholder="">
              </div>
          </div>
      </li>
  </ol>
    By signing below, I express my understanding and intent to enter into this Release and Waiver of Liability willingly and voluntarily.<br>
  <br>
  <div class="form-row">
      <div class="form-group col-md-6">
          <label for="inputSignature">Please type your full name (Or parent/guardian if under 18): </label>
          <input type="text" class="form-control" id="inputSignature" placeholder="">
      </div><br>
      <div class="form-group col-md-3">
          <label for="inputDate">Date:</label>
          <input type="text" class="form-control" id="inputDate" name="dateSigned" placeholder="">
      </div>
  </div>
  <button type="submit" class="btn btn-primary">Save & Submit</button>
</div>
</form>
</div>
</template>

<script>
  import localforage from '../sessionUtils'
  import axios from 'axios'
  export default {
    name: 'volunteer',
    data () {
      return {
          profileData: {},
          bio: '',
          camps: [],
          sessionId: ''
      }
    },
    methods: {
        charactersLeft(){
            let words = this.bio.split(' ').filter((entry)=>{ return entry.trim() != ''; })
            let count = words.length
            let cap = 300
            return (cap-count) + ' / ' + cap + ' words remaining'
        },
        submit: function(evt){
            localforage.getItem('X_TOKEN')
            .then(session => {
                console.log('submit session: ', {headers: { 'x-token': session }})
                axios.post('/api/v1/applications', {
                    headers: { 'x-token': session },
                    params: {
                        full_name: this.profileData.full_name,
                        email: this.profileData.email,
                        address_line_1: evt.target.address1.value,
                        address_line_2: evt.target.address2.value,
                        city: evt.target.city.value,
                        state_province: evt.target.stateProvince.value,
                        zip_code: evt.target.zipCode.value,
                        country: evt.target.country.value,
                        phone_number: evt.target.phoneNumber.value,
                        bio: evt.target.bio.value,
                        camp: evt.target.camp.value,
                        date_signed: evt.target.dateSigned.value,
                        type: 'volunteer',
                        status: 'pending'
                        }
                })
                .catch(console.error)})
            .catch(console.error)
    },
    computed: {
        charactersLeft(){
            let words = this.bio.split(' ').filter((entry)=>{ return entry.trim() != ''; })
            let count = words.length
            let cap = 300
            return (cap-count) + ' / ' + cap + ' words remaining'
        }
    },
    created() {
        console.log('IN CREATED')
        localforage.getItem('X_TOKEN')
        .then(session => {
            console.log('AYYYYYYYYE')
            axios.get('/api/v1/camps/', {
                    headers: { 'x-token': session }
                })
                .then(response => {
                    this.camps = response.data
                    console.log(this.camps)
                })
                .catch(err => {
                    console.log('WOMP')
                })
            axios.get('/api/v1/profile/' + session, { 'headers': { 'x-token': session } })
            .then(response => {
                console.log(response.data)
            this.profileData = response.data
            })
            .catch(console.error)
        })
        .catch(console.error)
        }
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
</style>
