/* eslint-disable react-refresh/only-export-components */
import Model from '@/lib/Model'
import { useState } from 'react'
import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

interface CounterProps {
  initialCount: number,
  className?: string
}

const Counter = ({
  initialCount,
  className
}: CounterProps) => {
  const [count, setCount] = useState(initialCount)

  return {
    count, setCount, className
  }
}

const { Provider, Consumer } = Model(Counter)

const Count = Consumer(
  ({ count, className }) =>
    <div data-testid="count" className={className}>{count}</div>
)

const App1 = () =>
  <Provider initialCount={10}>
    <Count/>
  </Provider>

const App2 = () =>
  <Provider initialCount={10} className="wibble">
    <Count/>
  </Provider>


it(
  'count should have value',
  async () => {
    render(<App1/>)
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
  }
)

it(
  'count should have value and class',
  async () => {
    render(<App2/>)
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
    expect(count).toHaveClass('wibble')
  }
)
