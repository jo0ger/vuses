# useMedia

Vue hook that tracks state of a CSS media query.

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useMouse } from 'vuses'

const Demo = createComponent({
  setup() {
    const isWide = useMedia('(min-width: 480px)')
    return { isWide }
  },
  render() {
    const { isWide } = this
    return <div>Screen is wide(min-width: 480px): {isWide ? 'Yes' : 'No'}</div>
  }
})
```

## Reference

```typescript
function useMedia(query: string): Ref<boolean>
```
