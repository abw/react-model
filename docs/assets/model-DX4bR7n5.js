const n=`interface CounterProps {
  initialCount: number,
  className?: string
}

const Counter = ({
  initialCount,     // can't automatically infer type
  className         // ditto
}: CounterProps) => {
  const [count, setCount] = useState(initialCount)

  return {
    count, setCount, className
  }
}

`;export{n as default};
