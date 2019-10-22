import { ref, onMounted, onUnmounted } from '@vue/composition-api'
import {
  checkBrowser,
  addEventListener,
  removeEventListener
} from '../../../utils'

export default function useWindowScroll() {
  checkBrowser(useWindowScroll.name)

  const x = ref(window.pageXOffset)
  const y = ref(window.pageYOffset)
  const update = () => {
    x.value = window.pageXOffset
    y.value = window.pageYOffset
  }

  onMounted(() =>
    addEventListener(window, 'scroll', update, {
      capture: false,
      passive: true
    })
  )
  onUnmounted(() => removeEventListener(window, 'scroll', update))

  return { x, y }
}
