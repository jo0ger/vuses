import { isRef } from '@vue/composition-api'
import { useSessionStorage } from '../../../src'
import Vue, { renderHook } from '../../../src/utils/renderHook'

const getKey = () => String(Date.now() + Math.random())

describe('sideEffect/useSessionStorage', () => {
  it('should be exported', () => {
    expect(useSessionStorage).toBeDefined()
  })

  renderHook(() => {
    it('should return [Ref<T>, setValue]', () => {
      renderHook(() => {
        const [state, setValue] = useSessionStorage(getKey())

        expect(isRef(state)).toBeTruthy()
        expect(typeof setValue).toBe('function')
      })
    })

    it('should set to initial value if value in sessionStorage is empty', () => {
      const key = getKey()
      const [state] = useSessionStorage(key, '111')
      expect(sessionStorage.getItem(key)).toBe('"111"')
      expect(state.value).toBe('111')

      const key2 = getKey()
      const [state1] = useSessionStorage(key2, { name: '111' })
      expect(sessionStorage.getItem(key2)).toBe('{"name":"111"}')
      expect(state1.value).toStrictEqual({
        name: expect.any(String)
      })
    })

    it('should return storage value if value in sessionStorage is not empty', () => {
      const key = getKey()
      sessionStorage.setItem(key, '111')
      const [state] = useSessionStorage(key, '222')
      expect(sessionStorage.getItem(key)).toBe('111')
      expect(state.value).toBe(111)
    })

    it('should return original value if raw paramter is true', () => {
      const key = getKey()
      const [state] = useSessionStorage(key, '222', true)
      expect(sessionStorage.getItem(key)).toBe('222')
      expect(state.value).toBe('222')
    })
  })

  it('should update storage value', () => {
    renderHook(async () => {
      const key = getKey()
      const [state, setValue] = useSessionStorage(key, 222)

      expect(sessionStorage.getItem(key)).toBe('222')
      expect(state.value).toBe(222)

      setValue(111)
      await Vue.nextTick()
      expect(sessionStorage.getItem(key)).toBe('111')
      expect(state.value).toBe(111)

      setValue('foo')
      await Vue.nextTick()
      expect(sessionStorage.getItem(key)).toBe('"foo"')
      expect(state.value).toBe('foo')
    })
  })
})
