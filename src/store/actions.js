import * as types from './types'
import axios from 'axios'

import localforage from 'localforage'
const baseUrl = 'http://localhost:4567/'
localforage.config({name: 'WeRNextGeneration'})

export const login = ({commit}, {email, password, router}) =>
  //Add async request to get profile information before session creation
  axios.post(baseUrl + 'api/v1/sessions', email, password)
  .then(session => {
    console.log('received session is: ', session || 'no id!')
    localforage.setItem('X_TOKEN', session.data.X_TOKEN)
    commit(types.LOGIN, session.data.X_TOKEN)
  })
  .catch(err => console.error(err))

export const logout = () =>
  localforage.removeItem('X_TOKEN')
  .then(() => console.log('client storage token removed!'))
  .catch(err => console.error(err))
