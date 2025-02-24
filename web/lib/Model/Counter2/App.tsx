import { Provider } from './Counter'
import { AppProps } from './types'
import Count from './Count'
import Controls from './Controls'

const CounterApp = ({
  controlsColor='green',
  ...props
}: AppProps) =>
  <Provider {...props}>
    <Count/>
    <Controls color={controlsColor}/>
  </Provider>

const TwoCounterApps = () =>
  <div>
    <CounterApp
      initialCount={10}
    />
    <br/>
    <CounterApp
      initialCount={100}
      controlsColor="blue"
    />
  </div>

export default TwoCounterApps
