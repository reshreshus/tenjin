import useKeydown from '@/use/keydown'
import { computed, ref } from 'vue'
import useRemSelection from '@/use/rem-selection'
import { placeCaretAtEnd, placeCaretAtStart } from '@/helpers/rem-place-caret'
import useRems from '@/use/rem-store.js'


  export default function(remId) {
    console.log('useRem')

    const remStore = useRems()

    const rems = computed(() => remStore.rems)
    const mode = computed(() => remStore.mode)

    const cursorLine = ref(0)
    const selectedLines = ref([])

    const isCurrent = (idx) => {
      return idx === cursorLine.value
    }

    let childrem
    // TODO
    if (remId === -1) {
      // childrem = computed(() => rems.value.filter(r => !r.parentId))
      childrem = rems.value
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
      remStore.newRem()
    }
    const deleteRem = (rem) => {
      if (cursorLine.value === childrem.value.length - 1) {
        moveUp()
      }
      remStore.deleteRem(rem)
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

    useKeydown({
      k: moveUp,
      j: moveDown,
      d: deleteCurrentRem,
      i: (el) => insertModeRem({ el, command: 'i'}),
      a: (el) => insertModeRem({ el, command: 'a'}),
      space: selectCurrentRem,
      esc: (e) => {
        e.preventDefault()
        setNormalMode()
      },
    })

    return {
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
    }
}