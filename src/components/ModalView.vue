<template>
  <div class="modal w-20 h-20 fixed bg-gray dark:bg-deepblue-lighter shadow-2xl rounded z-10">
    <slot />
    <button class="" @click="emit('closeModal')">
      Close
    </button>
  </div>
</template>

<script>
import useKeydown from '@/use/keydown'

  export default {
    setup(props, { emit }) {
      useKeydown([{
        key: 'Escape',
        fn: () => emit('closeModal')
      }])
      return {
        emit
      }
    }
  }
</script>

<style lang="sass" scoped>
.modal
  left: 50%
  top: 50%
  transform: translate3d(-50%, -50%, 0)</style>