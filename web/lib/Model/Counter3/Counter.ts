import Model from '@/lib/Model'
/* START */
// PRETEND: import { Model } from '@abw/react-context'
import { useState } from 'react'

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
  Children,
  Use: useCounter
} = Model(Counter)
