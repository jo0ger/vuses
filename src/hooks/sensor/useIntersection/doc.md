# useIntersection

Vue hook that tracks the changes in the intersection of a target element with an ancestor element or with a top-level document's viewport. Uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and returns a [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).

> Browser environment is required

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useIntersection } from 'vuses'

const Spacer = () => (
  <div
    style={{
      width: '200px',
      height: '300px',
      backgroundColor: 'whitesmoke',
    }}
  />
)

const Demo = createComponent({
  setup(_, ctx) {
    const intersection = useIntersection(() => (ctx as any).refs.tracker as HTMLElement, {
      root: null,
      rootMargin: '0px',
      threshold: 1
    })
    return { intersection }
  },
  render() {
    const { intersection } = this
    return (
      <div
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
          overflow: 'scroll',
        }}
      >
        Scroll me
        <Spacer />
        <div
          ref="tracker"
          style={{
            width: '100px',
            height: '100px',
            padding: '20px',
            backgroundColor: 'palegreen',
          }}
        >
          {intersection && intersection.intersectionRatio < 1 ? 'Obscured' : 'Fully in view'}
        </div>
        <Spacer />
      </div>
    )
  }
})
```

## Reference

```typescript {4-6}
type IntersectionState = IntersectionObserverEntry | null

function useIntersection(
  elem: HTMLElement | (() => HTMLElement),
  options: IntersectionObserverInit
): Ref<IntersectionState>
```
