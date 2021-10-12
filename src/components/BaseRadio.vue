<template>
  <input
    :id="uuid"
    type="radio"
    :checked="modelValue === value"
    :value="value"
    @change="$emit('update:modelBalue', value)"
    v-bind="$attrs"
  >
  <label
    class="ml-2"
    :for="uuid"
  >
    {{ label }}
  </label>
</template>

<script>
import UniqueID from '@/composables/UniqueID.js'

export default {
  setup() {
    return {
      uuid: `radio-${UniqueID().getID()}`
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [Number, String],
      default: ''
    },
    value: {
      type: [Number, String],
      required: true
    }
  },
}
</script>