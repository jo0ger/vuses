import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useMediaDevices } from '../../..'

const Demo = createComponent({
  setup() {
    const devices = useMediaDevices()
    return { devices }
  },
  render() {
    const { devices } = this
    return <pre>{JSON.stringify(devices, null, 2)}</pre>
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useMediaDevices', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
