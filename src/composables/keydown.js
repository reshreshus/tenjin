import { onBeforeUnmount } from '@vue/runtime-core'

const useKeydown = (keyCombos) => {
  const onKeydown = (e) => {
    // event.preventDefault()
    const kc = keyCombos.find(kc => kc.key === e.key)
    if (kc) {
      kc.fn()
    }
    // e.preventDefault()
    // e.stopPropagation()
    // console.log(e)
  }
  window.addEventListener('keydown', onKeydown)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
}

export default useKeydown