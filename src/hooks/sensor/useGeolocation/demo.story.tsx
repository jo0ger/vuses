import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useGeolocation } from '../../..'

const Demo = createComponent({
  setup() {
    const geo = useGeolocation()
    return { geo }
  },
  render() {
    const { geo } = this
    return <pre>geo: {JSON.stringify(geo, null, 2)}</pre>
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useGeolocation', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
