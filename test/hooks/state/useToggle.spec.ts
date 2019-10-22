import { renderHook } from '../../../src/utils/renderHook'
import { useToggle } from '../../../src'

describe('state/useToggle', () => {
  it('should be exported', () => {
    expect(useToggle).toBeDefined()
  })

  renderHook(() => {
    it('should return [state, toggle]', () => {
      const [state, toggle] = useToggle(true)

      expect(state.value).toBe(true)
      expect(typeof toggle).toBe('function')
    })

    it('should init state to false if no initial value is received', () => {
      const [state] = useToggle()
      expect(state.value).toBe(false)
    })

    it('should init state to initial value', () => {
      const [state1] = useToggle(false)
      expect(state1.value).toBe(false)

      const [state2] = useToggle(true)
      expect(state2.value).toBe(true)
    })

    it('should set state to the received value', () => {
      const [state1, toggle1] = useToggle(false)
      expect(state1.value).toBe(false)

      toggle1(true)
      expect(state1.value).toBe(true)

      toggle1(true)
      expect(state1.value).toBe(true)

      const [state2, toggle2] = useToggle(true)
      expect(state2.value).toBe(true)

      toggle2(false)
      expect(state2.value).toBe(false)

      toggle2(false)
      expect(state2.value).toBe(false)
    })

    it('should toggle state', () => {
      const [state, toggle] = useToggle(false)
      expect(state.value).toBe(false)

      toggle()
      expect(state.value).toBe(true)

      toggle()
      expect(state.value).toBe(false)
    })

    it('should ignore non-boolean parameters and toggle state', () => {
      const [state, toggle] = useToggle(true)

      toggle('string')
      expect(state.value).toBe(false)

      toggle({})
      expect(state.value).toBe(true)

      toggle(() => false)
      expect(state.value).toBe(false)
    })
  })
})
