# useTitle

Vue hook to query permission status for browser APIs

> Browser environment is required

> [MDN Permissions Api](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions)

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useTitle } from 'vuses'

const Demo = createComponent({
  setup() {
    const permission = usePermission({ name: 'microphone' })
    return { permission }
  },
  render() {
    const { permission } = this
    return <div>{JSON.stringify(permission, null, 2)}</div>
  }
})
```

## Reference

```typescript {10-11}
type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor

type State = PermissionState | ''

function usePermission(permissionDesc: PermissionDesc): Ref<State>
```
