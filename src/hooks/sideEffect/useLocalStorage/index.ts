import { checkBrowser, noop, isString } from '../../../utils'
import { Ref, computed, ref } from '@vue/composition-api'

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  raw?: boolean
) {
  return getStorageComputedState<T>(localStorage, key, initialValue, raw)
}

export function getStorageComputedState<T>(
  storage: Storage,
  key: string,
  initialValue?: T,
  raw?: boolean
): [Ref<T>, (val: T) => void] {
  if (
    !checkBrowser(
      storage === localStorage ? 'useLocalStorage' : 'useSessionStorage'
    )
  ) {
    return [ref(initialValue), noop]
  }

  const format = raw ? String : JSON.stringify
  const flag = ref(0)

  // TODO use effect in Vue3
  const state = computed({
    get() {
      // tslint:disable-next-line: no-unused-expression
      flag.value
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
    },
    set(val: T) {
      try {
        storage.setItem(key, format(val))
        flag.value++
      } catch {
        // If user is in private mode or has storage restriction
        // storage can throw. JSON.parse and JSON.stringify
        // can throw, too.
      }
    }
  })

  const update = (val: T) => {
    state.value = val
  }

  return [state, update]
}
