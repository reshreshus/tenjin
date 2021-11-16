import { computed, ref } from 'vue'
// import { reactive } from 'vue'
import useRemSelection from '@/use/rem-selection'
import { placeCaretAtEnd, placeCaretAtStart } from '@/helpers/rem-place-caret'
import useRems from '@/use/rem-store.js'


  export default async function(remId) {
    console.log('useRem', remId)

    const remStore = await useRems()
    // console.log('rem store', remStore)

    // const rems = computed(() => remStore.rems)
    const { rems, mode } = remStore

    let cursorLine
    let selectedLines


    let childrem
    let superRem
    // console.log(rems.value)
    const init = (id) => {
      superRem = computed(() => rems.value.find(r => r.id === id))
      if (superRem.value.children) {
        childrem = computed(() => rems.value.filter(r => superRem.value.children.includes(r.id)))
      } else {
        childrem = computed(() => [])
      }
      cursorLine = ref(0)
      selectedLines = ref([])
      // console.log('init', superRem.value, childrem.value)
    }
    init(remId)

    const isCurrent = (idx) => {
      return idx === cursorLine.value
    }

    const isInsertMode = computed(() => {
      return mode.value === 'insert'
    })
    const isNormalMode = computed(() => {
      return mode.value === 'normal'
    })
    const remSelection = useRemSelection()

    const currentRem = computed(() => {
      return childrem.value[cursorLine.value]
    })

    const setMode = (mode) => {
      remStore.setMode(mode)
    }
    const setInsertMode = () => {
      setMode('insert')
    }
    const setNormalMode = () => {
      setMode('normal')
    }

    const moveUp = () => {
      cursorLine.value = Math.max(0, cursorLine.value - 1)
    }

    const moveDown = async () => {
      if (cursorLine.value === childrem.value.length - 1) {
        await newRem()
      }
      cursorLine.value += 1
    }

    const selectRem = (rem) => {
      remSelection.toggle(rem)
    }
    const selectCurrentRem = () => {
      selectRem(currentRem.value)
    }

    const deleteCurrentRem = () => {
      deleteRem(currentRem.value)
    }
    const saveCurrentRem = () => {
      remStore.updateRem(currentRem.value)
    }
    const setCurrentRemLine = (idx) => {
      cursorLine.value = idx
    }
    const switchRemArchived = (rem) => {
      rem.archived = !rem.archived
      remStore.updateRem(rem)
    }
    const newRem = async () => {
      console.log('new rem')
      remStore.newRem(superRem.value)
    }
    const deleteRem = (rem) => {
      if (cursorLine.value === childrem.value.length - 1) {
        moveUp()
      }
      remStore.deleteRem(rem, superRem.value)
    }

    const isSelected = (rem) => {
      return remSelection.rems.has(rem)
    }

    const changeRem = ({ archive, remove }) => {
      const rem = currentRem.value
      if (archive) {
        switchRemArchived(rem)
        remStore.updateRem(rem)
      }
      if (remove) {
        deleteRem(rem)
      }
      // save
    }

    const insertModeRem = ({ el, command }) => {
      el.preventDefault()
      setInsertMode()
      const remEl = document.getElementById(`rem-${currentRem.value.id}`)
      setTimeout(() => {
        if (command === 'i') {
          placeCaretAtStart(remEl)
        } else {
          placeCaretAtEnd(remEl)
        }
      })
    }

    return {
      init,

      childrem,
      isInsertMode,
      isNormalMode,
      currentRem,

      cursorLine,
      selectedLines,
      isCurrent,

      remSelection,
      isSelected,

      moveUp,
      moveDown,

      selectRem,
      selectCurrentRem,
      deleteCurrentRem,
      saveCurrentRem,
      setCurrentRemLine,
      switchRemArchived,
      newRem,
      deleteRem,
      changeRem,

      setNormalMode,
      setInsertMode,
      insertModeRem
    }
}