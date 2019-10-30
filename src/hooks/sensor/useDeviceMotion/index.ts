import { reactive, onMounted, onUnmounted } from '@vue/composition-api'
import {
  checkBrowser,
  addEventListener,
  removeEventListener
} from '../../../utils'

export interface MotionState {
  acceleration: DeviceMotionEventAcceleration
  accelerationIncludingGravity: DeviceMotionEventAcceleration
  rotationRate: DeviceMotionEventRotationRate
  interval: number | null
}

const defaultState: MotionState = {
  acceleration: {
    x: null,
    y: null,
    z: null
  },
  accelerationIncludingGravity: {
    x: null,
    y: null,
    z: null
  },
  rotationRate: {
    alpha: null,
    beta: null,
    gamma: null
  },
  interval: 16
}

export default function useDeviceMotion(
  initialState: MotionState = defaultState
): MotionState {
  checkBrowser(useDeviceMotion.name)

  const state = reactive(initialState)
  let mounted = true

  const update = (event: Event) => {
    if (!mounted || !event) return
    const {
      acceleration,
      accelerationIncludingGravity,
      rotationRate,
      interval
    } = event as DeviceMotionEvent
    acceleration && (state.acceleration = acceleration)
    accelerationIncludingGravity &&
      (state.accelerationIncludingGravity = accelerationIncludingGravity)
    rotationRate && (state.rotationRate = rotationRate)
    interval && (state.interval = interval)
  }

  onMounted(() => addEventListener(window, 'devicemotion', update))

  onUnmounted(() => {
    mounted = false
    removeEventListener(window, 'devicemotion', update)
  })

  return state
}
