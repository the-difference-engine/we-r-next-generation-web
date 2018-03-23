// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import axios from 'axios'
import VueMq from 'vue-mq'
import localforage from './sessionUtils'

Vue.use(VueMq, {
  breakpoints: {
    mobile: 600,
    other: Infinity
  }
})

axios.defaults.baseURL = process.env.BASE_URL
localforage.getItem('X_TOKEN')
.then(token => {
  if (token) axios.defaults.headers.common['x-token'] = token
}).catch(err => console.error(err))

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
