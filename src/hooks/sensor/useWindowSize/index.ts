import { ref, onMounted, onUnmounted } from '@vue/composition-api'
import {
  checkBrowser,
  addEventListener,
  removeEventListener
} from '../../../utils'

export default function useWindowSize() {
  checkBrowser(useWindowSize.name)

  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => addEventListener(window, 'resize', update))
  onUnmounted(() => removeEventListener(window, 'resize', update))

  return { width, height }
}
