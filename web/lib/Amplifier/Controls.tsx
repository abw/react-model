import { useAmplifier } from './Amplifier'

// Alternately, call the Use hook (aliased to useAmplifier in this
// example) to access the model data from inside any component.
export const Controls = () => {
  const { setVolume } = useAmplifier()
  return (
    <div className="flex gap-2">
      <button onClick={() => setVolume( v => v - 1 )}>
        One Quieter
      </button>
      <button onClick={() => setVolume( v => v + 1 )}>
        One Louder
      </button>
    </div>
  )
}

export default Controls