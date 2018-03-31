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

export const getApplications = ({commit}, {that, type}) =>
  localforage.getItem('X_TOKEN')
  .then(session => {
    if (session) {
      const config = {headers: {'x-token': session}}
      axios.get(`/api/v1/applications/${type}`, config)
      .then(res => {
        that.applications = res.data.applications
        that.applicationType = res.data.type
        console.log(res.data);
      })
      .catch(err => console.error(err))
    }
  })

  export const updateApplication = ({commit}, {that, type, app, statusChange}) =>
    localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = {
          headers: {'x-token': session},
          params: {app, type, statusChange}}
        axios.put(`/api/v1/applications/status/${app._id.$oid}`, config)
        .then(res => {
          const updatedApp = res.data
          that.applications[statusChange].apps[updatedApp._id.$oid] = res.data
          delete that.applications[app.status].apps[updatedApp._id.$oid]
          that.canGetApps = true
        })
        .catch(err => {
          that.canGetApps = true
          console.error(err)
        })
      }
    })

  export const deleteApplication = ({commit}, {that, app}) =>
    localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = {headers: {'x-token': session}}
        axios.delete(`/api/v1/applications/${app._id.$oid}`, config)
        .then(res => {
          delete that.applications[app.status].apps[app._id.$oid]
          that.canGetApps = true
        })
        .catch(err => {
          that.canGetApps = true
          console.error(err)
        })
      }
    })

export const campCreate = ({ commit }, { new_camp, router, that }) =>
  axios.post(`/api/v1/camp/session/create`, { params: { name, email, password } })
    .then(res => {
      console.log('res is: ', res.data)
      that.signedUp = true
    })
    .catch(err => {
      that.signUpErr = true
      setTimeout(() => { that.signUpErr = false }, 3000)
      console.error(err)
    })
