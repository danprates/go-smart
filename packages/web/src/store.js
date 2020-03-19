import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default (api) => new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    'SET_USER': (state, payload) => {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    'SET_TOKEN': (state, payload) => {
      state.token = payload
      localStorage.setItem('token', JSON.stringify(payload))
    }
  },
  actions: {
    login: async ({ commit }, credentials) => {
      const { login } = await api.login(credentials)

      commit('SET_USER', login.user)
      commit('SET_TOKEN', login.token)
    },
    register: async ({ commit }, userData) => {
      const { createUser } = await api.register(userData)

      commit('SET_USER', createUser.user)
      commit('SET_TOKEN', createUser.token)
    },
    logout: ({ commit }) => {
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
    }
  },
  getters: {
    user: ({ user }) => user || JSON.parse(localStorage.getItem('user')),
    token: ({ token }) => token || JSON.parse(localStorage.getItem('token'))
  }
})
