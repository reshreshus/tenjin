<template>
  <div v-if="rem">
    <!-- Controls -->
    <div class="flex space-x-2">
      <button class="bg-gray p-1 rounded" @click="removeRem"> Remove </button>
      <button class="bg-gray p-1 rounded" @click="archiveRem"> {{ rem.archived ? 'unarchive' : 'archive' }} </button>
    </div>
    <div v-if="rem.body" v-html="micromark(rem.body)" class="prose" />
  </div>
</template>

<script>
import { micromark } from 'micromark';

export default {
  setup(props, { emit }) {
    const archiveRem = () => emit('change-rem', { archive: true })
    const removeRem = () => emit('change-rem', { remove: true })
    return {
      archiveRem,
      removeRem
    };
  },
  props: {
    rem: {
      type: Object,
      default: null,
    },
  },
  methods: {
    micromark,
  },
}
</script>

<style lang="sass" scoped>
</style>
