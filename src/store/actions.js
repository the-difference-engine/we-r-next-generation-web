import * as types from './types'
import axios from 'axios'
import localforage from '../sessionUtils'
import swal from 'sweetalert2';

export const login = ({commit}, {email, password, router, that}) =>
  axios.post(`/api/v1/sessions`, {email, password})
  .then(res => {
    commit(types.LOGIN, res.data.profileData)
    commit(types.LOGSTATUS, true)
    localforage.setItem('X_TOKEN', res.data.X_TOKEN)
    .then(() => {
      if (res.data.profileData.role === 'admin') {
        router.push('/admin/applications')
        commit(types.ISADMIN, true)
      }
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
          commit(types.LOGOUT)
          commit(types.LOGSTATUS, false)
          commit(types.ISADMIN, false)
          router.push('/login')
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
    }
  })

export const signup = ({commit}, {name, email, password, that}) =>
  axios.post(`/api/v1/profiles`, {name, email, password})
  .then(() => {
    that.signedUp = true
  })
  .catch(err => {
    that.signUpErr = true
    setTimeout(() => {that.signUpErr = false}, 3000)
    console.error(err)
  })

export const resetPassword = ({commit}, {email, that}) =>
  axios.put(`/api/v1/profiles/resetPassword`, {email})
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
  axios.put(`/api/v1/profiles/newPassword`, {resetToken, password})
  .then(res => {
    that.passwordSuccess = true
    console.log('new pswd submission res data:', res.data)
  })
  .catch(err => {
    that.passwordFail = true
    setTimeout(() => {that.passwordFail = false}, 3000)
    console.error(err)
  })

// Get Waiver Page Resources
export const getWaiverResources = ({ commit }, { resource }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
      .then(session => {
        axios.get('/api/v1/resources/' + resource)
          .then(response => {
            resolve(response.data);
          })
          .catch(e => {
            setTimeout(() => { }, 3000);
            reject(e)
          })
      })
  })
}

export const getApplication = ({commit}, {id}) =>
  new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = {headers: {'x-token': session}}
        axios.get(`/api/v1/admin/applications/app/${id}`, config)
        .then(res => resolve(res.data))
        .catch(err => {
          console.error(err)
          reject(err)
        })
      }
    })
  })

export const getApplications = ({commit}, {type}) =>
  new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = {headers: {'x-token': session}}
        axios.get(`/api/v1/admin/applications/${type}`, config)
        .then(res => resolve(res.data))
        .catch(err => {
          console.error(err)
          reject(err)
        })
      }
    })
  })

export const updateApplication = ({commit}, {type, app, statusChange}) =>
  new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = {
          headers: {'x-token': session},
          params: {app, type, statusChange}}
        axios.put(`/api/v1/admin/applications/status/${app._id.$oid}`, config)
        .then(res => resolve(res.data))
        .catch(err => {
          console.error(err)
          reject(err)
        })
      }
    })
  })

export const deleteApplication = ({commit}, {app}) =>
  new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      if (session) {
        const config = {headers: {'x-token': session}}
        axios.delete(`/api/v1/admin/applications/${app._id.$oid}`, config)
        .then(() => resolve())
        .catch(err => {
          reject(err)
          console.error(err)
        })
      }
    })
  })

export const campSessionCreate = ({ commit }, { newCamp, router }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      axios.post(`/api/v1/admin/camp/session/create`, {
        headers: { 'x-token': session },
        params: newCamp
      })
      .then(res => {
        swal(
          'Saved!',
          'The camp was created successfully.',
          'success'
        );
        router.push(
          {
            name: 'campEdit', params: {
              id: res.data
            }
          }
        );
        resolve(true);
      })
      .catch(err => {
        swal(
          'Oops ...',
          'Something went wrong on the server, please try again.',
          'error'
        );
        setTimeout(() => { }, 3000);
        reject(false);
      })
    });
  })
}

export const campSessionUpdate = ({ commit }, { updated_camp, camp_id, router }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      axios.put(`/api/v1/admin/camp/session/${camp_id}/update`, {
        headers: { 'x-token': session },
        params: updated_camp
      })
      .then(res => { resolve(true) })
      .catch(err => {
        setTimeout(() => { }, 3000);
        reject(false);
      })
    });
  })
}

export const campSessionDelete = ({ commit }, { campId, router }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      axios.delete('/api/v1/admin/camp/session/' + campId + '/delete', {
        headers: { 'x-token': session },
        params: { id: campId }
      })
      .then(res => {
        if (res.data == true) {
          swal(
            'Deleted!',
            'The camp was deleted successfully.',
            'success'
          );
          router.push({ name: 'campCreate' });
          resolve(true);
        }
      })
      .catch(err => {
        swal(
          'Oops ...',
          'Something went wrong on the server, please try again.',
          'error'
        );
        setTimeout(() => { }, 3000);
        resolve(false);
      })
    })
  });
}

// Get one Camp Session by ID Number
export const getCamp = ({ commit }, { router }) =>
  localforage.getItem('X_TOKEN')
  .then(session => {
    axios.get(`/api/v1/camp/session/get`, {
      headers: { 'x-token': session }
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      setTimeout(() => {  }, 3000);
      reject(err);
    })
  });

export const campSessionGet = ({ commit }, { camp_id }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      axios.get('/api/v1/camp/session/' + camp_id, {
        headers: { 'x-token': session },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(e => {
        setTimeout(() => { }, 5000);
        reject(e)
      })
    })
  })
}

// Get all applicants related to a Camp Session by ID Number
export const campSessionGetApplicants = ({ commit }, { camp_id }) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      axios.get('/api/v1/admin/camp/session/' + camp_id + '/applicants', {
        headers: { 'x-token': session },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(e => {
        setTimeout(() => { }, 5000);
        reject(e)
      })
    })
  })
}

// Get all Camp Sessions, sorted by field
//  Default field = Start Date (descending)
export const campSessionsGetAll = ({commit}, {field_name, order}) => {
  return new Promise((resolve, reject) => {
    localforage.getItem('X_TOKEN')
    .then(session => {
      // axios.get('/api/v1/camp/sessions?sort=' + field_name + '&order=' + order)
      axios.get('/api/v1/camp/sessions', {
        headers: { 'x-token': session },
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(e => {
        setTimeout(() => { }, 5000);
        reject(e)
      })
    })
  })
}

