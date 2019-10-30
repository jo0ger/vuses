import { Ref, ref, onMounted, onUnmounted } from '@vue/composition-api'
import { isFunction } from '../../../utils'

export type IntersectionState = IntersectionObserverEntry | null

export default function useIntersection(
  elem: HTMLElement | (() => HTMLElement),
  options: IntersectionObserverInit
): Ref<IntersectionState> {
  const getElem = isFunction(elem) ? elem : () => elem
  const state = ref<IntersectionState>(null)
  let observer: IntersectionObserver | null = null

  const handler = (entries: IntersectionObserverEntry[]) => {
    state.value = entries[0]
  }

  onMounted(() => {
    const el = getElem()
    if (!el) return

    observer = new IntersectionObserver(handler, options)
    observer.observe(el)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return state
}
