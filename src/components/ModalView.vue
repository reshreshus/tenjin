<template>
  <div class="modal w-20 h-20 fixed bg-gray dark:bg-deepblue-lighter shadow-2xl rounded z-10">
    <slot />
    <button class="" @click="emit('closeModal')">
      Close
    </button>
  </div>
</template>

<script>
import { onBeforeUnmount } from '@vue/runtime-core'

  export default {
    setup(props, { emit }) {
      const onKeydown = (event) => {
        console.log(event.key)
        if (event.key === 'Escape') {
          emit('closeModal')
        }
      }
      window.addEventListener('keydown', onKeydown)

      onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeydown)
      })
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