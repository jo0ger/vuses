import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { createComponent, watch } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import { useTitle } from '../../..'

const print = () => action('document.title is ' + document.title)()
const Demo = createComponent({
  setup() {
    const [title, setTitle] = useTitle()
    watch(title, () => action('document.title is ' + document.title)())
    return { title, setTitle }
  },
  render() {
    const { title, setTitle } = this
    return (
      <div>
        <p>Please see "Actions" panel</p>
        <p>Title: {String(title)}</p>
        <button onClick={() => setTitle(Date.now())}>update title</button>
      </div>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Side Effect|useTitle', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
