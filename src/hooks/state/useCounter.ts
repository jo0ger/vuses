import { ref, Ref, isRef } from '@vue/composition-api'
import { warn, isNumber, unwrap } from '../../utils'

export interface CounterActions {
  get: () => number
  set: (value: number) => void
  inc: (delta?: number) => void
  dec: (delta?: number) => void
  reset: (value?: number) => void
}

export default function useCounter(
  initialValue: number | Ref<number> = 0,
  max: number | Ref<number> | null = null,
  min: number | Ref<number> | null = null
) {
  let value = unwrap(initialValue)
  !isNumber(value) &&
    warn(
      'initialValue has to be a number or Ref, but got ' + typeof initialValue
    )

  const initialMin = unwrap(min)
  const initialMax = unwrap(max)

  if (isNumber(initialMax)) {
    value = Math.min(value, initialMax)
  } else if (initialMax !== null) {
    warn('max has to be a number or Ref, but got ' + typeof initialMax)
  }

  if (isNumber(initialMin)) {
    value = Math.max(value, initialMin)
  } else if (initialMin !== null) {
    warn('min has to be a number or Ref, but got ' + typeof initialMin)
  }

  const counter = isRef(initialValue) ? initialValue : ref(value)
  const get = () => counter.value
  const set = (value: number) => {
    if (!isNumber(value)) {
      warn('value has to be a number, but got ' + typeof value)
    }
    if (counter.value === value) return
    const minValue = unwrap(min)
    const maxValue = unwrap(max)
    if (isNumber(minValue)) {
      value = Math.max(value, minValue)
    }
    if (isNumber(maxValue)) {
      value = Math.min(value, maxValue)
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
  const reset = (value: number = unwrap(initialValue)) => {
    set(value)
    initialValue = value
  }

  return [counter, { get, set, inc, dec, reset }] as [
    typeof counter,
    CounterActions
  ]
}
