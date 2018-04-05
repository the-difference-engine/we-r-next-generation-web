<!--An empty component to replace the header and/or footer on pages where it is not required-->

<template>
  <div class="container">
    <h1>Camp Application</h1>
    <hr>
    <form v-on:submit.prevent="submit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputFullName">Full Name</label>
          {{profileData.full_name}}
        </div>
        <div class="form-group col-md-6">
            <label for="inputEmail">Email</label>
            {{profileData.email}}
        </div>
      </div>
      <div class="form-row">
        <label for="inputAddress1">Child's Address line 1</label>
        <input type="text" name="address1" class="form-control" id="inputAddress1" placeholder="1234 Main St">
      </div>
      <div class="form-row">
        <label for="inputAddress2">Child's Address line 2</label>
        <input type="text" name="address2" class="form-control" id="inputAddress1" placeholder="1234 Main St">
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
        <input type="text" class="form-control" id="inputPhone" placeholder="Phone Number" name="phoneNumber">
      </div>
      <hr>
      <div class="form-group">
        <label for="inputChildName">Child's Name</label>
        <input type="text" class="form-control" id="inputChildName" placeholder="Child's Name" name="childName">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputChildAge">Child's Age</label>
          <input type="text" class="form-control" id="inputChildAge" placeholder="Child's Age" name="age">
        </div>
        <div class="form-group col-md-6">
          <label for="inputChildGender">Child's Gender</label>
          <input type="text" class="form-control" id="inputChildGender" placeholder="Child's Gender" name="gender">
        </div>
      </div>
      <p>Camp your child would like to attend (Select one):</p>
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
      <p>How do you think they could benefit from Creativity Camp?</p>
      <div class="form-row">
        <textarea class="form-control" id="inputBenefit" rows="3" placeholder="" name="bio"></textarea>
      </div>
    <div class="waiver">
      <h3>Parent Release and Waiver of Liability Form</h3>
      <br>
      This Release and Waiver of Liability is executed on behalf of __________________________________ as beneficiary to We R NextGeneration, Inc., a nonprofit corporation organized and existing under the laws of the State of Maryland, USA (and in partnership with Young Innovators Initiative (YII) Nigeria CAC/IT/NO 73171) and each of its directors, officers, employees, and agents. I _________________________________ allows the named beneficiary to engage in activities related to We R NextGeneration, Inc.’s iCreativity Camp program.<br>
      <br>
      <ol>
        <li>Waiver and Release: I release and forever discharge and hold harmless We R NextGeneration, Inc. and its successors and assigns from any and all liability, claims, and demands of whatever kind of nature, either in law or in equity, which arise or may hereafter arise from the participation in We R NextGeneration, Inc. activities and program. I understand and acknowledge that this release, discharges We R NextGeneration, Inc. from any liability or claim that may have against We R NextGeneration, Inc. with respect to bodily injury, personal injury, illness, death, or property damage that may result from the participation with We R NextGeneration, Inc.</li>
        <li>Insurance: Further I understand that We R NextGeneration, Inc. does not assume any responsibility for or obligation to provide the beneficiary with financial or other assistance, including but not limited to medical, health, or disability benefits or insurance. I expressly waive any such claim for compensation or liability on the part of We R NextGeneration, Inc. beyond what may be offered freely by We R NextGeneration, Inc. in the event of injury or medical expenses incurred by me.</li>
        <li>Medical Treatment: I hereby release and forever discharge We R NextGeneration, Inc. from any claim whatsoever which arises or may hereafter arise on account of any first-aid treatment or other medical services rendered in connection with an emergency during my child’s participation in the iCreativity Camp program organized by We R NextGeneration, Inc.</li>
        <li>Assumption of Risk: I understand as a parent/guardian, I hereby expressly assume risk of injury or harm from these activities and release We R NextGeneration, Inc. from all liability.</li>
        <li>Photographic Release: I grant and convey to We R NextGeneration, Inc. all right, title, and interests in any and all photographs, images, video, or audio recordings of the beneficiary or the beneficiary’s likeness or voice made by We R NextGeneration, Inc. in connection with participating in the iCreativity Camp program with We R NextGeneration, Inc.</li>
        <li>OProgram Participation: The beneficiary will follow all rules of the We R NextGeneration, Inc.’s iCreativity Camp program. The beneficiary will attend all sessions of the program as indicated in the program schedule.</li>
      </ol>
      <p>By signing below, I express my understanding and intent to enter into this Release and Waiver of Liability willingly and voluntarily.</p>

      <br>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputSignature">Signature of parent/guardian:</label>
          <input type="text" class="form-control" id="inputSignature" placeholder="">
        </div>
        <div class="form-group col-md-3">
          <label for="inputDate">Date:</label>
          <input type="text" class="form-control" id="inputDate" placeholder="" name="dateSigned">
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
    name: 'camper',
    data () {
      return {
        profileData: {},
        bio: ''
      }
    },
    methods: {
      submit: function(evt){
            localforage.getItem('X_TOKEN')
            .then(session => {
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
                        childName: evt.target.childName.value,
                        age: evt.target.age.value,
                        gender: evt.target.gender.value,
                        bio: evt.target.bio.value,
                        camp: evt.target.camp.value,
                        date_signed: evt.target.dateSigned.value,
                        type: 'camper',
                        status: 'pending'
                        }
                })
                .catch(console.error)})
            .catch(console.error)

        }
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
</style>
