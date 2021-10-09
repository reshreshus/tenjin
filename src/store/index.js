import { createStore } from "vuex";
import remsService from '@/services/remsService.js'
import { v4 } from 'uuid'

export default createStore({
  state: {
    rems: []
  },
  mutations: {
    SAVE_REMS(state, rems) {
      state.rems = rems
    },
    ADD_NEW_REM(state, rem) {
      state.rems.push(rem)
    },
    REMOVE_REM(state, rem) {
      state.rems = state.rems.filter(r => r.id != rem.id)
    }
  },
  actions: {
    async fetchRems({ commit }) {
      try {
        const { data: rems } = await remsService.fetchRems()
        commit('SAVE_REMS', rems)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    switchRemArchived({ dispatch }, rem) {
      rem.archived = !rem.archived
      dispatch('updateRem', rem)
    },
    newRem({ commit }) {
      const rem = {
        id: v4(),
        text: ''
      }
      commit('ADD_NEW_REM', rem)
      remsService.addRem(rem)
    },
    removeRem({ commit }, rem) {
      commit('REMOVE_REM', rem)
      remsService.deleteRem(rem)
    },
    updateRem(_,rem) {
      remsService.updateRem(rem)
    }
  },
  modules: {

  },
});
