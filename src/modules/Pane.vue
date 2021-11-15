<template>
  <div>
    <rem-view :rem-id="remId" />
  </div>
</template>

<script>
import RemView from '@/modules/RemView'

export default {
  props: {
    remId: {
      type: [String, Number],
      required: true
    },
  },
  components: {
    RemView,
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>