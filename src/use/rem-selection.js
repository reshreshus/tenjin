import { reactive } from 'vue'

const rems = reactive(new Set())

export default function() {
  const bulkAction = (fn) => {
    console.log('bulkAction');
    rems.forEach(r => {
      fn(r)
    })
  }
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
    bulkAction,
    addMultiple(newRems) {
      newRems.forEach(r => rems.add(r))
    },
    archive: () => {
      console.log('archive');
      bulkAction(r => r.archived = true)
    }
  }
}