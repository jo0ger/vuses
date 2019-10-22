# usePrevious

Vue hook that returns the previous state

## Usage

```jsx
const Demo = createComponent({
  setup() {
    const [count, { inc, dec }] = useCounter(0)
    const previous = usePrevious(count)

    return {
      count,
      inc,
      dec,
      previous
    }
  },
  render() {
    const { count, inc, dec, previous } = this
    return (
      <div>
        <div>now: {count}</div>
        <div>before: {String(previous)}</div>
        <button onClick={() => inc(1)}>+</button>
        <button onClick={() => dec(1)}>-</button>
      </div>
    )
  }
})
```

## Reference

```typescript {2-3}
function usePrevious<T>(state: Ref<T> | (() => T)): Ref<T | undefined>
```
