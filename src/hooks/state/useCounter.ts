import { ref } from '@vue/composition-api'
import { warn, isNumber } from '../../utils'

export interface CounterActions {
  get: () => number
  set: (value: number) => void
  inc: (delta?: number) => void
  dec: (delta?: number) => void
  reset: (value?: number) => void
}

export default function useCounter(
  initialValue: number = 0,
  max: number | null = null,
  min: number | null = null
) {
  !isNumber(initialValue) &&
    warn('initialValue has to be a number, but got ' + typeof initialValue)

  if (isNumber(max)) {
    initialValue = Math.min(initialValue, max)
  } else if (max !== null) {
    warn('max has to be a number, but got ' + typeof max)
  }

  if (isNumber(min)) {
    initialValue = Math.max(initialValue, min)
  } else if (min !== null) {
    warn('min has to be a number, but got ' + typeof min)
  }

  const counter = ref(initialValue)
  const get = () => counter.value
  const set = (value: number) => {
    if (!isNumber(value)) {
      warn('value has to be a number, but got ' + typeof value)
    }
    if (counter.value === value) return
    if (isNumber(min)) {
      value = Math.max(value, min)
    }
    if (isNumber(max)) {
      value = Math.min(value, max)
    }
    counter.value = value
  }
  const inc = (delta = 1) => {
    if (!isNumber(delta)) {
      warn('delta has to be a number, but got ' + typeof delta)
    } else {
      set(counter.value + delta)
    }
  }
  const dec = (delta = 1) => {
    if (!isNumber(delta)) {
      warn('delta has to be a number, but got ' + typeof delta)
    } else {
      set(counter.value - delta)
    }
  }
  const reset = (value: number = initialValue) => {
    set(value)
    initialValue = value
  }

  return [counter, { get, set, inc, dec, reset }] as [
    typeof counter,
    CounterActions
  ]
}
