import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useMedia } from '../../..'

const Demo = createComponent({
  setup() {
    const isWide = useMedia('(min-width: 480px)')
    return { isWide }
  },
  render() {
    const { isWide } = this
    return <div>Screen is wide(min-width: 480px): {isWide ? 'Yes' : 'No'}</div>
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useMedia', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
