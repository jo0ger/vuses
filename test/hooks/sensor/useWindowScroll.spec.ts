import { renderHook } from '../../../src/utils/renderHook'
import { useWindowScroll } from '../../../src'

const useHook = () =>
  renderHook<{ x: number; y: number }>(() => useWindowScroll())

enum ScrollType {
  x,
  y
}

function fireScroll(type: ScrollType, value: number) {
  const handler = {
    // @ts-ignore
    [ScrollType.x]: () => (window.pageXOffset = value),
    // @ts-ignore
    [ScrollType.y]: () => (window.pageYOffset = value)
  }
  const trigger = handler[type]
  if (!trigger) return
  trigger()
  window.dispatchEvent(new Event('scroll'))
}

describe('sensor/useWindowScroll', () => {
  it('should be exported', () => {
    expect(useWindowScroll).toBeDefined()
  })

  it('should update x', () => {
    const { vm } = useHook()
    fireScroll(ScrollType.x, 1)
    expect(vm.x).toBe(1)

    fireScroll(ScrollType.x, 2)
    expect(vm.x).toBe(2)
  })

  it('should update y', () => {
    const { vm } = useHook()
    fireScroll(ScrollType.y, 1)
    expect(vm.y).toBe(1)

    fireScroll(ScrollType.y, 2)
    expect(vm.y).toBe(2)
  })

  it('should remove the scroll listener on unmount', () => {
    const { vm } = useHook()
    fireScroll(ScrollType.x, 1)
    fireScroll(ScrollType.y, 2)
    expect(vm.x).toBe(1)
    expect(vm.y).toBe(2)
    vm.$destroy()
    fireScroll(ScrollType.x, 2)
    fireScroll(ScrollType.y, 3)
    expect(vm.x).toBe(1)
    expect(vm.y).toBe(2)
  })
})
