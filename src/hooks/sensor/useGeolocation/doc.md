# useGeolocation

Vue hook that tracks geo location state of user's device.

This hook accepts [position options](https://developer.mozilla.org/docs/Web/API/PositionOptions).

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useGeolocation } from 'vuses'

const Demo = createComponent({
  setup() {
    const geo = useGeolocation()
    return { geo }
  },
  render() {
    const { geo } = this
    return <pre>geo: {JSON.stringify(geo, null, 2)}</pre>
  }
})
```

## Reference

```typescript
interface GeoLocationSensorState {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: Error | PositionError
}

function useGeolocation(options?: PositionOptions): GeoLocationSensorState
```
