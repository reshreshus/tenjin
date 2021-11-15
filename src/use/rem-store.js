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

  const newRem = async () => {
    const rem = {
      id: v4(),
      text: ''
    }
    state.rems.push(rem)
    remsService.addRem(rem)
  }

  const deleteRem = (rem) => {
    state.rems = state.rems.filter(r => r.id !== rem.id)
    remsService.deleteRem(rem)
  }

  const updateRem = (rem) => {
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