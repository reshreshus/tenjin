<template>
  <div class="modal fixed bg-white dark:bg-deepblue-lighter shadow-2xl rounded z-10">
    <slot />
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="sass" scoped>
.modal
  left: 50%
  top: 50%
  transform: translate3d(-50%, -50%, 0)</style>