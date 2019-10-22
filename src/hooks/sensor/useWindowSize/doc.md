# useWindowSize

Vue hooks that tracks `Widnow` dimensions

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useWindowSize } from 'vuses'

const Demo = createComponent({
  setup() {
    const { width, height } = useWindowSize()
    return { width, height }
  },
  render() {
    const { width, height } = this
    return (
      <div>
        <p>width: {width}px</p>
        <p>height: {height}px</p>
      </div>
    )
  }
})
```

## Reference

```typescript {2-3}
function useWindowSize(): {
  width: Ref<number>
  height: Ref<number>
}
```
