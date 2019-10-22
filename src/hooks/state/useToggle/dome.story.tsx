import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useToggle } from '../../..'

const Demo = createComponent({
  setup() {
    const [state, toggle] = useToggle()
    return { state, toggle }
  },
  render() {
    const { state, toggle } = this
    return (
      <div>
        <div>{state ? 'ON' : 'OFF'}</div>
        <button onClick={toggle}>Toggle</button>
        <button onClick={() => toggle(true)}>set ON</button>
        <button onClick={() => toggle(false)}>set OFF</button>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('State|useToggle', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
