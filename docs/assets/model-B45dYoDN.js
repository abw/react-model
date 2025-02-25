const n=`interface CounterProps {
  initialCount: number,
  className?: string
}

const Counter = ({
  initialCount,
  className
}: CounterProps) => {
  const [count, setCount] = useState(initialCount)

  return {
    count, setCount, className
  }
}

`;export{n as default};
