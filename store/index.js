import Vue from 'vue'
import Vuex from 'vuex'

import geo from './modules/geo'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    async nuxtServerInit ({ commit }, { req, app }) {
      const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      if (status === 200) {
        commit('geo/setPosition', { province, city })
      } else {
        commit('geo/setPosition', { province: '', city: '' })
      }
    }
  }
})

export default store
