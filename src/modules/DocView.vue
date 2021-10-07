<template>
  <div v-if="rem">
    <div v-if="rem.body" v-html="micromark(rem.body)" class="prose" />
  </div>
</template>

<script>
import { micromark } from 'micromark'

export default {
  setup () {

    return {
    }
  },
  props: {
    rem: {
      type: Object,
      default: null
    },
  },
  methods: {
    micromark
  },
}
</script>

<style lang="scss" scoped>

</style>