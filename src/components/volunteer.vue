<!--An empty component to replace the header and/or footer on pages where it is not required-->

<template>
<div class="container">
    <h1>Volunteer Application</h1>
    <hr>
    <form>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputFullName">Full Name</label>
                <input type="text" class="form-control" id="inputFullName" placeholder="Full Name">
            </div>
            <div class="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
        </div>
        <div class="form-group">
            <label for="inputAddress1">Address</label>
            <input type="text" class="form-control" id="inputAddress1" placeholder="1234 Main St">
        </div>
        <div class="form-group">
            <div class="form-group col-md-6">
                <label for="inputPhone">Phone Number</label>
                <input type="text" class="form-control" id="inputPhone" placeholder="Phone Number">
            </div>
        </div>
        <hr>
        <p>Please tell us a little bit about yourself:</p>
        <div class="form-group">
            <label for="inputBio">Bio</label>
            <textarea v-model="message" @keyup="callback" class="form-control" id="inputBio" rows="3" placeholder="Bio"></textarea>
            <div>{{ count }}/300 Words Max</div>
        </div>
    <p>Which camp would you like to teach at (Select one):</p>
    <div class="form-check">
        <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="">
            Camp 1
        </label>
    </div>
    <div class="form-check">
        <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="">
            Camp 2
        </label>
    </div>
    </form>


<div class="waiver">
    <h3>Volunteer Release and Waiver of Liability Form</h3>
    <br>
    This Release and Waiver of Liability (the “release”) executed on _____ (date) by ________(“Volunteer”) releases We R NextGeneration, Inc. a nonprofit corporation organized and existing under the laws of the State of Maryland and each of its directors, officers, employees, and agents. The Volunteer desires to provide volunteer services for Nonprofit and engage in activities related to serving as a volunteer.
    Volunteer understands that the scope of Volunteer’s relationship with Nonprofit is limited to a volunteer position and that no compensation is expected in return for services provided by Volunteer; that Nonprofit will not provide any benefits traditionally associated with employment to Volunteer; and that Volunteer is responsible for his/her own insurance coverage in the event of personal injury or illness as a result of Volunteer’s services to Nonprofit.<br>
<br>
<ol>
    <li>Waiver and Release: I, the Volunteer, release and forever discharge and hold harmless Nonprofit and its successors and assigns from any and all liability, claims, and demands of whatever kind of nature, either in law or in equity, which arise or may hereafter arise from the services I provide to Nonprofit. I understand and acknowledge that this Release discharges Nonprofit from any liability or claim that I may have against Nonprofit with respect to bodily injury, personal injury, illness, death, or property damage that may result from the services I provide to Nonprofit or occurring while I am providing volunteer services.<br>
        <!--<div class="initial">-->
            <!--<div class="form-group col-md-12">-->
                <!--<label for="inputInitial">Your initials:</label>-->
                <!--<input type="text" class="form-control" id="inputInitial" placeholder="">-->
            <!--</div>-->
        <!--</div>-->
    </li>
    <br>
  <li>Insurance: Further I understand that Nonprofit does not assume any responsibility for or obligation to provide me with financial or other assistance, including but not limited to medical, health, or disability benefits or insurance. I expressly waive any such claim for compensation or liability on the part of Nonprofit beyond what may be offered freely by Nonprofit in the event of injury or medical expenses incurred by me.<br>
        <!--<div class="initial">-->
            <!--<div class="form-group col-md-2">-->
                <!--<label for="inputInitial">Your initials:</label>-->
                <!--<input type="text" class="form-control" id="inputInitial" placeholder="">-->
            <!--</div>-->
        <!--</div>-->
    </li>
  <br>

  <li>Medical Treatment: I hereby Release and forever dischargeNonprofit from any claim whatsoever which arises or may hereafter arise on account of any first-aid treatment or other medical services rendered in connection with an emergency during my tenure as a volunteer with Nonprofit.<br>
        <!--<div class="initial">-->
            <!--<div class="form-group col-md-2">-->
                <!--<label for="inputInitial">Your initials:</label>-->
                <!--<input type="text" class="form-control" id="inputInitial" placeholder="">-->
            <!--</div>-->
        <!--</div>-->
    </li>
  <br>
  <li>Assumption of Risk: I understand that the services I provide to Nonprofit may include activities that may be hazardous to me including, but not limited to ______________ involving inherently dangerous activities. As a volunteer, I hereby expressly assume risk of injury or harm from these activities and Release Nonprofit from all liability.<br>
        <!--<div class="initial">-->
            <!--<div class="form-group col-md-2">-->
                <!--<label for="inputInitial">Your initials:</label>-->
                <!--<input type="text" class="form-control" id="inputInitial" placeholder="">-->
            <!--</div>-->
        <!--</div>-->
    </li>
    <li>Photographic Release: I grant and convey to Nonprofit all right, title, and interests in any and all photographs, images, video, or audio recordings of me or my likeness or voice made by Nonprofit in connection with my providing volunteer services to Nonprofit.<br>
        <!--<div class="initial">-->
            <!--<div class="form-group col-md-2">-->
                <!--<label for="inputInitial">Your initials:</label>-->
                <!--<input type="text" class="form-control" id="inputInitial" placeholder="">-->
            <!--</div>-->
        <!--</div>-->
    </li>
  <br>
  <br>
  <li>Other: As a volunteer, I expressly agree that this Release is intended to be as broad and inclusive as permitted by the laws of the State of  Maryland and that this Release shall be governed by and interpreted in accordance with the laws of the State of Maryland. I agree that in the event that any clause or provision of this Release is deemed invalid, the enforceability of the remaining provisions of this Release shall not be affected.<br>
        <!--<div class="initial">-->
            <!--<div class="form-group col-md-2">-->
                <!--<label for="inputInitial">Your initials:</label>-->
                <!--<input type="text" class="form-control" id="inputInitial" placeholder="">-->
            <!--</div>-->
        <!--</div>-->
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
            <input type="text" class="form-control" id="inputDate" placeholder="">
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Save & Submit</button>
</div>
</div>
</template>

<script>
  var limitWord = 5;
  var wordCount = this.length;
  var chars
  export default {
    name: 'volunteer',
    methods: {
      callback: function (message) {
        // debugger;
        this.count = this.message.split(/\s+/).length-1
        console.log(this.count);
        if (this.count <= limitWord) {
          chars = this.message.length;
        } else {
          let new_text = this.message.substr(0, 4);
          console.log(this.message.split(/\s+/));
          this.message = new_text;
          // wordCount --;
        }
      }
    },
    data () {
      return {
        message: "",
        count: 0
      }
    }
  }
</script>

<style scoped>
  .container{
    margin: auto;
  }

  .waiver{
    margin: 25px;
    padding: 25px;
    border: 2px solid gray;
  }
</style>
