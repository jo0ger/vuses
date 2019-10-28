# useMouse

Vue hook that tracks state of mouse position.

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useMouse } from 'vuses'

const Demo = createComponent({
  setup(_, ctx) {
    const state = useMouse(() => (ctx as any).refs.container as HTMLElement)
    return { state }
  },
  render() {
    const { state } = this
    const { docX, docY, posX, posY, elX, elY, elW, elH } = this.state
    return (
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <div>Mouse position in document - x:{docX} y:{docY}</div>
        <div>Mouse position in element - x:{elX} y:{elY}</div>
        <div>Element position- x:{posX} y:{posY}</div>
        <div>Element dimensions - {elW}x{elH}</div>
      </div>
    )
  }
})
```

## Reference

```typescript {2-9,12}
interface MousePosition {
  docX: number
  docY: number
  posX: number
  posY: number
  elX: number
  elY: number
  elH: number
  elW: number
}

function useMouse(elem: HTMLElement | (() => HTMLElement)): MousePosition
```
