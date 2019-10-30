import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useMedia, useWindowSize } from '../../..'

const Demo = createComponent({
  setup() {
    const isWide = useMedia('(min-width: 480px)')
    const { width } = useWindowSize()
    return { isWide, width }
  },
  render() {
    const { isWide, width } = this
    return (
      <div>
        <p>width: {width}px</p>
        <p>Screen is wide(min-width: 480px): {isWide ? 'Yes' : 'No'}</p>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useMedia', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
