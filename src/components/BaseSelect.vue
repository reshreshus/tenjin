<template>
  <label
    :for="uuid"
    class="block"
  >
    {{ label }}
  </label>
  <select
    :id="uuid"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: (e) => $emit('update:modelValue', e.target.value)
      }"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :selected="option === modelValue"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
import UniqueID from '@/composables/UniqueID.js'

export default {
  setup() {
    return {
      uuid: `select-${UniqueID().getID()}`
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="sass" scoped>
</style>