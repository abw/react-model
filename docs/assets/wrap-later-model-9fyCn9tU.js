const n=`import { useState } from 'react'
import { Model, SetState } from '@abw/react-model'

interface CounterProviderProps {
  initialCount: number
  className?: string
}

export interface CounterRenderProps {
  count: number
  setCount: SetState<number>
  className?: string
}

type CounterModel = (props: CounterProviderProps) => CounterRenderProps

const Counter: CounterModel = ({
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
  Consumer,
  Use: useCounter
} = Model(Counter)
`;export{n as default};
