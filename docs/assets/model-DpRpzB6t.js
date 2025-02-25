const n=`import { Model } from '@abw/badger-model'
import { useState } from 'react'

const Counter = ({
  initialCount,
  className
}) => {
  const [count, setCount] = useState(initialCount)

  return {
    count, setCount, className
  }
}

export const {
  Provider,
  Use: useCounter
} = Model(Counter)`;export{n as default};
