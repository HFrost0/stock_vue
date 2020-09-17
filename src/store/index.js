import Vue from 'vue'
import Vuex from 'vuex'
import {login, registry} from "@/network/authenticate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isNewUser: true
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    LOGOUT () {
      localStorage.removeItem('user')
      location.reload()
    },
    IS_NEW_USER(state, isNewUser){
      state.isNewUser = isNewUser
    },
  },
  actions: {
    registry({commit}, credentials) {
      return registry(credentials).then(({data}) => {
        commit('SET_USER_DATA', data)
        console.log(data)
      })
    },
    logout({commit}) {
      commit('LOGOUT')
    },
    login({commit}, credentials){
      return login(credentials).then(({data})=>{
        commit('SET_USER_DATA', data)
      })
    },
    isNewUser({commit}, isNewUser){
      commit('IS_NEW_USER', isNewUser)
    }
  },
  modules: {}
})
