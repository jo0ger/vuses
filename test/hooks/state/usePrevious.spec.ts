import { ref, reactive, isRef } from '@vue/composition-api'
import { usePrevious } from '../../../src'
import { renderHook } from '../../../src/utils/renderHook'
import Vue from 'vue'
import { warnPrefix } from '../../../src/utils'

describe('state/usePrevious', () => {
  it('should be exported', () => {
    expect(usePrevious).toBeDefined()
  })

  renderHook(() => {
    it('should return undefined on initial render', () => {
      const count = ref(0)
      const previous = usePrevious(count)

      expect(previous.value).toBeUndefined()
    })

    it('should return a ref value', () => {
      const count = ref(0)
      const previous = usePrevious(count)

      expect(isRef(previous)).toBeTruthy()
    })

    it('should warn on unexpected inputs', () => {
      // tslint:disable-next-line: no-empty
      const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
      // @ts-ignore
      usePrevious(0)
      expect(warn.mock.calls[0][0]).toBe(
        warnPrefix +
          'usePrevious requires input a parameter of ref or function type, but got number'
      )

      // @ts-ignore
      usePrevious()
      expect(warn.mock.calls[1][0]).toBe(
        warnPrefix +
          'usePrevious requires input a parameter of ref or function type, but got undefined'
      )
    })

    it('should always return previous state after each update', () => {
      const count = ref(0)
      const previous = usePrevious(count)

      expect(count.value).toBe(0)
      expect(previous.value).toBeUndefined()

      count.value++
      expect(count.value).toBe(1)
      expect(previous.value).toBe(0)

      count.value++
      expect(count.value).toBe(2)
      expect(previous.value).toBe(1)

      count.value--
      expect(count.value).toBe(1)
      expect(previous.value).toBe(2)

      const count2 = reactive({ num: 0 })
      const previous2 = usePrevious(() => count2.num)

      expect(count2.num).toBe(0)
      expect(previous2.value).toBeUndefined()

      count2.num++
      expect(count2.num).toBe(1)
      expect(previous2.value).toBe(0)

      count2.num++
      expect(count2.num).toBe(2)
      expect(previous2.value).toBe(1)

      count2.num--
      expect(count2.num).toBe(1)
      expect(previous2.value).toBe(2)
    })
  })
})
