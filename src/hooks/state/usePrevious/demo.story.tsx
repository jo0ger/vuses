import { storiesOf } from '@storybook/vue'
import { createComponent, reactive } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { usePrevious, useCounter } from '../../..'

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

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('State|usePrevious', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
