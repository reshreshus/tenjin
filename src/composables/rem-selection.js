import { reactive } from 'vue'

const rems = reactive(new Set())

export default function() {
  return {
    rems,
    toggle(rem) {
      if (rems.has(rem)) {
        rems.delete(rem)
      } else {
        rems.add(rem)
      }
    },
    clear() {
      rems.clear()
    },
    addMultiple(newRems) {
      newRems.forEach(r => rems.add(r))
    }
  }
}