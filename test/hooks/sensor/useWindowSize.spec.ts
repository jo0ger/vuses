import { useWindowSize } from '../../../src'
import { renderHook } from '../../../src/utils/renderHook'

const useHook = () =>
  renderHook<{ width: number; height: number }>(() => useWindowSize())

enum ResizeType {
  width,
  height
}

function fireResize(type: ResizeType, value: number) {
  const handler = {
    // @ts-ignore
    [ResizeType.width]: () => (window.innerWidth = value),
    // @ts-ignore
    [ResizeType.height]: () => (window.innerHeight = value)
  }
  const trigger = handler[type]
  if (!trigger) return
  trigger()
  window.dispatchEvent(new Event('resize'))
}

describe('sensor/useWindowSize', () => {
  it('should be exported', () => {
    expect(useWindowSize).toBeDefined()
  })

  it('should update width', () => {
    const { vm } = useHook()
    fireResize(ResizeType.width, 320)
    expect(vm.width).toBe(320)

    fireResize(ResizeType.width, 640)
    expect(vm.width).toBe(640)
  })

  it('should update height', () => {
    const { vm } = useHook()
    fireResize(ResizeType.height, 320)
    expect(vm.height).toBe(320)

    fireResize(ResizeType.height, 640)
    expect(vm.height).toBe(640)
  })

  it('should remove the resize listener on unmount', () => {
    const { vm } = useHook()
    fireResize(ResizeType.width, 320)
    fireResize(ResizeType.height, 640)
    expect(vm.width).toBe(320)
    expect(vm.height).toBe(640)
    vm.$destroy()
    fireResize(ResizeType.width, 640)
    fireResize(ResizeType.height, 1280)
    expect(vm.width).toBe(320)
    expect(vm.height).toBe(640)
  })
})
