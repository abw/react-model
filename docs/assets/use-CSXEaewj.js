const n=`import { useCounter } from './Counter'

const MyComponent = () => {
  const { count } = useCounter()
  return (
    <div>The count is {count}</div>
  )
}
`;export{n as default};
