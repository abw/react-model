export type RenderChild<RenderProps> = (value: RenderProps) => React.ReactNode

export type RenderChildren<RenderProps> = {
  children:
    React.ReactNode |
    RenderChild<RenderProps> |
    Array< React.ReactNode | RenderChild<RenderProps> >
}

export type DebugConfigFunction = (...args: unknown[]) => string
export type DebugConfigOption = undefined | string | DebugConfigFunction
export type DebugOptions = {
  debug?: boolean,
  debugPrefix?: DebugConfigOption,
  debugColor?:  DebugConfigOption,
}

// Alias to simplify this ugliness
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
