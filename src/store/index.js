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
    LOGOUT() {
      localStorage.removeItem('user')
      location.reload()
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser
    },
    REFRESH_TOKEN(state, token) {
      // 仅在登录后刷新
      // todo 为什么log调用了多次
      if (state.user) {
        state.user.token = token
        localStorage.setItem('user', JSON.stringify(state.user))
        console.log('refresh');
      }
    }
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
    login({commit}, credentials) {
      return login(credentials).then(({data}) => {
        commit('SET_USER_DATA', data)
      })
    },
    isNewUser({commit}, isNewUser) {
      commit('IS_NEW_USER', isNewUser)
    },
    refreshToken({commit}, token){
      commit('REFRESH_TOKEN', token)
    }
  },
  modules: {}
})
