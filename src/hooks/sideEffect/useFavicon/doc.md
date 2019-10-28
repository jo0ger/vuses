# useFavicon

Vue hook that sets favicon of the page

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useFavicon } from 'vuses'

const Demo = createComponent({
  setup() {
    const hrefs = reactive([
      'https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico',
      'https://b-gold-cdn.xitu.io/favicons/v2/apple-touch-icon.png'
    ])
    const [flag, { set }] = useNumber(0)
    const href = computed(() => hrefs[flag.value])
    useFavicon(href)

    const toggle = () => set(flag.value ^ 1)

    return { href, toggle }
  },
  render() {
    const { href, toggle } = this
    return (
      <NewTab>
        <div>
          <p>Favicon url: {href}</p>
          <button onClick={toggle}>toggle</button>
        </div>
      </NewTab>
    )
  }
})
```

## Reference

```typescript {2,3}
function useFavicon(href: string | Ref<string>)
```
