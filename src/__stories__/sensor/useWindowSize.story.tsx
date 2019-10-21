import 'vue-tsx-support/enable-check'
import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../components/Doc'
import { useWindowSize } from '../..'

const Demo = createComponent({
  setup () {
    const { width, height } = useWindowSize()
    return { width, height }
  },
  render () {
    const { width, height } = this
    return (
      <div>
        <p>width: { width }px</p>
        <p>height: { height }px</p>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('../../../docs/sensor/useWindowSize.md')}></Doc>

storiesOf('Sensor|useWindowSize', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
