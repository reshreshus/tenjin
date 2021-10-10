<template>
  <div class="flex">
    <div class="w-[500px] border-r">
      <!-- {{ remSelection.rems }} -->
      <div v-for="(rem, idx) in rems" :key="idx"
       class="relative"
       >
        <div class="absolute -left-4 top-5 w-4 h-4 cursor-pointer" @click="openRem(rem)" >
          <div class="w-2 h-2 bg-black rounded-full" />
        </div>
        <div
          class="text-xl p-2 min-h-[2.75rem] caret-red"
          :class="{
            'bg-gray': isSelected(rem),
            'bg-airblue-light': isCurrent(idx),
            'line-through': rem.archived,
          }"
          :id="`rem-${rem.id}`"
          :contenteditable="isInsertMode"
          @keydown="remKeydown"
        >
            <!-- 'text-white': rem.archived && idx === cursorLine, -->

          {{ rem.text }}
          <div v-if="rem.opened && rem.body" v-html="micromark(rem.body)" class="prose" />
        </div>
      </div>
    </div>
    <doc-view :rem="currentRem" @change-rem="changeRem" class="ml-2" />
  </div>
</template>

<script>
import { micromark } from 'micromark'
import { mapState } from 'vuex'
import useKeydown from '@/composables/keydown'
import DocView from '@/modules/DocView'
import useRemSelection from '@/composables/rem-selection.js'

export default {
  components: {
    DocView
  },
  async setup() {
    return {
      remSelection: useRemSelection()
    }
  },
  data() {
    return {
      selectedLines: [
      ],
      cursorLine: 0,
    }
  },
  async created () {
    try {
      await this.$store.dispatch('fetchRems')
    } catch (error) {
      this.$router.push({
        name:  'ErrorDisplay',
        params: { error }
      })
    }

    useKeydown({
      k: this.moveUp,
      j: this.moveDown,
      // z: () => {
      //   const currentRem = this.rems[this.cursorLine]
      //   currentRem.opened = !currentRem.opened
      //   this.updateRem(currentRem)
      // },
      d: this.deleteCurrentRem,
      i: (e) => {
        e.preventDefault()
        this.setInsertMode()
        const remEl = document.getElementById(`rem-${this.currentRem.id}`)
        setTimeout(() => {
          this.placeCaretAtEnd(remEl)
        })
        // const remEl = this.toggleEditingRem()
        // document.execCommand('selectAll', false, null)
      },
      space: this.selectCurrentRem,
      esc: (e) => {
        e.preventDefault()
        this.setNormalMode
      },
    })
  },
  computed: {
    currentRem() {
      return this.rems[this.cursorLine]
    },
    ...mapState(['rems', 'mode']),
    isInsertMode() {
      return this.mode === 'insert'
    }
  },
  methods: {
    // remInput(e) {
    //   this.currentRem.text = e.target.innerText
    // },
    remKeydown(e) {
      if (this.isInsertMode) {
        console.log();
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
    placeCaretAtEnd(el) {
      el.focus();
      if (typeof window.getSelection != "undefined"
              && typeof document.createRange != "undefined") {
          var range = document.createRange();
          range.selectNodeContents(el);
          // true to put the caret at start
          range.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          // true to put the caret at start
          textRange.collapse(false);
          textRange.select();
      }
    },
    setMode(mode) {
      this.$store.commit('SET_MODE', mode)
    },
    setInsertMode() {
      this.setMode('insert')
    },
    setNormalMode() {
      this.setMode('normal')
    },
    // toggleEditingRem() {
    //   const remEl = document.getElementById(`rem-${this.currentRem.id}`)
    //   remEl.contentEditable = true
    //   return remEl
    // },
    moveUp() {
      this.cursorLine = Math.max(0, this.cursorLine - 1)
    },
    async moveDown() {
      if (this.cursorLine === this.rems.length - 1) {
        await this.newRem()
      }
      // this.cursorLine = Math.min(this.rems.length - 2, this.cursorLine + 1)
      this.cursorLine += 1
    },
    selectRem(rem) {
      // this.cursorLine = idx
      this.remSelection.toggle(rem)
    },
    selectCurrentRem() {
      this.selectRem(this.currentRem)
    },
    deleteCurrentRem() {
      this.removeRem(this.currentRem)
    },
    saveCurrentRem() {
      this.updateRem(this.currentRem)
    },
    openRem(rem) {
      rem.opened = !rem.opened
    },
    switchRemArchived(rem) {
      this.$store.dispatch('switchRemArchived', rem)
    },
    async newRem() {
      this.$store.dispatch('newRem')
    },
    removeCurrentRem() {
      this.removeRem(this.rems[this.cursorLine])
    },
    removeRem(rem) {
      if (this.cursorLine === this.rems.length - 1) {
        this.moveUp()
      }
      this.$store.dispatch('removeRem', rem)
    },
    updateRem(rem) {
      this.$store.dispatch('updateRem', rem)
    },
    isCurrent(idx) {
      return idx === this.cursorLine
    },
    isSelected(rem) {
      return this.remSelection.rems.has(rem)
    },
    changeRem( { archive, remove }) {
      const rem = this.currentRem
      if (archive) {
        this.switchRemArchived(rem)
        this.updateRem(rem)
      }
      if (remove) {
        this.removeRem(rem)
      }
      // save
    },
    micromark
  },
}
</script>

<style lang="sass" scoped>
</style>