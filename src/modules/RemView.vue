<template>
  <div class="flex w-full">
    <div class="w-full">
      <!-- {{ remSelection.rems }} -->
      <!-- {{ cursorLine }} <br>
      {{ currentRem }} -->
      <!-- {{ childrem }} -->
      <div
        v-for="(rem, idx) in childrem" :key="idx"
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
        </div>
      </div>
    </div>
    <!-- <doc-view :rem="currentRem" @change-rem="changeRem" class="ml-2" /> -->
  </div>
</template>

<script>
import { micromark } from 'micromark'
import useRems from '@/use/rem'

export default {
  components: {
    // DocView
  },
  props: {
    remId: {
      type: [String, Number],
      required: true
    },
  },
  async setup(props) {
    const remsControl = useRems(props.remId)
    return {
      ...remsControl
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