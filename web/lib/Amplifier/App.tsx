import { Provider } from './Amplifier'
import Controls from './Controls'
import Volume from './Volume'

// Use the Provider to wrap your application code.  The Provider
// accepts and forwards any properties that your Model supports,
// e.g. initialVolume in this example.
export const App = () =>
  <div className="surface pad-4 border bdr-2">
    <Provider initialVolume={5}>
      <Volume/>
      <Controls/>
    </Provider>
  </div>

export default App