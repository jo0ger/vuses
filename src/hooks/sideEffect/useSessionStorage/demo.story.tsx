import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useSessionStorage } from '../../..'

const Demo = createComponent({
  setup() {
    const [count, setValue] = useSessionStorage<number>(
      'useSessionStorage-key',
      0
    )
    const inc = () => setValue(count.value + 1)
    const dec = () => setValue(count.value - 1)
    return { count, inc, dec }
  },
  render() {
    const { count, inc, dec } = this
    return (
      <div>
        <div>Value: {String(count)}</div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Side Effect|useSessionStorage', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
