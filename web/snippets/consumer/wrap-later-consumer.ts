import { Consumer, CounterRenderProps } from './Counter'

const Count = ({ count, className }: CounterRenderProps) =>
  <div className={className}>{count}</div>

export default Consumer(Count)
