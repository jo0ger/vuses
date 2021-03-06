import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useNumber } from '../../..'

const Demo = createComponent({
  setup() {
    const [min, { inc: incMin, dec: decMin }] = useNumber(1)
    const [max, { inc: incMax, dec: decMax }] = useNumber(10)
    const [count, { inc, dec, set, reset }] = useNumber(5, max, min)
    return {
      min,
      incMin,
      decMin,
      max,
      incMax,
      decMax,
      count,
      inc,
      dec,
      set,
      reset
    }
  },
  render() {
    const {
      min,
      incMin,
      decMin,
      max,
      incMax,
      decMax,
      count,
      inc,
      dec,
      set,
      reset
    } = this
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

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('State|useNumber', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
