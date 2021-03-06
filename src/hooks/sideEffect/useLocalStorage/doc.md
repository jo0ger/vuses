# useLocalStorage

Vue hook that manages a value in `localStorage`

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useLocalStorage } from 'vuses'

const Demo = createComponent({
  setup() {
    const [count, setValue] =
      useLocalStorage < number > ('useLocalStorage-key', 0)
    const inc = () => setValue(count.value + 1)
    const dec = () => setValue(count.value - 1)
    return { count, inc, dec }
  },
  render() {
    const { count, inc, dec } = this
    return (
      <div>
        <div>Value: {String(count)}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </div>
    )
  }
})
```

## Reference

```typescript {2,3}
function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [Ref<T>, (val: T) => void]
```

### Arguments

- `key`: `localStorage` key to manage
- `initialValue`: initial value to set, if value in `localStorage` is empty
- `raw`: boolean, if set to `true`, hook will not attempt to JSON serialize stored values
