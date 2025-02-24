import { Consumer } from './Volume'

const Slider = Consumer(
  ({ volume, setVolume, maxVolume }) =>
    <input
      type="range"
      min="0"
      max={maxVolume}
      value={volume}
      onChange={e => setVolume(parseInt(e.target.value))}
    />
)

export default Slider