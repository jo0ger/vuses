import { ref, Ref, watch, isRef } from '@vue/composition-api'
import { isFunction, warn } from '../../../utils'

export default function usePrevious<T>(
  state: Ref<T> | (() => T)
): Ref<T | undefined> {
  const checked = isRef(state) || isFunction(state)
  if (!checked) {
    warn(
      'usePrevious requires input a parameter of ref or function type, but got ' +
        typeof state
    )
  }

  const previous = ref<T>()

  if (checked) {
    watch(state, (_, oldValue) => {
      previous.value = oldValue
    })
  }

  return previous
}
