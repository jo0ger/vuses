import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useIntersection } from '../../..'

const Spacer = () => (
  <div
    style={{
      width: '200px',
      height: '300px',
      backgroundColor: 'whitesmoke'
    }}
  />
)

const Demo = createComponent({
  setup(_, ctx) {
    const intersection = useIntersection(
      () => (ctx as any).refs.tracker as HTMLElement,
      {
        root: null,
        rootMargin: '0px',
        threshold: 1
      }
    )
    return { intersection }
  },
  render() {
    const { intersection } = this
    return (
      <div
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
          overflow: 'scroll'
        }}
      >
        Scroll me
        <Spacer />
        <div
          ref="tracker"
          style={{
            width: '100px',
            height: '100px',
            padding: '20px',
            backgroundColor: 'palegreen'
          }}
        >
          {intersection && intersection.intersectionRatio < 1
            ? 'Obscured'
            : 'Fully in view'}
        </div>
        <Spacer />
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useIntersection', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
