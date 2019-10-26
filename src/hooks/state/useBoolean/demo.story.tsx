import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useBoolean } from '../../..'

const Demo = createComponent({
  setup() {
    const [state, toggle] = useBoolean()
    return { state, toggle }
  },
  render() {
    const { state, toggle } = this
    return (
      <div>
        <div>{state ? 'ON' : 'OFF'}</div>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => toggle(true)}>set true</button>
        <button onClick={() => toggle(false)}>set false</button>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('State|useBoolean', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
