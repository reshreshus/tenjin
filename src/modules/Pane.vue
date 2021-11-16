<template>
  <div>
    <rem-view :rem-control="remControl" />
  </div>
</template>

<script>
import RemView from '@/modules/RemView'

export default {
  props: {
    // remId: {
    //   type: [String, Number],
    //   required: true
    // },
    remControl: {
      type: Object,
      required: true
    }
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