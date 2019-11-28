import { useDebounce } from '../../../src'
import { ref } from '@vue/composition-api'
import Vue, { renderHook } from '../../../src/utils/renderHook'

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
    const foo = ref(0)
    const bar = ref(0)
    const fn = () => {
      bar.value++
    }
    useDebounce(fn, 5, [foo])
    foo.value++
    expect(bar.value).toBe(0)
    await Vue.nextTick()
    jest.advanceTimersByTime(5)
    expect(bar.value).toBe(1)
  })

  it('should get the actual state of debounce', async () => {
    const foo = ref(0)
    const bar = ref(0)
    const fn = () => {
      bar.value++
    }
    const [isReady, clear] = useDebounce(fn, 5, [foo])
    expect(isReady.value).toBe(false)
    foo.value++
    await Vue.nextTick()
    clear()
    expect(isReady.value).toBe(null)
    foo.value++
    await Vue.nextTick()
    jest.advanceTimersByTime(5)
    expect(isReady.value).toBe(true)
  })

  it('should be terminated updates', async () => {
    const foo = ref(0)
    const bar = ref(0)
    const fn = () => {
      bar.value++
    }
    const [, clear] = useDebounce(fn, 5, [foo])
    foo.value++
    expect(bar.value).toBe(0)
    await Vue.nextTick()
    clear()
    jest.advanceTimersByTime(5)
    expect(bar.value).toBe(0)
  })
})
