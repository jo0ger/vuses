# useWindowSize

Vue hook that tracks `Window` scroll position

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useWindowScroll } from 'vuses'

const Demo = createComponent({
  setup() {
    const { x, y } = useWindowScroll()
    return { x, y }
  },
  render() {
    const { x, y } = this
    return (
      <div style={{ width: '200vw', height: '200vh' }}>
        <div style={{ position: 'fixed', top: 10, left: 10 }}>
          <p>x: {x}px</p>
          <p>y: {y}px</p>
        </div>
      </div>
    )
  }
})
```

## Reference

```typescript {2-3}
function useWindowScroll(): {
  x: Ref<number>
  y: Ref<number>
}
```
