// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'

import localforage from 'localforage'
// localforage.config({name: 'WeRNextGeneration'})
import axios from 'axios'

const baseUrl = 'http://localhost:4567/'
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

router.beforeEach((to, from, next) => {
  const successRedirect = to.path === '/login' ? {path: '/'} : to.path
  localforage.getItem('X_TOKEN')
  .then(session => {
    console.log(`session retrieved in ${to.path.toUpperCase()} beforeEach : `, session)
    if (session) {
      axios.get(`${baseUrl}api/v1/sessions/:${session}`)
      .then(res => {
        if (res.data.X_TOKEN) { next(successRedirect) }
        else {
          localforage.removeItem('X_TOKEN')
          .then(() => next({path: '/login'}))
          .catch(err => console.error(err))
        }
      }).catch(err => console.error(err))
    }
    else if (to.path === '/login') { next() }
    else { next('/login') }
  }).catch(err => console.error(err))
})
