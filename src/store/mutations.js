import * as types from './types'

export default {
  [types.LOGIN](state, data) {
    state.userInfo = Object.assign({}, data)
  },
}
