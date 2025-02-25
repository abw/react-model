const n=`const Counter = ({
  initialCount,
  className
}) => {
  const [count, setCount] = useState(initialCount)

  return {
    count, setCount, className
  }
}

`;export{n as default};
