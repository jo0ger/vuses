# useToggle

Vue hook that tracks state of a boolean

> [`useBoolean`](./?path=/story/state-useBoolean--docs) is an alias for `useToggle`

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useToggle } from 'vuses'

const Demo = createComponent({
  setup() {
    const [state, toggle] = useToggle(false)
    return { state, toggle }
  },
  render() {
    const { state, toggle } = this
    return (
      <div>
        <div>{state ? 'ON' : 'OFF'}</div>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => toggle(true)}>set ON</button>
        <button onClick={() => toggle(false)}>set OFF</button>
      </div>
    )
  }
})
```

## Reference

```typescript {2-3}
function useToggle(
  initialValue: boolean = false
): [Ref<boolean>, (value?: unknown) => void]
```
