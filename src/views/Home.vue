<template>
  <div class="">
    <Suspense>
    <all-notes />
    <template #fallback>
      loading
    </template>
    </Suspense>
  </div>
</template>

<script>
import AllNotes from '@/modules/AllNotes'

export default {
  name: "Home",
  components: {
    AllNotes
  },
};
</script>
