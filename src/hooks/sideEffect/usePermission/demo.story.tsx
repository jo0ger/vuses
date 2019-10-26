import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { usePermission } from '../../..'

const Demo = createComponent({
  setup() {
    const microphonePermission = usePermission({ name: 'microphone' })
    const geolocationPermission = usePermission({ name: 'geolocation' })
    const pushPermission = usePermission({
      name: 'push',
      userVisibleOnly: true
    })
    return { microphonePermission, geolocationPermission, pushPermission }
  },
  render() {
    const { microphonePermission, geolocationPermission, pushPermission } = this
    return (
      <div>
        <p>microphone: {JSON.stringify(microphonePermission, null, 2)}</p>
        <p>geolocation: {JSON.stringify(geolocationPermission, null, 2)}</p>
        <p>push: {JSON.stringify(pushPermission, null, 2)}</p>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Side Effect|usePermission', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
