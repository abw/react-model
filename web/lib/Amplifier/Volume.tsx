import { Consumer } from './Amplifier'

// The Consumer higher order component can be used to wrap any component.
// The component will be passed all the properties exposed by the model.
export const Volume = Consumer(
  ({ volume }) =>
    <div className="largest">{volume}</div>
)

export default Volume