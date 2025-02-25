const n=`interface ProviderProps {
  initialCount: number,
  active?: boolean
}

interface ConsumerProps {
  count: number,
  setCount: SetState<number>
  className: string
}

const Counter: (props: ProviderProps) => ConsumerProps = ({
  initialCount,
  active
}) => {
  const [count, setCount] = useState(initialCount)
  const className = active
    ? 'item-is-active'
    : 'item-not-active'

  return {
    count, setCount,
    className
  }
}

export const {
  Provider,
  Consumer,
  Use: useCounter
} = Model(Counter)
`;export{n as default};
