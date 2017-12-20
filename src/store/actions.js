import * as types from './types'
import axios from 'axios'

import localforage from 'localforage'
const baseUrl = 'http://localhost:4567/'
localforage.config({name: 'WeRNextGeneration'})

export const login = ({commit}, {email, password, router}) =>
  //Add async request to get profile information before session creation
  axios.post(baseUrl + 'api/v1/sessions', email, password)
  .then(res => {
    console.log('received session is: ', res)
    commit(types.LOGIN, {email: 'test@test.com', name: 'Adobe :)'})
    localforage.setItem('X_TOKEN', res.data.X_TOKEN)
    .then(() => {
      router.push('/')
      console.log('navigation to root component triggered after successful session post')
    })
  })
  .catch(err => console.error(err))

export const logout = ({commit}, {router}) =>
  localforage.removeItem('X_TOKEN')
  .then(() => {
    commit(types.LOGOUT)
    router.push('/login')
    console.log('client storage token removed!')
  })
  .catch(err => console.error(err))
