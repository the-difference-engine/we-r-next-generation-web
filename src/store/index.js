import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import {state, getters} from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
