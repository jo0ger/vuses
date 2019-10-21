import { ref, Ref } from '@vue/composition-api'
import { isBoolean } from '../../../utils'

export default function useToggle(
  initialValue: boolean = false
): [Ref<boolean>, (value?: unknown) => void] {
  const state = ref(initialValue)
  const toggle = (value?: unknown) => {
    if (isBoolean(value)) {
      state.value = value
    } else {
      state.value = !state.value
    }
  }

  return [state, toggle]
}
