import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useNetwork } from '../../..'

const Demo = createComponent({
  setup() {
    const network = useNetwork()
    return { network }
  },
  render() {
    const { network } = this
    return <pre>{JSON.stringify(network, null, 2)}</pre>
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useNetwork', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
