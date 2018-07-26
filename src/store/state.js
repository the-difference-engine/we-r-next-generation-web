export const getters = {
  getUserInfo: state => state.userInfo,
}

export const state = {
  userInfo: {},
  loginStatus: false,
  isAdmin: false,

  applicationContext: {
    title: '',
    appType: '',
    formCurrPage: 0,
    formPages: 3,
    dataReady: false,
    formPristine: true,
    formDirty: false,
    formInvalid: false,
    formComplete: false,
    pagesComplete: [false, false, false],
    isPrevious: true,
    isNext: true,
    startRoute: '',
    routePage2: '',
    routeWaiver: '',
    routeConfirm: '',
    prevRoute: '',
    nextRoute: '',
    canSubmit: false,
    disable_edits: false,
  },
  applicationData: {
    childName: '',
    childAge: '',
    childGender: '',
    address1: '',
    address2: '',
    city: '',
    stateProvince: '',
    zipCode: '',
    country: '',
    countryName: '',
    phoneNumber: '',
    bioCamper: '',
    bioVolunteer: '',
    chosenCamp: '',
    chosenCampName: '',
    camps: [
      {
        text: '',
        value: ''
      },
    ],
    campsIdx: {},

    waiverForm: '',

    waiverCamper: {
      title: '',
      header: [],
      items: [],
      footer: '',

      initials: [],
      signature: '',
      signedDate: '',
    },
    waiverVolunteer: {
      title: '',
      header: [],
      items: [],
      footer: '',

      initials: [],
      signature: '',
      signedDate: '',
    }
  }
}
