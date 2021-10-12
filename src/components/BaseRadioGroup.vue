<template>
  <div class="space-x-2">
    <base-radio
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :label="option.label"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [Number, String],
      required: true
    },
  },
}
</script>

<style lang="sass" scoped>
</style>