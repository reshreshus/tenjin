// import { onBeforeUnmount } from '@vue/runtime-core'
import hotkeys from 'hotkeys-js'

const useKeydown = (keyCombos) => {
  // const onKeydown = (e) => {
  //   // event.preventDefault()
  //   const kc = keyCombos.find(kc => kc.key === e.key)
  //   if (kc) {
  //     kc.fn()
  //   }
  //   // e.preventDefault()
  //   // e.stopPropagation()
  //   // console.log(e)
  // }
  // window.addEventListener('keypress', onKeydown)
  // onBeforeUnmount(() => {
  //   window.removeEventListener('keydown', onKeydown)
  // })

  hotkeys(Object.keys(keyCombos).join(), function(e, handler) {
    // console.log(handler.key)
    const fn = keyCombos[handler.key]
    if (fn) {
      fn(e)
    }
  })
}

export default useKeydown