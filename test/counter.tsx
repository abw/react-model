/* eslint-disable react-refresh/only-export-components */
import Model from '@/lib/Model'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'


const Counter = ({
  initialCount=0,
}) => {
  const [count, setCount] = useState(initialCount)
  const inc = (n=1) => setCount(count + n)
  const dec = (n=1) => setCount(count - n)

  return {
    count, setCount, inc, dec
  }
}

const { Provider, Consumer, Children, Use: useCounter } = Model(Counter)

const Count = Consumer(
  ({ count }) =>
    <div data-testid="count" className="larger">{count}</div>
)

type ControlsProps = {
  color?: string
}

const Controls = Consumer<ControlsProps>(
  ({ inc, dec, color }) =>
    <div data-testid="button" className={`flex gap-2 mar-t-2 ${color}`}>
      <button data-testid="dec" onClick={() => dec()}>
        Dec
      </button>
      <button data-testid="inc" onClick={() => inc()}>
        Inc
      </button>
    </div>
)

const Eleven = () => {
  const { setCount } = useCounter()
  return (
    <button data-testid="eleven" onClick={() => setCount(11)}>
      Eleven
    </button>
  )
}

const App = () =>
  <Provider initialCount={10}>
    <Count/>
    <Controls/>
    <Eleven/>
  </Provider>


it(
  'should just work',
  async () => {
    render(<App/>)
    const count = screen.getByTestId('count')
    const inc = screen.getByTestId('inc')
    const dec = screen.getByTestId('dec')
    const eleven = screen.getByTestId('eleven')

    expect(count).toHaveTextContent('10')

    await userEvent.click(inc)
    expect(count).toHaveTextContent('11')

    await userEvent.click(dec)
    await userEvent.click(dec)
    expect(count).toHaveTextContent('9')

    await userEvent.click(eleven)
    expect(count).toHaveTextContent('11')
  }
)

it(
  'children should receive props',
  async () => {
    render(
      <Provider initialCount={10}>
        <Children>
          <div data-testid="hello">Hello World</div>
          {
            ({ count }) => <div data-testid="count">{count}</div>
          }
          {
            ({ setCount }) =>
              <button data-testid="inc" onClick={() => setCount( count => count + 1)}>
                Inc
              </button>
          }
        </Children>
      </Provider>
    )
    const hello = screen.getByTestId('hello')
    expect(hello).toHaveTextContent('Hello World')

    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')

    const inc = screen.getByTestId('inc')
    await userEvent.click(inc)
    expect(count).toHaveTextContent('11')
  }
)
