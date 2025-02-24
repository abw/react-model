import { isArray, maybeFunction } from '@abw/badger-utils'
import { DebugOptions } from './types'

/**
 * Coerces a non-array value into a single element array.
 * @example
 * toArray(10)   // => [10]
 * @example
 * toArray([20]) // => [20]
 */
export const toArray= <T = unknown>(item: T) =>
  isArray(item)
    ? item
    : [item]

export function debugFunction(props: DebugOptions) {
  const debug  = props.debug
  const prefix = maybeFunction(props.debugPrefix, props)
  const color  = maybeFunction(props.debugColor, props)
  if (! debug)  { return () => { } }
  if (! prefix) { return console.log.bind(console) }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (format: string, ...args: any[]) => console.log(
    `%c${prefix}%c${format}`, `color: ${color}`, 'color:black',
    ...args
  )
}