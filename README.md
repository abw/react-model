# react-model

## Introduction

This is a small and simple module that simplifies the process of creating a
state model for your application or widgets using a React Context.

It's written in Typescript and provides full (and mostly automatic) type
safety for your data.

If you're not already familiar with React Context then you should start by
reading the React Context documentation: https://react.dev/reference/react/useContext

## Getting Started

Add the `@abw/react-model` module to your project using your favourite
package manager.

```bash
## using npm
$ npm add @abw/react-model

## using yarn
$ yarn add @abw/react-model

## using pnpm
$ pnpm add @abw/react-model
```

You can then import the module and start using it.

```jsx
import { Model } from '@abw/react-model'
```

## Documentation

Visit the [documentation](https://badgerpower.com/react-model/) web site
for detailed documentation.

## Example

First create a model function.  It can accept an optional object of properties
for configuration items.  It should return an object containing any model data,
functions, etc. that you want to share.  This example is a variation of the
counter example that is the "Hello World!" of React state modules.  In this
case, we'll model a simple volume control.

Pass your model function to the `Model` higher order component.  This will
return an object containing a `Provider`, `Consumer` and a `Use` hook.
It's considered best practice to rename the `Use` hook to match the accepted
naming convention (i.e. `useSomething`).  In this example, we call it
`useVolume`.

```js
import { Model } from '@abw/react-model'
import { useState } from 'react'

const Volume = ({
  // optional initial volume
  initialVolume = 0,
}) => {
  // volume state variable and setter
  const [volume, setVolume] = useState(initialVolume)

  // return an object containing the state data we want to expose
  return {
    volume, setVolume
  }
}

// Wrap it all up using the Model higher order component to get a
// Provider, Consumer and Use hook (aliased to useVolume).
export const {
  Provider,
  Consumer,
  Use: useVolume
} = Model(Volume)
```

You can then call the `useVolume` hook in any component to access the
model data.

```tsx
import { useVolume } from './Volume'

const Amplifier = () => {
  const { volume, setVolume } = useVolume()
  return (
    <div>
      <div>Volume is {volume}</div>
      <button onClick={() => setVolume(11)}>
        Go up to eleven
      </button>
    </div>
  )
}
```

You can also use the `Consumer` higher order component to wrap your components.
In this case they will receive the model data items as properties.

```tsx
import { Consumer } from './Volume'

export const Amplifier = Consumer(
  ({ volume, setVolume }) =>
    <div>
      <div>Volume is {volume}</div>
      <button onClick={() => setVolume(11)}>
        Go up to eleven
      </button>
    </div>
)
```

## Author

Andy Wardley, https://github.com/abw