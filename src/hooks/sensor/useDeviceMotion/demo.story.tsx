import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useDeviceMotion } from '../../..'

const Demo = createComponent({
  setup() {
    const motion = useDeviceMotion()
    return { motion }
  },
  render() {
    const { motion } = this
    return <pre>{JSON.stringify(motion, null, 2)}</pre>
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useDeviceMotion', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
