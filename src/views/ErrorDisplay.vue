<template>
  <div class="flex flex-col items-center justify-center min-h-[100vh]">
    <h4>Oops! There was an error:</h4>
    <p class="text-red">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>