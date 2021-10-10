import { mount } from '@vue/test-utils'
import RemView from '@/modules/RemView'

describe('RemView', () => {
  test('There is at least one rem in RemView', () => {
    const view = mount(RemView)
    expect(view.find('.rem').isVisible()).toBe(true)
  })
})
