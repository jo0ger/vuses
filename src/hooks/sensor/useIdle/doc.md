# useIdle

Vue hook that tracks if user on the page is idle.

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useIdle, useNumber } from 'vuses'

const Demo = createComponent({
  setup() {
    const [delay] = useNumber(3e3)
    const isIdle = useIdle(delay.value)
    return { isIdle, delay }
  },
  render() {
    const { isIdle, delay } = this
    return (
      <div>
        Idle delay ms: {delay} ms
        <div>User is idle: {isIdle ? 'Yes' : 'No'}</div>
      </div>
    )
  }
})
```

## Reference

```typescript {5-7}
const oneMinute = 60e3
const defaultEvents = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel'
]

function useIdle(
  delay: number = oneMinute,
  initialState: boolean = false,
  events: typeof defaultEvents = defaultEvents
): Ref<boolean>
```

## TODO

- `delay` supports `Ref<number>`, and watches its changes
