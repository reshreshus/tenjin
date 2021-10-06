<template>
  <div>
    <div v-for="(rem, idx) in currentRems" :key="idx" class="relative">
      <div class="absolute -left-4 top-4 w-4 h-4 cursor-pointer" @click="openRem(rem)" >
        <div class="w-2 h-2 bg-black rounded-full" />
      </div>
      <div
        class="text-xl p-2"
        :class="{'bg-gray': rem.selected }"
        @click="selectRem(rem)"
      >
        {{ rem.text }}
        <div v-if="rem.opened && rem.body" v-html="micromark(rem.body)" class="prose" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { micromark } from 'micromark'

export default {
  components: {
  },
  async setup() {
    const { data: rems } = await axios.get('http://localhost:3000/rems')
    return {
      rems: ref(rems)
    }
  },
  computed: {
    currentRems() {
      return this.rems.filter(r => !r.archived)
    }
  },
  methods: {
    selectRem(rem) {
      rem.selected = !rem.selected
      this.updateRem(rem)
    },
    openRem(rem) {
      rem.opened = !rem.opened
    },
    updateRem(rem) {
      axios.put(`http://localhost:3000/rems/${rem.id}`, rem)
    },
    micromark
  },
}
</script>

<style lang="sass" scoped>
</style>