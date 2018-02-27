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
  }
}
