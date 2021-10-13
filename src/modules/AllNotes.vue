<template>
  <div class="mt-20 w-[90%] mx-auto pl-5">
    <div class="flex items-end">
      <div class="text-5xl">
        All notes
      </div>
      <button @click="modalOpen = true" class="ml-1 p-1 bg-gray rounded">
        Info
      </button>
    </div>
    <rems-view-header class="mt-4" />
    <!-- Rems -->
    <div class="mt-10">
      <Suspense>
        <template #default>
          <div class="flex">
            <!-- <pane class="w-[300px] border-r"/> -->
            <pane active class="w-[500px] border-r"/>
            <!-- <pane class="w-[800px]"/> -->
          </div>
        </template>
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
import RemsViewHeader from '@/components/RemsViewHeader.vue'
import ModalView from '@/components/ModalView'
import Pane from '@/modules/Pane'
import { mapState } from 'vuex'

export default {
  components: {
    RemsViewHeader,
    ModalView,
    Pane,
  },
  data() {
    return {
      modalOpen: false,
    }
  },

  computed: {
    ...mapState(['rems']),
  }
}
</script>

<style lang="sass" scoped>
</style>