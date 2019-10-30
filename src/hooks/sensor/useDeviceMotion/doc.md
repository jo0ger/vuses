# useDeviceMotion

Vue hook that tracks state of device's motion sensor.

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useDeviceMotion } from 'vuses'

const Demo = createComponent({
  setup() {
    const motion = useDeviceMotion()
    return { motion }
  },
  render() {
    const { motion } = this
    return <pre>{JSON.stringify(motion, null, 2)}</pre>
  }
})
```

## Reference

```typescript
interface MotionState {
  acceleration: DeviceMotionEventAcceleration
  accelerationIncludingGravity: DeviceMotionEventAcceleration
  rotationRate: DeviceMotionEventRotationRate
  interval: number | null
}

function useDeviceMotion(initialState: MotionState): MotionState
```
