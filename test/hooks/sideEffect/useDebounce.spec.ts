import { useDebounce } from '../../../src'
import { ref } from '@vue/composition-api'
import Vue, { renderHook } from '../../../src/utils/renderHook'

const useHook = () =>
  renderHook(() => {
    const foo = ref(0)
    const bar = ref(0)
    const fn = () => {
      bar.value++
    }
    const [isReady, clear] = useDebounce(fn, 5, [foo])
    return {
      isReady,
      clear,
      bar,
      foo
    }
  })

describe('sideEffect/useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should be exported', () => {
    expect(useDebounce).toBeDefined()
  })

  it('should be delayed updates', async () => {
    const { vm } = useHook()
    vm.foo++
    expect(vm.bar).toBe(0)
    await Vue.nextTick()
    jest.advanceTimersByTime(5)
    expect(vm.bar).toBe(1)
  })

  it('should get the actual state of debounce', async () => {
    const { vm } = useHook()
    expect(vm.isReady).toBe(false)
    vm.foo++
    await Vue.nextTick()
    vm.clear()
    expect(vm.isReady).toBe(null)
    vm.foo++
    await Vue.nextTick()
    jest.advanceTimersByTime(5)
    expect(vm.isReady).toBe(true)
  })

  it('should be terminated updates', async () => {
    const { vm } = useHook()
    vm.foo++
    expect(vm.bar).toBe(0)
    await Vue.nextTick()
    vm.clear()
    jest.advanceTimersByTime(5)
    expect(vm.bar).toBe(0)
  })

  it('should be cleared debounce when unmounted', async () => {
    const { vm } = useHook()
    vm.foo++
    expect(vm.isReady).toBe(false)
    await Vue.nextTick()
    vm.$destroy()
    expect(vm.isReady).toBe(null)
  })
})
