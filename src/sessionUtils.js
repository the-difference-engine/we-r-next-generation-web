import axios from 'axios'
import * as types from './store/types'
import store from './store'

import localforage from 'localforage'
localforage.config({name: 'WeRNextGeneration'})
export default localforage

export const sessionCheck = (to, from, next) => {
  localforage.getItem('X_TOKEN')
  .then(session => {
    if (session) {
      const config = {headers: {'x-token': session}}
      axios.get(`/api/v1/sessions/${session}`, config)
      .then(res => {
        if (res.data.X_TOKEN) {
          store.commit(types.LOGIN, res.data.profileData)
          if (to.path === from.path) next(false)
          else if (to.path === '/adminApplications') next()
          else if (res.data.profileData.role === 'admin') next('/adminApplications')
          else if (to.path === '/login') next({path: '/'})
          else next()
        }
        else {
          localforage.removeItem('X_TOKEN')
          .then(() => next({path: '/login'}))
          .catch(err => console.error(err))
        }
      }).catch(err => console.error(err))
    }
    else {
      if (to.path === '/login') next()
      else next({path: '/login'})
    }
  }).catch(err => console.error(err))
}

export const adminCheck = (to, from, next) => {
  localforage.getItem('X_TOKEN')
  .then(session => {
    if (session) {
      const config = {headers: {'x-token': session}}
      axios.get(`/api/v1/sessions/${session}`, config)
      .then(res => {
        if (res.data.X_TOKEN) {
          store.commit(types.LOGIN, res.data.profileData)
          if (res.data.profileData.role === 'admin') next('/adminApplications')
          else next()
        }
        else {
          localforage.removeItem('X_TOKEN')
          .then(() => next())
          .catch(err => console.error(err))
        }
      }).catch(err => console.error(err))
    }
    else {
      next()
    }
  }).catch(err => console.error(err))
}
