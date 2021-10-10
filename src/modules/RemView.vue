<template>
  <div class="flex">
    <div class="w-[500px] border-r">
      <!-- {{ remSelection.rems }} -->
      <div v-for="(rem, idx) in rems" :key="idx" :id="`rem-${rem.id}`" class="relative">
        <div class="absolute -left-4 top-5 w-4 h-4 cursor-pointer" @click="openRem(rem)" >
          <div class="w-2 h-2 bg-black rounded-full" />
        </div>
        <div
          class="text-xl p-2 min-h-[2.75rem]"
          :class="{
            'bg-gray': isSelected(rem),
            'bg-airblue': isCurrent(idx),
            'line-through': rem.archived,
          }"
          @click="selectRem(rem)"
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
      cursorLine: 0
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
      z: () => {
        const currentRem = this.rems[this.cursorLine]
        currentRem.opened = !currentRem.opened
        this.updateRem(currentRem)
      },
      d: () => {
        this.removeRem(this.rems[this.cursorLine])
      },
      i: () => {
        const remEl = document.getElementById(`rem-${this.currentRem.id}`)
        remEl.contentEditable = true
        setTimeout(() => remEl.focus())
        // document.execCommand('selectAll', false, null)
      }
    })
  },
  computed: {
    currentRem() {
      return this.rems[this.cursorLine]
    },
    ...mapState(['rems'])
  },
  methods: {
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