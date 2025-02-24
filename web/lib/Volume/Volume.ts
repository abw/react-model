import { Model } from '@/lib/index'
{/* START */}
// PRETEND: import { Model } from '@abw/react-model'
import { useState } from 'react'

const Volume = ({
  initialVolume = 0,    // optional initial volume
  maxVolume = 11        // optional maximum volume
}) => {
  // volume state variable and setter
  const [volume, setVolume] = useState(initialVolume)

  // functions to update the volume
  const oneLouder  = () => setVolume(
    volume => Math.min(volume + 1, maxVolume)
  )
  const oneQuieter = () => setVolume(
    volume => Math.max(volume - 1, 0)
  )
  const goToEleven = () => setVolume(11)

  // return an object containing the state data we want to expose
  return {
    volume, setVolume, maxVolume,
    oneLouder, oneQuieter, goToEleven
  }
}

// Wrap it all up using the Model higher order component to get a
// Provider, Consumer and Use hook (aliased to useVolume).
export const {
  Provider,
  Consumer,
  Use: useVolume
} = Model(Volume)

