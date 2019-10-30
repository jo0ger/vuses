# useMediaDevices

Vue hook that tracks connected hardware devices.

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useMediaDevices } from 'vuses'

const Demo = createComponent({
  setup() {
    const devices = useMediaDevices()
    return { devices }
  },
  render() {
    const { devices } = this
    return <pre>{JSON.stringify(devices, null, 2)}</pre>
  }
})
```

## Reference

```typescript
function useMediaDevices(): Partial<MediaDeviceInfo>[]
```
