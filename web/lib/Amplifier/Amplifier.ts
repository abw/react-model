import Model from '@/lib/Model'
/* START */
// PRETEND: import { Model } from '@abw/react-model'
import { useState } from 'react'

// Your model function can define state variables, setter functions,
// and any other functionality you need for your application or widget.
// Simply return an object containing the items you want to expose.
const Amplifier = ({ initialVolume = 1 }) => {
  const [volume, setVolume] = useState(initialVolume)
  return {
    volume, setVolume
  }
}

// Use the Model() higher order component to wrap your model function.
// It returns a Provider, a Consumer and a Use hook which we alias to
// useAmplifier.  These become the named exports from this module.
export const {
  Provider,
  Consumer,
  Use: useAmplifier
} = Model(Amplifier)
