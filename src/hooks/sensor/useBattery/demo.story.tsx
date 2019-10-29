import { storiesOf } from '@storybook/vue'
import { createComponent } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useBattery } from '../../..'

const Demo = createComponent({
  setup() {
    const battery = useBattery()
    return { battery }
  },
  render() {
    const { battery } = this

    if (!battery.isSupported) {
      return (
        <div>
          <strong>Battery sensor</strong>: <span>not supported</span>
        </div>
      )
    }

    if (!battery.fetched) {
      return (
        <div>
          <strong>Battery sensor</strong>: <span>supported</span> <br />
          <strong>Battery state</strong>: <span>fetching</span>
        </div>
      )
    }

    return (
      <div>
        <strong>Battery sensor</strong>:&nbsp;&nbsp; <span>supported</span>{' '}
        <br />
        <strong>Battery state</strong>: <span>fetched</span> <br />
        <strong>Charge level</strong>:&nbsp;&nbsp;{' '}
        <span>{(battery.level * 100).toFixed(0)}%</span> <br />
        <strong>Charging</strong>:&nbsp;&nbsp;{' '}
        <span>{battery.charging ? 'yes' : 'no'}</span> <br />
        <strong>Charging time</strong>:&nbsp;&nbsp;
        <span>
          {battery.chargingTime ? battery.chargingTime : 'finished'}
        </span>{' '}
        <br />
        <strong>Discharging time</strong>:&nbsp;&nbsp;{' '}
        <span>{battery.dischargingTime}</span>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useBattery', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
