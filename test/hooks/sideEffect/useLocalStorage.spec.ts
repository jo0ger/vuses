import { isRef } from '@vue/composition-api'
import { useLocalStorage } from '../../../src'
import Vue, { renderHook } from '../../../src/utils/renderHook'

const getKey = () => String(Date.now() + Math.random())
const mockLocalStorage = () => {
  const storage = localStorage
  const localStorageMock = (function() {
    return {
      getItem(key: string) {
        return storage.getItem(key)
      },
      setItem(_key: string, _value: any) {
        throw new Error('mock error')
      },
      removeItem(key: string) {
        return storage.removeItem(key)
      }
    }
  })()
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
}

describe('sideEffect/useLocalStorage', () => {
  it('should be exported', () => {
    expect(useLocalStorage).toBeDefined()
  })

  renderHook(() => {
    it('should return [Ref<T>, setValue]', () => {
      renderHook(() => {
        const [state, setValue] = useLocalStorage(getKey())

        expect(isRef(state)).toBeTruthy()
        expect(typeof setValue).toBe('function')
      })
    })

    it('should set to initial value if value in localStorage is empty', () => {
      const key = getKey()
      const [state] = useLocalStorage(key, '111')
      expect(localStorage.getItem(key)).toBe('"111"')
      expect(state.value).toBe('111')

      const key2 = getKey()
      const [state1] = useLocalStorage(key2, { name: '111' })
      expect(localStorage.getItem(key2)).toBe('{"name":"111"}')
      expect(state1.value).toStrictEqual({
        name: expect.any(String)
      })
    })

    it('should return storage value if value in localStorage is not empty', () => {
      const key = getKey()
      localStorage.setItem(key, '111')
      const [state] = useLocalStorage(key, '222')
      expect(localStorage.getItem(key)).toBe('111')
      expect(state.value).toBe(111)
    })

    it('should return original value if raw paramter is true', () => {
      const key = getKey()
      const [state] = useLocalStorage(key, '222', true)
      expect(localStorage.getItem(key)).toBe('222')
      expect(state.value).toBe('222')
    })

    it('should return initial value if error occurred', () => {
      mockLocalStorage()
      const key = getKey()
      const [state] = useLocalStorage(key, '222')
      expect(localStorage.getItem(key)).toBe(null)
      expect(state.value).toBe('222')
    })
  })

  it('should update storage value', () => {
    renderHook(async () => {
      const key = getKey()
      const [state, update] = useLocalStorage(key, 222)

      expect(localStorage.getItem(key)).toBe('222')
      expect(state.value).toBe(222)

      update(111)
      await Vue.nextTick()
      expect(localStorage.getItem(key)).toBe('111')
      expect(state.value).toBe(111)

      update('foo')
      await Vue.nextTick()
      expect(localStorage.getItem(key)).toBe('"foo"')
      expect(state.value).toBe('foo')
    })
  })
})
