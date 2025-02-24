import { useVolume } from './Volume'

const Display = () => {
  const { volume, maxVolume } = useVolume()
  return (
    <div className="text-right">
      <div className="x2">{volume}</div>
      <div className="small">goes up to {maxVolume}</div>
    </div>
  )
}

export default Display