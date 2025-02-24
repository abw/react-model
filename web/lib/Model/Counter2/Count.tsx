import { Consumer } from './Counter'
import { ConsumerProps } from './types'

const MyCount = ({ count }: Partial<ConsumerProps>) =>
  <div className="larger">{count}</div>

export const Count = Consumer(MyCount)

export default Count