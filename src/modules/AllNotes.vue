<template>
  <div class="mt-20 w-[90%] mx-auto pl-5">
    <div class="flex items-end">
      <div class="text-5xl">
        All notes
      </div>
      <button @click="modalOpen = true" class="ml-1 p-1 bg-gray rounded">
        Info
      </button>
    </div>
    <rems-view-header class="mt-4" />
    <!-- Rems -->
    <div class="mt-10">
      <!-- <Suspense> -->
        <!-- <template #default> -->
          <div class="flex">
            <!-- <pane class="w-[300px] border-r"/> -->
            <pane :rem-control="parentRem" class="w-[300px] border-r"/>
            <pane :rem-control="mainRem" class="w-[500px] border-r"/>
            <!-- <pane :rem-control="childRem" class="w-[800px] border-r"/> -->
          </div>
        <!-- </template> -->
        <!-- <template #fallback>
          <div class="h-full text-center flex items-center">
            Loading
          </div>
        </template> -->
      <!-- </Suspense> -->
    </div>
    <modal-view v-if="modalOpen"  @close-modal="modalOpen = false" />
  </div>
</template>

<script>
import RemsViewHeader from '@/components/RemsViewHeader.vue'
import ModalView from '@/components/ModalView'
import Pane from '@/modules/Pane'
// import { mapState } from 'vuex'
// import { onErrorCaptured } from 'vue'
// import { useRouter } from 'vue-router'
import useRems from '@/use/rem.js'
import useRemStore from '@/use/rem-store.js'
import useKeydown from '@/use/keydown'

export default {
  components: {
    RemsViewHeader,
    ModalView,
    Pane,
  },
  async setup() {
    const remStore = useRemStore()
    if (remStore.rems.value.length === 0) {
      await remStore.fetchRems()
    }
    // const router = useRouter()

    // TODO: this doesn't make sense anymore now that I use Rems here
    // onErrorCaptured((error) => {
    //   router.push({
    //     name:  'ErrorDisplay',
    //     params: { error }
    //   })
    // })
    const parentRem = await useRems('-1')
    const mainRem = await useRems(parentRem.currentRem.value.id)
    const childRem = await useRems(mainRem.currentRem.value.id)
    console.log('initial ids' , '-1', parentRem.currentRem.value.id, mainRem.currentRem.value.id)

    const shiftRight = async () => {
      const parentId = parentRem.currentRem.value.id
      const mainId = mainRem.currentRem.value.id
      if (!childRem.currentRem.value) {
        childRem.newRem()
      }
      const childId = childRem.currentRem.value.id
      console.log('ids', parentId, mainId, childId)
      parentRem.init(parentId)
      console.log('parent rem', parentRem)
      mainRem.init(mainId)
      childRem.init(childId)
    }

    useKeydown({
      k: mainRem.moveUp,
      j: mainRem.moveDown,
      l: shiftRight,
      d: mainRem.deleteCurrentRem,
      i: (el) => mainRem.insertModeRem({ el, command: 'i'}),
      a: (el) => mainRem.insertModeRem({ el, command: 'a'}),
      space: mainRem.selectCurrentRem,
      esc: (e) => {
        e.preventDefault()
        mainRem.setNormalMode()
      },
    })


    return {
      parentRem,
      mainRem,
      childRem,
    }
  },
  data() {
    return {
      modalOpen: false,
    }
  },

  computed: {
    // ...mapState(['rems']),
  },
  methods: {
  },
}
</script>

<style lang="sass" scoped>
</style>