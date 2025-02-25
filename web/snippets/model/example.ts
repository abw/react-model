import { Model } from '@abw/react-model'
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
  Use: useCounter
} = Model(Counter)