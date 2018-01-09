import * as types from './types'

export default {
  [types.LOGIN](state, data) {
    state.userInfo = Object.assign({}, data)
    state.userInfo.loggedIn = true
  },
  [types.LOGOUT](state) {
    state.userInfo = {}
  }
}
