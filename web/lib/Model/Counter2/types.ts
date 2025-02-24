import { SetState } from '@/lib/types'
/* START */
// PRETEND: import { SetState } from '@abw/react-context'

export type ProviderProps = {
  initialCount?: number
}

export type AppProps = ProviderProps & {
  controlsColor?: string
}

export type ConsumerProps = {
  count?: number,
  setCount: SetState<number>
  inc: (n?: number) => void
  dec: (n?: number) => void
}
