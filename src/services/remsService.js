import apiClient from '@/services'

export default {
  fetchRems() {
    return apiClient({
      method: 'get',
      url: '/rems'
    })
  },
  updateRem(rem) {
    return apiClient({
      method: 'put',
      url: `/rems/${rem.id}`,
      data: rem
    })
  },
  addRem(rem) {
    return apiClient({
      method: 'post',
      url: '/rems/',
      data: rem
    })
  },
  deleteRem(rem) {
    return apiClient({
      method: 'delete',
      url: `/rems/${rem.id}`
    })
  }
}