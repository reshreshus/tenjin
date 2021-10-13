<template>
  <div class="flex w-full">
    <div class="w-full">
      <!-- {{ remSelection.rems }} -->
      <!-- {{ cursorLine }} <br>
      {{ currentRem }} -->
      <div
        v-for="(rem, idx) in rems" :key="idx"
       class="rem pl-6 relative"
       >
        <div class="absolute left-2 top-5 w-4 h-4 cursor-pointer" @click="openRem(rem)" >
          <div class="w-2 h-2 bg-black rounded-full" />
        </div>
        <div
          class="text-xl p-2 min-h-[2.75rem] caret-red"
          :class="{
            'bg-gray': isSelected(rem),
            'bg-airblue-light': isCurrent(idx),
            'line-through': rem.archived,
            'cursor-pointer': isNormalMode
          }"
          :id="`rem-${rem.id}`"
          :contenteditable="isInsertMode && isCurrent(idx)"
          @keydown="remKeydown"
          @click="setCurrentRemLine(idx)"
        >
            <!-- 'text-white': rem.archived && idx === cursorLine, -->

          {{ rem.text }}
          <!-- <div v-if="rem.opened && rem.body" v-html="micromark(rem.body)" class="prose" /> -->
        </div>
      </div>
    </div>
    <!-- <doc-view :rem="currentRem" @change-rem="changeRem" class="ml-2" /> -->
  </div>
</template>

<script>
import { micromark } from 'micromark'
import { useStore } from 'vuex'
import useKeydown from '@/composables/keydown'
// import DocView from '@/modules/DocView'
import useRemSelection from '@/composables/rem-selection.js'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

export default {
  components: {
    // DocView
  },
  async setup() {

    const cursorLine = ref(0)
    const selectedLines = ref([])

    const store = useStore()
    const router = useRouter()

    try {
      await store.dispatch('fetchRems')
    } catch (error) {
      router.push({
        name:  'ErrorDisplay',
        params: { error }
      })
    }

    const rems = computed(() => store.state.rems)
    const mode = computed(() => store.state.mode)

    const isInsertMode = computed(() => {
      return mode.value === 'insert'
    })
    const isNormalMode = computed(() => {
      return mode.value === 'normal'
    })
    const remSelection = useRemSelection()
    const currentRem = computed(() => {
      return rems.value[cursorLine.value]
    })
    console.log('rems', rems.value)
    console.log('currentRem', currentRem.value)

    const setMode = (mode) => {
      store.commit('SET_MODE', mode)
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
      if (cursorLine.value === rems.value.length - 1) {
        await newRem()
      }
      // this.cursorLine = Math.min(this.rems.length - 2, this.cursorLine + 1)
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
      updateRem(currentRem.value)
    }
    const setCurrentRemLine = (idx) => {
      cursorLine.value = idx
    }
    const openRem = (rem) => {
      rem.opened = !rem.opened
    }
    const switchRemArchived = (rem) => {
      store.dispatch('switchRemArchived', rem)
    }
    const newRem = async () => {
      store.dispatch('newRem')
    }
    const deleteRem = (rem) => {
      if (cursorLine.value === rems.value.length - 1) {
        moveUp()
      }
      store.dispatch('deleteRem', rem)
    }
    const updateRem = (rem) => {
      store.dispatch('updateRem', rem)
    }
    const isCurrent = (idx) => {
      return idx === cursorLine.value
    }
    const isSelected = (rem) => {
      return remSelection.rems.has(rem)
    }
    const changeRem = ({ archive, remove }) => {
      const rem = currentRem.value
      if (archive) {
        switchRemArchived(rem)
        updateRem(rem)
      }
      if (remove) {
        deleteRem(rem)
      }
      // save
    }

    const placeCaret = (el, atStart = false) => {
      el.focus();
      if (typeof window.getSelection != "undefined"
              && typeof document.createRange != "undefined") {
          var range = document.createRange();
          range.selectNodeContents(el);
          // true to put the caret at start
          range.collapse(atStart);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(atStart);
          textRange.select();
      }
    }
    const placeCaretAtEnd = (el) => {
      placeCaret(el, false)
    }
    const placeCaretAtStart = (el) => {
      placeCaret(el, true)
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
      rems,
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
      openRem,
      switchRemArchived,
      newRem,
      deleteRem,
      updateRem,
      changeRem,

      
      setNormalMode,
      setInsertMode,
    }
  },
  methods: {
    remKeydown(e) {
      if (this.isInsertMode) {
        if (e.key === 'Escape' || e.key === 'Enter') {
          this.setNormalMode()
          const rem = {
            ...this.currentRem,
            text: e.target.innerText
          }
          this.updateRem(rem)
          e.preventDefault()
          e.target.blur()
        }
      }
    },
    micromark
  },
}
</script>

<style lang="sass" scoped>
</style>