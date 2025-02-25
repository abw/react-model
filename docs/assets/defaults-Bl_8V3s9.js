const n=`// Typescript can infer the types of all properties
const MyModel = ({
  initialCount = 0,       // default value => number
  className = 'my-class'  // default value => string
}) => {
  const [count, setCount] = useState(initialCount)
  return {
    count, setCount,
    className
  }
}
`;export{n as default};
