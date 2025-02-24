import { Consumer } from './Volume'

export const Buttons = Consumer(
  ({ volume, maxVolume, oneLouder, oneQuieter, goToEleven }) =>
    <div className="flex gap-2 brand">
      <button onClick={oneQuieter} disabled={volume === 0}>
        One Quieter
      </button>
      <button onClick={oneLouder} disabled={volume === maxVolume}>
        One Louder
      </button>
      <button onClick={goToEleven} disabled={volume === maxVolume} className="red">
        Go To Eleven
      </button>
    </div>
)

export default Buttons