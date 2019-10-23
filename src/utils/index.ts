import { isRef, Ref } from '@vue/composition-api'

export const isBrowser = typeof window === 'object'

// tslint:disable-next-line: no-empty
export const noop = () => {}

export const isArray = Array.isArray
export const isString = (val: any): val is string => typeof val === 'string'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isFunction = (val: any): val is Function =>
  typeof val === 'function'
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol'
export const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

export const warnPrefix = '[Vuses warn]: '

export const warn = (msg: string, ...args: any[]) =>
  console.error(warnPrefix + msg, ...args)

export const unwrap = <T>(target: T | Ref<T>): T =>
  isRef<T>(target) ? target.value : target

export const checkBrowser = (ctx = '') => {
  !isBrowser && warn(ctx + ' requires a browser environment')
  return isBrowser
}

export const addEventListener = (
  el: Element | Window,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
) => {
  el.addEventListener(event, handler, options)
}

export const removeEventListener = (
  el: Element | Window,
  event: string,
  handler: EventListener,
  options?: EventListenerOptions
) => {
  el.removeEventListener(event, handler, options)
}
