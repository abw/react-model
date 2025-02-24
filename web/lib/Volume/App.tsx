import { Provider } from './Volume'
import Slider  from './Slider'
import Buttons from './Buttons'
import Display from './Display'

export const App = () =>
  <Provider initialVolume={10}>
    <div className="surface pad-4 border bdr-1 flex space">
      <div className="grid-1 gap-4">
        <Slider/>
        <Buttons/>
      </div>
      <Display/>
    </div>
  </Provider>

export default App