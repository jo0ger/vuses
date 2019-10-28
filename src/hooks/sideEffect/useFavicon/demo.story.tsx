import { storiesOf } from '@storybook/vue'
import { createComponent, reactive, computed } from '@vue/composition-api'
import Doc from '../../../__stories__/components/Doc'
import NewTab from '../../../__stories__/components/NewTab'
import { useFavicon, useNumber } from '../../..'

const Demo = createComponent({
  setup() {
    const hrefs = reactive([
      'https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico',
      'https://b-gold-cdn.xitu.io/favicons/v2/apple-touch-icon.png'
    ])
    const [flag, { set }] = useNumber(0)
    const href = computed(() => hrefs[flag.value])
    useFavicon(href)
    const toggle = () => set(flag.value ^ 1)
    return { href, toggle }
  },
  render() {
    const { href, toggle } = this
    return (
      <NewTab>
        <div ref="aaa">
          <p>Favicon url: {href}</p>
          <button onClick={toggle}>toggle</button>
        </div>
      </NewTab>
    )
  }
})

const Docs = () => <Doc md={require('./doc.md')}></Doc>

storiesOf('Side Effect|useFavicon', module)
  .add('Docs', () => Docs as any)
  .add('Demo', () => Demo)
