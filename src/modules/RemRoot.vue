<template>
  <div>

  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  async setup() {
    const { data: rems } = await axios.get('http://localhost:3000/rems')
    return {
      rems: ref(rems)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>