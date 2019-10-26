// State Hooks
export { default as useCounter } from './hooks/state/useCounter'
export { default as useNumber } from './hooks/state/useNumber'
export { default as useToggle } from './hooks/state/useToggle'
export { default as useBoolean } from './hooks/state/useBoolean'
export { default as usePrevious } from './hooks/state/usePrevious'

// Sensor Hooks
export { default as useWindowSize } from './hooks/sensor/useWindowSize'
export { default as useWindowScroll } from './hooks/sensor/useWindowScroll'
export { default as useGeolocation } from './hooks/sensor/useGeolocation'

// Side Effect Hooks
export { default as useTitle } from './hooks/sideEffect/useTitle'
export { default as useLocalStorage } from './hooks/sideEffect/useLocalStorage'
export {
  default as useSessionStorage
} from './hooks/sideEffect/useSessionStorage'
export { default as usePermission } from './hooks/sideEffect/usePermission'
