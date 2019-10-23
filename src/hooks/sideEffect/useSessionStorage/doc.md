# useSessionStorage

Vue hook that manages a value in `sessionStorage`

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useSessionStorage } from 'vuses'

const Demo = createComponent({
  setup() {
    const [count, setValue] =
      useSessionStorage < number > ('useSessionStorage-key', 0)
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
function useSessionStorage<T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [Ref<T>, (val: T) => void]
```

### Arguments

- `key`: `sessionStorage` key to manage
- `initialValue`: initial value to set, if value in `sessionStorage` is empty
- `raw`: boolean, if set to `true`, hook will not attempt to JSON serialize stored values
