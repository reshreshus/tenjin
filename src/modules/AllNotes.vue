<template>
  <div class="mt-20 w-[1000px] mx-auto pl-5">
    <div class="text-5xl">
      All notes
    </div>
    <!-- Header -->
    <div class="">
      <!-- Ok no header -->
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
  </div>
</template>

<script>
import RemView from '@/modules/RemView'

export default {
  components: {
    RemView,
  },
}
</script>

<style lang="sass" scoped>
</style>