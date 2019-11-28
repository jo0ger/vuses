import { watch, Ref, ref, computed } from '@vue/composition-api'

type WatcherSource<T> = Ref<T> | (() => T)

export default function useDebounce(
  fn: Function,
  ms: number = 0,
  deps: WatcherSource<unknown>[]
): [Ref<boolean | null>, () => void] {
  let timer: NodeJS.Timeout | null = null

  const ready = ref<boolean | null>(false)

  const isReady = computed(() => {
    return ready.value
  })

  const update = () => {
    ready.value = false
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      ready.value = true
      fn()
    }, ms)
  }

  const clear = () => {
    ready.value = null
    timer && clearTimeout(timer)
  }

  watch(deps, update, {
    lazy: true
  })

  return [isReady, clear]
}
