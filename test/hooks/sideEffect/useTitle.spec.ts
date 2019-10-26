import Vue, { renderHook } from '../../../src/utils/renderHook'
import { useTitle } from '../../../src'
import { Ref, ref } from '@vue/composition-api'

const useHook = (t?: string | Ref<string>) =>
  renderHook<{
    title: string
    setTitle: (val: string) => void
  }>(() => {
    const [title, setTitle] = useTitle(t)
    return { title, setTitle }
  })

describe('sideEffect/useTitle', () => {
  it('should be exported', () => {
    expect(useTitle).toBeDefined()
  })

  it('should init value to current page title if no initial value is received', () => {
    const pageTitle = document.title
    const { vm } = useHook()
    expect(vm.title).toBe(pageTitle)
  })

  it('should set value to initial value if initial value is a ref value', () => {
    const title = ref('title')
    const { vm } = useHook(title)
    expect(vm.title).toBe(title.value)

    title.value = 'title2'
    expect(vm.title).toBe(title.value)
  })

  it('should update page title', () => {
    renderHook(async () => {
      const [title, setTitle] = useTitle('test')
      await Vue.nextTick()
      expect(document.title).toBe('test')
      expect(title.value).toBe(document.title)

      setTitle('test2')
      await Vue.nextTick()
      expect(document.title).toBe('test2')
      expect(title.value).toBe(document.title)

      setTitle('test3')
      await Vue.nextTick()
      expect(document.title).toBe('test3')
      expect(title.value).toBe(document.title)
    })
  })
})
