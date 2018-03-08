import * as types from './types'
import axios from 'axios'
import localforage from '../sessionUtils'

export const login = ({commit}, {user_name, password, router}) =>
  axios.post(`/api/v1/sessions/${user_name}/${password}`)
  .then(res => {
    commit(types.LOGIN, res.data.profileData)
    localforage.setItem('X_TOKEN', res.data.X_TOKEN)
    .then(() => router.push('/'))
  })
  .catch(err => console.error(err))

export const logout = ({commit}, {router}) =>
  localforage.getItem('X_TOKEN')
  .then(session => {
    if (session) {
      const config = {headers: {'x-token': session}}
      axios.delete(`/api/v1/sessions/${session}`, config)
      .then(() => {
        localforage.removeItem('X_TOKEN')
        .then(() => {
          commit(types.LOGOUT)
          router.push('/login')
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
    }
  })

export const signup = ({commit}, {name, email, password}) =>
  axios.post(`/api/v1/profiles`, {params: {name, email, password}})
  .then(res => {
    console.log('res data is: ', res.data)
  })
  .catch(err => console.error(err))

export const resetPassword = ({commit}, {email}) =>
  axios.put(`/api/v1/profiles/resetPassword/${email}`)
  .then(res => {
    console.log('password reset res data: ', res.data)
  })
  .catch(err => console.error(err))
