import { reactive, toRefs } from 'vue'
import remsService from '@/services/remsService.js'
import { v4 } from 'uuid'

const state = reactive({
  rems: [],
  mode: 'normal'
})

export default function() {

  console.log('useRemStore')
  const empty = () => {
    return state.rems.length === 0
  }

  const fetchRems = async () => {
    const { data } = await remsService.fetchRems()
    state.rems = data
  }

  const setMode = (mode) => {
    state.mode = mode
  }

  const newRem = async (parent) => {
    const rem = {
      id: v4(),
      text: ''
    }

    // add id to children array of the paren
    state.rems.forEach(r => {
      if (r.id === parent.id) {
        if (r.children) {
          r.children.push(rem.id)
        } else {
          r.children = [rem.id]
        }
        updateRem(r)
      }
    })
    state.rems.push(rem)
    remsService.addRem(rem)
  }

  const deleteRem = (rem, parent) => {
    state.rems = state.rems.filter(r => r.id !== rem.id)
    remsService.deleteRem(rem)
    // remove child id from parent
    parent.children = parent.children.filter(id => id !== rem.id)
    updateRem(parent)
  }

  const updateRem = (rem) => {
    // console.log('update rem', rem)
    remsService.updateRem(rem)
  }

  return {
    fetchRems,
    empty,
    newRem,
    deleteRem,
    updateRem,

    setMode,

    ...toRefs(state)
  }
}