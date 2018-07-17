// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import axios from 'axios'
import VueMq from 'vue-mq'
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';
import localforage from './sessionUtils'

Vue.use(VueMq, {
  breakpoints: {
    smartphone: 320,
    mobile: 600,
    tablet: 768,
    desktop: 1224,
    other: Infinity
  }
});

Vue.use(Tooltip);

axios.defaults.baseURL = process.env.BASE_URL

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
