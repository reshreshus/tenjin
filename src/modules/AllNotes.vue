<template>
  <div class="mt-20 w-[1000px] mx-auto pl-5">
    <div class="flex items-end">
      <div class="text-5xl">
        All notes
      </div>
      <button @click="modalOpen = true" class="ml-1 p-1 bg-gray rounded">
        Info
      </button>
    </div>
    <!-- Header -->
    <div class="mt-4 flex items-center">
      <input type="checkbox" :checked="allRemsSelected" @click="selectAllRems" />
      <div class="ml-4 text-xl ">
        Selected <span class="text-blue">{{ remsSelectedSize }}</span> rems
      </div>
    </div>
    <!-- Rems -->
    <div class="mt-10">
      <Suspense>
        <rem-view />
        <template #fallback>
          <div class="h-full text-center flex items-center">
            Loading
          </div>
        </template>
      </Suspense>
    </div>
    <modal-view v-if="modalOpen"  @close-modal="modalOpen = false" />
  </div>
</template>

<script>
import ModalView from '@/components/ModalView'
import RemView from '@/modules/RemView'
import useRemSelection from '@/composables/rem-selection.js'
import { computed } from 'vue'
import { mapState } from 'vuex'

export default {
  components: {
    RemView,
    ModalView,
  },
  setup() {
    const remSelection = useRemSelection()
    const remsSelectedSize = computed(() => remSelection.rems.size )
    return {
      remSelection,
      remsSelectedSize
    }
  },
  data() {
    return {
      modalOpen: false,
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
    }
  },

  computed: {
    ...mapState(['rems']),
    allRemsSelected() {
      return this.remsSelectedSize === this.rems.length
    }
  },
}
</script>

<style lang="sass" scoped>
</style>