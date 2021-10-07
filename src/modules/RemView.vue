<template>
  <div class="flex">
    <div class="w-[500px] border-r">
      <div v-for="(rem, idx) in rems" :key="idx" class="relative">
        <div class="absolute -left-4 top-5 w-4 h-4 cursor-pointer" @click="openRem(rem)" >
          <div class="w-2 h-2 bg-black rounded-full" />
        </div>
        <div
          class="text-xl p-2 min-h-[2.75rem]"
          :class="{
            'bg-gray': isHighlighted(idx),
            'line-through': rem.archived,
          }"
          @click="selectRem(idx)"
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
import { ref } from 'vue'
import axios from 'axios'
import { micromark } from 'micromark'
import useKeydown from '@/composables/keydown'
import { v4 } from 'uuid'
import DocView from '@/modules/DocView'

export default {
  components: {
    DocView
  },
  async setup() {
    const { data: rems } = await axios.get('http://localhost:3000/rems')
    return {
      rems: ref(rems)
    }
  },
  data() {
    return {
      selectedLines: [
      ],
      cursorLine: 0
    }
  },
  created () {
    useKeydown([
      {
        key: 'k',
        fn: this.moveUp
      },
      {
        key: 'j',
        fn: this.moveDown
      },
      {
        key: 'z',
        fn: () => {
          const currentRem = this.rems[this.cursorLine]
          currentRem.opened = !currentRem.opened
          this.updateRem(currentRem)
        }
      },
      {
        key: 'd',
        fn: () => {
          this.removeRem(this.rems[this.cursorLine])
        }
      }
    ])
  },
  computed: {
    // currentRems() {
    //   return this.rems.filter(r => !r.archived)
    // },
    currentRem() {
      return this.rems[this.cursorLine]
    }
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
    selectRem(idx) {
      this.cursorLine = idx
    },
    openRem(rem) {
      rem.opened = !rem.opened
    },
    switchRemArchived(rem) {
      rem.archived = !rem.archived
      this.updateRem(rem)
    },
    updateRem(rem) {
      axios.put(`http://localhost:3000/rems/${rem.id}`, rem)
    },
    async newRem() {
      const rem = {
        id: v4(),
        text: ''
      }
      this.rems.push(rem)
      axios.post(`http://localhost:3000/rems/`, rem)
    },
    removeCurrentRem() {
      this.removeRem(this.rems[this.cursorLine])
    },
    removeRem(rem) {
      if (this.cursorLine === this.rems.length - 1) {
        this.moveUp()
      }
      this.rems = this.rems.filter(r => r.id != rem.id)
      axios.delete(`http://localhost:3000/rems/${rem.id}`)
    },
    isHighlighted(idx) {
      return idx === this.cursorLine || this.selectedLines.includes(idx)
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