import * as types from './types'
import axios from 'axios'
import localforage, {baseUrl} from '../sessionUtils'

export const login = ({commit}, {user_name, password, router}) =>
  axios.post(`${baseUrl}api/v1/sessions/${user_name}/${password}`)
  .then(res => {
    commit(types.LOGIN, res.data.profileData)
    localforage.setItem('X_TOKEN', res.data.X_TOKEN)
    .then(() => router.push('/'))
  })
  .catch(err => console.error(err))

export const logout = ({commit}, {router}) =>
  localforage.getItem('X_TOKEN')
  .then(session => {
    const config = {headers: {'x-token': session}}
    axios.delete(`${baseUrl}api/v1/sessions/${session}`, config)
    .then(() => {
      localforage.removeItem('X_TOKEN')
      .then(() => {
        commit(types.LOGOUT)
        router.push('/login')
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  })
