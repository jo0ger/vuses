# useNumber

Vue hook that tracks state of a number

> `useNumber` is an alias for [`useCounter`](./?path=/story/state-usecounter--docs)

## Usage

```jsx
import { createComponent } from '@vue/composition-api'
import { useNumber } from 'vuses'

const Demo = createComponent({
  setup () {
    const [min, { inc: incMin, dec: decMin }] = useNumber(1)
    const [max, { inc: incMax, dec: decMax }] = useNumber(10)
    const [count, { inc, dec, set, reset }] = useNumber(5, max, min)
    return { min, incMin, decMin, max, incMax, decMax, count, inc, dec, set, reset }
  },
  render (this: any) {
    const { min, incMin, decMin, max, incMax, decMax, count, inc, dec, set, reset } = this
    return (
      <div>
        <div>
          current: {count} [min: {min}; max: {max}]
        </div>
        <br />
        Current value: <button onClick={() => inc()}>Increment</button>
        <button onClick={() => dec()}>Decrement</button>
        <button onClick={() => inc(5)}>Increment (+5)</button>
        <button onClick={() => dec(5)}>Decrement (-5)</button>
        <button onClick={() => set(100)}>Set 100</button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => reset(25)}>Reset (25)</button>
        <br />
        <br />
        Min value:
        <button onClick={() => incMin()}>Increment</button>
        <button onClick={() => decMin()}>Decrement</button>
        <br />
        <br />
        Max value:
        <button onClick={() => incMax()}>Increment</button>
        <button onClick={() => decMax()}>Decrement</button>
      </div>
    )
  }
})
```

## Reference

```typescript {8-12}
function useNumber(
  initialValue: number | Ref<number> = 0,
  max: number | Ref<number> | null = null,
  min: number | Ref<number> | null = null
): [
  Ref<number>,
  {
    get: () => number
    set: (value: number) => void
    inc: (delta?: number) => void
    dec: (delta?: number) => void
    reset: (value?: number) => void
  }
]
```
