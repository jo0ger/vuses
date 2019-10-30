import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api'
import {
  checkBrowser,
  addEventListener,
  removeEventListener
} from '../../../utils'

export default function useMedia(query: string): Ref<boolean> {
  checkBrowser(useMedia.name)

  const state = ref(window.matchMedia(query).matches)
  let mounted = true
  let mql: MediaQueryList = window.matchMedia(query)

  const update = () => {
    if (!mounted) return
    state.value = !!mql.matches
  }

  onMounted(() => {
    update()
    addEventListener(mql, 'change', update)
  })

  onUnmounted(() => {
    mounted = false
    removeEventListener(mql, 'change', update)
  })

  return state
}
