<template>
  <div class="block">
    <input
      :id="uuid"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelBalue', $event.target.checked)"
    >
    <label
      :for="uuid"
      class="ml-2"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
import UniqueID from '@/use/UniqueID.js'

export default {
  setup() {
    return {
      uuid: `radio-${UniqueID().getID()}`
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="sass" scoped>
</style>