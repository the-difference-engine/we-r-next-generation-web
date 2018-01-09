import axios from 'axios'

import localforage from 'localforage'
localforage.config({name: 'WeRNextGeneration'})
export default localforage

export const baseUrl = 'http://localhost:4567/'

export const sessionCheck = (to, from, next) => {
  localforage.getItem('X_TOKEN')
  .then(session => {
    if (session) {
      const config = {headers: {'x-token': session}}
      axios.get(`${baseUrl}api/v1/sessions/${session}`, config)
      .then(res => {
        if (res.data.X_TOKEN) {
          if (to.path === from.path) next(false)
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
