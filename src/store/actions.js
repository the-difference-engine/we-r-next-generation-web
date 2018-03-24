import * as types from './types'
import axios from 'axios'
import localforage from '../sessionUtils'

export const login = ({commit}, {user_name, password, router, that}) =>
  axios.post(`/api/v1/sessions/${user_name}/${password}`)
  .then(res => {
    commit(types.LOGIN, res.data.profileData)
    commit(types.LOGSTATUS, true)
    localforage.setItem('X_TOKEN', res.data.X_TOKEN)
    .then(() => {
      if (res.data.profileData.role === 'admin') router.push('/adminApplications')
      else router.push('/')
    })
  })
  .catch(err => {
    that.loginErr = true
    setTimeout(() => {that.loginErr = false}, 3000)
    console.error(err)
  })

export const logout = ({commit}, {router}) =>
  localforage.getItem('X_TOKEN')
  .then(session => {
    if (session) {
      const config = {headers: {'x-token': session}}
      axios.delete(`/api/v1/sessions/${session}`, config)
      .then(() => {
        localforage.removeItem('X_TOKEN')
        .then(() => {
          axios.defaults.headers.common['x-token'] = null
          commit(types.LOGOUT)
          commit(types.LOGSTATUS, false)
          router.push('/login')
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
    }
  })

export const signup = ({commit}, {name, email, password, that}) =>
  axios.post(`/api/v1/profiles`, {params: {name, email, password}})
  .then(res => {
    console.log('res is: ', res.data)
    that.signedUp = true
  })
  .catch(err => {
    that.signUpErr = true
    setTimeout(() => {that.signUpErr = false}, 3000)
    console.error(err)
  })

export const resetPassword = ({commit}, {email, that}) =>
  axios.put(`/api/v1/profiles/resetPassword/${email}`)
  .then(res => {
    console.log('password reset res data: ', res.data)
    that.requestMade = true
  })
  .catch(err => {
    that.resetError = true
    setTimeout(() => {that.resetError = false}, 3000)
    console.error(err)
  })

export const submitNewPassword = ({commit}, {password, resetToken, that}) =>
  axios.put(`/api/v1/profiles/newPassword/${resetToken}/${password}`)
  .then(res => {
    that.passwordSuccess = true
    console.log('new pswd submission res data:', res.data)
  })
  .catch(err => {
    that.passwordFail = true
    setTimeout(() => {that.passwordFail = false}, 3000)
    console.error(err)
  })

export const getVolunteerApps = ({ commit }, { that }) =>
  localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = { headers: { 'x-token': session } }
        axios.get('/api/v1/applications/volunteers', config)
          .then(res => { that.applications = res.data })
          .catch(err => console.error(err))
      }
    })

export const campSessionCreate = ({ commit }, { new_camp, router }) =>
  localforage.getItem('X_TOKEN')
  .then(session => {
    axios.post(`/api/v1/camp/session/create`, { 
      headers: { 'x-token': session },
      params: new_camp 
    })
      .then(res => {
        console.log('res is: ', res);
        router.push('/camp/' + res.data.$oid)
      })
      .catch(err => {
        setTimeout(() => {  }, 3000);
        console.error(err);
      })
  });

export const campSessionGet = ({ commit }, { camp_id }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
      .then(session => {
        console.log('submit session: ', { headers: { 'x-token': session } }, 'camp_id:', camp_id);
        axios.get('/api/v1/camp/session/' + camp_id)
          .then(response => {
            console.log("Response Received from campSessionGet", response.data);
            resolve(response.data);
          })
          .catch(e => {
            setTimeout(() => { }, 3000);
            console.log("Error Received from campSessionGet");
            reject(e)
          })
      })
  })
}

