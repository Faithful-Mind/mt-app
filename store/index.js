import Vue from 'vue'
import Vuex from 'vuex'

import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit ({ commit }, { req, app }) {
      const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      if (status === 200) {
        commit('geo/setPosition', { province, city })
      } else {
        commit('geo/setPosition', { province: '', city: '' })
      }
      await (async () => {
        const { status, data: { menu } } = await app.$axios.get('/geo/menu')
        commit('home/setMenu', status === 200 ? menu : [])
      })()
    }
  }
})

export default store
