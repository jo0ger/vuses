import { storiesOf } from '@storybook/vue'
import { createComponent, ref } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useDebounce } from '../../..'

const Demo = createComponent({
  setup() {
    const count = ref(0)
    const value = ref(0)
    const handleInput = () => {
      count.value++
    }
    const [isReady, clear] = useDebounce(
      () => {
        value.value++
      },
      2000,
      [count]
    )
    return {
      handleInput,
      count,
      value,
      clear,
      isReady
    }
  },
  render() {
    const { handleInput, count, value, clear, isReady } = this
    return (
      <div>
        <input onInput={handleInput} type="text" />
        <p>count: {count}</p>
        <p>value（Update after 2 seconds）: {value}</p>
        <p>debounce state: {isReady + ''}</p>
        <button onClick={() => clear()}>Stop updating value</button>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Sensor|useDebounce', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
