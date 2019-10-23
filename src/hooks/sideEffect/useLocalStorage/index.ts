import { checkBrowser, noop, isString } from '../../../utils'
import { Ref, computed, ref } from '@vue/composition-api'

export default function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [Ref<T>, (val: T) => void] {
  if (!checkBrowser(useLocalStorage.name)) {
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
        const value = localStorage.getItem(key)
        if (!isString(value)) {
          localStorage.setItem(key, format(initialValue))
          return initialValue
        } else {
          return raw ? value : JSON.parse(value || 'null')
        }
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. JSON.parse and JSON.stringify
        // can throw, too.
        return initialValue
      }
    },
    set(val: T) {
      try {
        localStorage.setItem(key, format(val))
        flag.value++
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. JSON.parse and JSON.stringify
        // can throw, too.
      }
    }
  })

  const update = (val: T) => {
    state.value = val
  }

  return [state, update]
}
