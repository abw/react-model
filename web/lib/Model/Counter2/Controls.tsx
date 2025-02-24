import { useCounter } from './Counter'

type ControlsProps = {
  color?: string
}

export const Controls = (
  { color }: ControlsProps
) => {
  const { inc, dec } = useCounter()

  return (
    <div className={`flex gap-2 mar-t-2 ${color}`}>
      <button onClick={() => dec()}>
        Dec
      </button>
      <button onClick={() => inc()}>
        Inc
      </button>
    </div>
  )
}

export default Controls