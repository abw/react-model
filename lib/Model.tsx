/* eslint-disable indent */
import React from 'react'
import { toArray } from './Utils'
import { isFunction } from '@abw/badger-utils'
import { RenderChild, RenderChildren } from './types'

export type ModelOptions = {
  name?: string
}

export const Model = <ProviderProps, ConsumerProps>(
  ModelComponent: (props: ProviderProps) => ConsumerProps,
  { name = ModelComponent.name || 'Model' }: ModelOptions = { }
) => {
  const Context = React.createContext<ConsumerProps>({ } as ConsumerProps)

  type ProviderPropsWithChildren = ProviderProps & {
    children?: React.ReactNode | undefined;
  }

  // Provider receives all the ProviderProps, and additionally children.
  // The ModelComponent receives the ProviderProps and returns the
  // ConsumerProps which are set in the context.  The children are then
  // rendered inside the context provider.
  const Provider = ({
    children,
    ...props
  }: ProviderPropsWithChildren) =>
    <Context.Provider value={ModelComponent(props as ProviderProps)}>
      {children}
    </Context.Provider>


  // Consumer wraps a component that receives a Partial set of the
  // ConsumerProps along with an ExtraProps it defines. It is rendered inside
  // a context consumer that receives the ConsumerProps and forwards them to
  // the wrapped component along with any ExtraProps.  Note that the wrapped
  // component can be explicitly passed properties that mask the context
  // props.
  const Consumer = <
    ExtraProps={}
  >(
    Component: React.FC<ConsumerProps & ExtraProps>
  ) => (
    props: ExtraProps & Partial<ConsumerProps>
  ) =>
    <Context.Consumer>
      {
        context =>
          <Component {...context} {...props}/>
      }
    </Context.Consumer>

  // Children renders all children inside a context consumer.  A child can
  // be a function which will be passed all the
  const Children = ({ children }: RenderChildren<ConsumerProps>) =>
    toArray(children).map(
      (child, n) => isFunction(child)
        ? <Context.Consumer key={n}>
            { child as RenderChild<ConsumerProps> }
          </Context.Consumer>
        : child as React.ReactNode
    )

  // Simple hook to access the context data
  const Use = () => React.useContext(Context)

  Provider.displayName = `Provider[${name}]`
  Consumer.displayName = `Consumer[${name}]`

  return {
    Context,
    Provider,
    Consumer,
    Children,
    Use
  }
}

export default Model
