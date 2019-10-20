export const isArray = Array.isArray
export const isString = (val: any): val is string => typeof val === 'string'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isFunction = (val: any): val is Function =>
  typeof val === 'function'
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol'
export const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const warnPrefix = '[Vuses warn]: '

export const warn = (msg: string, ...args: any[]) => {
  console.error(warnPrefix + msg, ...args)
}
