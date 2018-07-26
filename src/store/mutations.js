import * as types from './types'

export default {
  [types.LOGIN](state, data) {
    state.userInfo = Object.assign({}, data)
  },
  [types.LOGOUT](state) {
    state.userInfo = {}
  },
  [types.LOGSTATUS](state, data){
    state.loginStatus = data
  },
  [types.ISADMIN](state, data) {
    state.isAdmin = data
  },
  [types.APPLICATION](state, data) {
    state.applicationData = data;
  },
  [types.APPCONTEXT](state, data) {
    state.applicationContext = data;
  }
}
