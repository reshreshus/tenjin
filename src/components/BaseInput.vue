<template>
  <label
    :for="uuid"
    class="block text-sm"
  >
    {{ label }}
  </label>
  <input
    :id="uuid"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    class="p-2"
    :aria-describedby="error ? `error-${uuid}` : null"
  >
  <p
    v-if="error"
    class="text-red"
    :id="`error-${uuid}`"
    aria-live="assertive"
  >
    {{ error }}
  </p>
</template>

<script>
import UniqueID from '@/use/UniqueID.js'

export default {
  setup() {
    return {
      uuid: `input-${UniqueID().getID()}`
    }
  },
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="sass" scoped>
</style>