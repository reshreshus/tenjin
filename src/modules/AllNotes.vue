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
      <div v-for="(rem, idx) in currentRems" :key="idx" class="relative">
        <div class="absolute -left-4 top-4 w-2 h-2 bg-black rounded-full" />
        <div
          class="text-xl p-2"
          :class="{'bg-gray': rem.selected }"
          @click="rem.selected = !rem.selected"
        >
          {{ rem.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rems: [
          {
            text: 'VimNote',
            selected: true,
            archived: false,
          },
          {
            text: 'With macros and shit',
            selected: false,
            archived: false,
          },
          {
            text: 'This is archived',
            selected: false,
            archived: true,
          }
        ]
      }
    },
    computed: {
      currentRems() {
        return this.rems.filter(r => !r.archived)
      }
    },
  }
</script>

<style lang="sass" scoped>
</style>