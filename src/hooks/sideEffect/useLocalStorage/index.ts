import { checkBrowser, noop, isString } from '../../../utils'
import { Ref, ref, watch } from '@vue/composition-api'

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  raw?: boolean
) {
  return getStorageComputedState<T>(localStorage, key, initialValue, raw)
}

// TODO optimize
export function getStorageComputedState<T>(
  storage: Storage,
  key: string,
  initialValue?: T,
  raw?: boolean
): [Ref<T>, (val: any) => void] {
  if (
    !checkBrowser(
      storage === localStorage ? 'useLocalStorage' : 'useSessionStorage'
    )
  ) {
    return [ref(initialValue), noop]
  }

  const format = raw ? String : JSON.stringify
  const getInitialValue = () => {
    try {
      const value = storage.getItem(key)
      if (!isString(value)) {
        storage.setItem(key, format(initialValue))
        return initialValue
      } else {
        return raw ? value : JSON.parse(value || 'null')
      }
    } catch {
      // If user is in private mode or has storage restriction
      // storage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue
    }
  }

  const state = ref(getInitialValue())

  watch(state, val => {
    try {
      storage.setItem(key, format(val))
    } catch {
      // If user is in private mode or has storage restriction
      // storage can throw. JSON.parse and JSON.stringify
      // can throw, too.
    }
  })

  const update = (val: any) => {
    state.value = val
  }

  return [state, update]
}
