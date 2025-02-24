import Model from '@/lib/Model'
/* START */
// PRETEND: import { Model } from '@abw/react-context'
import { useState } from 'react'
import { ConsumerProps, ProviderProps } from './types'

const Counter = ({
  initialCount=0,
}) => {
  const [count, setCount] = useState(initialCount)
  const inc = (n=1) => setCount(count + n)
  const dec = (n=1) => setCount(count - n)

  return {
    count, setCount, inc, dec
  }
}

export const {
  Provider,
  Consumer,
  Use: useCounter
} = Model<ProviderProps, ConsumerProps>(Counter)
