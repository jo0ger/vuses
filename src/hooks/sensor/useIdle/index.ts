import { throttle } from 'throttle-debounce'
import { onMounted, onUnmounted, Ref } from '@vue/composition-api'
import {
  checkBrowser,
  removeEventListener,
  addEventListener
} from '../../../utils'
import { useBoolean } from '../../..'

const oneMinute = 60e3
const defaultEvents = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel'
]

export default function useIdle(
  // TODO Ref<number> and watch its changes
  delay: number = oneMinute,
  initialState: boolean = false,
  events: typeof defaultEvents = defaultEvents
): Ref<boolean> {
  checkBrowser(useIdle.name)

  const [state, toggle] = useBoolean(initialState)
  let mounted = true
  let timer: NodeJS.Timeout | null = null
  let localState: boolean = state.value

  const update = (val: boolean) => {
    if (!mounted) return
    toggle((localState = val))
  }

  const onEvent = throttle(50, () => {
    if (localState) {
      update(false)
    }

    timer && clearTimeout(timer)
    timer = setTimeout(() => update(true), delay)
  })

  const onVisibility = () => {
    if (!document.hidden) {
      onEvent()
    }
  }

  onMounted(() => {
    for (let i = 0; i < events.length; i++) {
      addEventListener(window, events[i], onEvent)
    }

    addEventListener(document, 'visibilitychange', onVisibility)
    timer = setTimeout(() => update(true), delay)
  })

  onUnmounted(() => {
    mounted = false
    for (let i = 0; i < events.length; i++) {
      removeEventListener(window, events[i], onEvent)
    }

    removeEventListener(document, 'visibilitychange', onVisibility)
  })

  return state
}
