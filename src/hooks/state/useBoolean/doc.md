# useBoolean

Vue hooks that tracks state of a boolean

> `useBoolean` is an alias for [`useToggle`](./?path=/story/state-usetoggle--docs)

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useBoolean } from 'vuses'

const Demo = createComponent({
  setup() {
    const [state, toggle] = useBoolean()
    return { state, toggle }
  },
  render() {
    const { state, toggle } = this
    return (
      <div>
        <div>{state}</div>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => toggle(true)}>set true</button>
        <button onClick={() => toggle(false)}>set false</button>
      </div>
    )
  }
})
```

## Reference

```typescript {2-3}
function useBoolean(
  initialValue: boolean = false
): [Ref<boolean>, (value?: unknown) => void]
```
