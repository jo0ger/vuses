import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useWindowScroll } from '../../..'

const Demo = createComponent({
  setup() {
    const { x, y } = useWindowScroll()
    return { x, y }
  },
  render() {
    const { x, y } = this
    return (
      <div style={{ width: '200vw', height: '200vh' }}>
        <div style={{ position: 'fixed', top: 10, left: 10 }}>
          <p>x: {x}px</p>
          <p>y: {y}px</p>
        </div>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useWindowScroll', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
