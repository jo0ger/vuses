import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useIdle, useNumber } from '../../..'

const Demo = createComponent({
  setup() {
    const [delay] = useNumber(3e3)
    const isIdle = useIdle(delay.value)
    return { isIdle, delay }
  },
  render() {
    const { isIdle, delay } = this
    return (
      <div>
        Idle delay ms: {delay} ms
        <div>User is idle: {isIdle ? 'Yes' : 'No'}</div>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useIdle', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
