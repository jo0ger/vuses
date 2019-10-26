import { useCounter } from '../../../src'
import { warnPrefix } from '../../../src/utils'
import { renderHook } from '../../../src/utils/renderHook'
import { isRef } from '@vue/composition-api'

describe('state/useCounter', () => {
  it('should be exported', () => {
    expect(useCounter).toBeDefined()
  })

  renderHook(() => {
    it('should warn on unexpected inputs', () => {
      // tslint:disable-next-line: no-empty
      const warn = jest.spyOn(console, 'error').mockImplementation(() => {})

      // @ts-ignore
      useCounter(true)
      expect(warn.mock.calls[0][0]).toBe(
        warnPrefix + 'initialValue has to be a number or Ref, but got boolean'
      )

      // @ts-ignore
      useCounter(10, false)
      expect(warn.mock.calls[1][0]).toBe(
        warnPrefix + 'max has to be a number or Ref, but got boolean'
      )

      // @ts-ignore
      useCounter(10, 20, {})
      expect(warn.mock.calls[2][0]).toBe(
        warnPrefix + 'min has to be a number or Ref, but got object'
      )

      const [_, { set, inc, dec, reset }] = useCounter(10)
      // @ts-ignore
      set([])
      expect(warn.mock.calls[3][0]).toBe(
        warnPrefix + 'value has to be a number, but got object'
      )

      // @ts-ignore
      inc(() => false)
      expect(warn.mock.calls[4][0]).toBe(
        warnPrefix + 'delta has to be a number, but got function'
      )

      // @ts-ignore
      dec(true)
      expect(warn.mock.calls[5][0]).toBe(
        warnPrefix + 'delta has to be a number, but got boolean'
      )

      // @ts-ignore
      reset('')
      expect(warn.mock.calls[6][0]).toBe(
        warnPrefix + 'value has to be a number, but got string'
      )
    })

    it('should return [counter, actions]', () => {
      const [counter, actions] = useCounter(10)

      expect(counter.value).toBe(10)
      expect(actions).toStrictEqual({
        get: expect.any(Function),
        set: expect.any(Function),
        inc: expect.any(Function),
        dec: expect.any(Function),
        reset: expect.any(Function)
      })
    })

    it('should return a ref counter', () => {
      const [counter] = useCounter()
      expect(isRef(counter)).toBe(true)
    })

    it('should init counter to 0 if no initial value is received', () => {
      const [counter] = useCounter()
      expect(counter.value).toBe(0)
    })

    it('should unwrap initialValue, max and min', () => {
      const [initialValue, { set: setInitialValue }] = useCounter(5)
      const [max, { set: setMax }] = useCounter(10)
      const [min, { set: setMin }] = useCounter(1)
      const [counter, { set }] = useCounter(initialValue, max, min)

      expect(counter.value).toBe(5)

      setInitialValue(6)
      expect(counter.value).toBe(6)

      set(11)
      expect(counter.value).toBe(max.value)

      set(-1)
      expect(counter.value).toBe(min.value)

      setMax(11)
      set(11)
      expect(counter.value).toBe(max.value)

      setMin(-1)
      set(-1)
      expect(counter.value).toBe(min.value)
    })

    it('should get current counter', () => {
      const [counter, { get }] = useCounter(10)
      expect(get()).toBe(10)
    })

    it('should get current counter', () => {
      const [counter, { get }] = useCounter(10)
      expect(get()).toBe(10)
      expect(get()).toBe(counter.value)

      counter.value += 5
      expect(get()).toBe(15)
      expect(get()).toBe(counter.value)
    })

    it('should set to the value received', () => {
      const [counter, { set, get }] = useCounter(10)

      set(20)
      expect(counter.value).toBe(20)
      expect(get()).toBe(counter.value)
    })

    it('should increase by 1 if no delta value is received', () => {
      const [counter, { inc, get }] = useCounter(10)

      inc()
      expect(counter.value).toBe(11)
      expect(get()).toBe(counter.value)
    })

    it('should increase by the value received', () => {
      const [counter, { inc, get }] = useCounter(10)

      inc(100)
      expect(counter.value).toBe(110)
      expect(get()).toBe(counter.value)
    })

    it('should decrease by 1 if no delta value is received', () => {
      const [counter, { dec, get }] = useCounter(10)

      dec()
      expect(counter.value).toBe(9)
      expect(get()).toBe(counter.value)
    })

    it('should decrease by the value received', () => {
      const [counter, { dec, get }] = useCounter(10)

      dec(20)
      expect(counter.value).toBe(-10)
      expect(get()).toBe(counter.value)
    })

    it('should reset to original value if no value is received', () => {
      const [counter, { reset, set, get }] = useCounter(10)

      set(15)
      expect(counter.value).toBe(15)

      reset()
      expect(counter.value).toBe(10)
      expect(get()).toBe(counter.value)
    })

    it('should reset and set new original value', () => {
      const [counter, { reset, set, get }] = useCounter(10)

      set(15)
      expect(counter.value).toBe(15)

      reset(20)
      expect(counter.value).toBe(20)

      set(-1)
      expect(counter.value).toBe(-1)

      reset()
      expect(counter.value).toBe(20)
      expect(get()).toBe(counter.value)
    })

    it('should not be greater than max value', () => {
      const [counter, { reset, set, get, inc, dec }] = useCounter(10, 5)
      expect(counter.value).toBe(5)

      reset()
      expect(counter.value).toBe(5)

      set(20)
      expect(counter.value).toBe(5)

      set(4)
      expect(counter.value).toBe(4)

      inc()
      expect(counter.value).toBe(5)

      inc()
      expect(counter.value).toBe(5)

      dec()
      expect(counter.value).toBe(4)
      expect(get()).toBe(counter.value)
    })

    it('should not be smaller than min value', () => {
      const [counter, { reset, set, get, inc, dec }] = useCounter(10, null, 15)
      expect(counter.value).toBe(15)

      reset()
      expect(counter.value).toBe(15)

      set(12)
      expect(counter.value).toBe(15)

      set(16)
      expect(counter.value).toBe(16)

      dec()
      expect(counter.value).toBe(15)

      dec()
      expect(counter.value).toBe(15)

      inc()
      expect(counter.value).toBe(16)
      expect(get()).toBe(counter.value)
    })

    it('should not update value when new value is the same as the old value', () => {
      const [counter, { set }] = useCounter(10)
      expect(counter.value).toBe(10)

      set(12)
      expect(counter.value).toBe(12)

      set(12)
      expect(counter.value).toBe(12)

      set(16)
      expect(counter.value).toBe(16)

      set(16)
      expect(counter.value).toBe(16)
    })
  })
})
