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
    <div class="">
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

export default {
  components: {
    RemView,
    ModalView,
  },
  data() {
    return {
      modalOpen: false
    }
  },
}
</script>

<style lang="sass" scoped>
</style>