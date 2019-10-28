import { storiesOf } from '@storybook/vue'
import {
  createComponent,
  reactive,
  computed,
  onMounted
} from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useMouse } from '../../..'

const Demo = createComponent({
  setup(_, ctx) {
    const state = useMouse(() => (ctx as any).refs.container as HTMLElement)
    return { state }
  },
  render() {
    const { state } = this
    const { docX, docY, posX, posY, elX, elY, elW, elH } = state
    return (
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <div>
          Mouse position in document - x:{docX} y:{docY}
        </div>
        <div>
          Mouse position in element - x:{elX} y:{elY}
        </div>
        <div>
          Element position- x:{posX} y:{posY}
        </div>
        <div>
          Element dimensions - {elW}x{elH}
        </div>
        <br />
        <br />
        <div
          ref="container"
          style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            backgroundColor: 'whitesmoke'
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: `${state.elX}px`,
              top: `${state.elY}px`,
              pointerEvents: 'none',
              transform: 'scale(4)'
            }}
          >
            🐭
          </span>
        </div>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useMouse', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
