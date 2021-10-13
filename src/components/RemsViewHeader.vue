<template>
  <div class="flex items-center">
    <input type="checkbox" :checked="allRemsSelected" @click="selectAllRems" />
    <div class="ml-4 text-xl ">
      Selected <span class="text-blue">{{ remsSelectedSize }}</span> rems
    </div>
    <button
      class="ml-1 p-1 bg-gray rounded"
      :disabled="[...remSelection.rems].every(rem => rem.archived)"
      :class="{'opacity-70 cursor-not-allowed': [...remSelection.rems].every(rem => rem.archived)}"
      @click="archiveAll"
    >
        Archive
    </button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { computed } from 'vue'
import useRemSelection from '@/composables/rem-selection.js'

export default {
  setup() {
    const remSelection = useRemSelection()
    const remsSelectedSize = computed(() => remSelection.rems.size )
    return {
      remSelection,
      remsSelectedSize
    }
  },
  computed: {
    ...mapState(['rems']),
    allRemsSelected() {
      return this.remsSelectedSize === this.rems.length
    }
  },
  methods: {
    selectAllRems() {
      if (this.remsSelectedSize === this.rems.length) {
        console.log('clear');
        this.remSelection.clear()
      } else {
        this.remSelection.addMultiple(this.rems)
      }
    },
    archiveAll() {
      console.log('archiveAll');
      this.remSelection.archive()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>