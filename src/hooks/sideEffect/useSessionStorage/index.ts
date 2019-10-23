import { getStorageComputedState } from '../useLocalStorage'

export default function useSessionStorage<T>(
  key: string,
  initialValue?: T,
  raw?: boolean
) {
  return getStorageComputedState<T>(sessionStorage, key, initialValue, raw)
}
