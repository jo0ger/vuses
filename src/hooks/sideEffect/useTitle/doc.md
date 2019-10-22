# useTitle

Vue hook that sets title of the page

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useTitle } from 'vuses'

const Demo = createComponent({
  setup() {
    const [title, setTitle] = useTitle()
    watch(title, () => action('document.title is ' + document.title)())
    return { title, setTitle }
  },
  render() {
    const { title, setTitle } = this
    return (
      <div>
        <p>Please see "Actions" panel</p>
        <p>Title: {String(title)}</p>
        <button onClick={() => setTitle(Date.now())}>update title</button>
      </div>
    )
  }
})
```

## Reference

```typescript {2,3}
function useTitle(
  title?: string | Ref<string>
): [Ref<string>, (val: string) => void]
```
