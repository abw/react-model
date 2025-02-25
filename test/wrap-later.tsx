/* eslint-disable react-refresh/only-export-components */
import Model from '@/lib/Model'
import { useState } from 'react'
import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SetState } from '../lib'

interface CounterProviderProps {
  initialCount: number
  className?: string
}

interface CounterRenderProps {
  count: number
  setCount: SetState<number>
  className?: string
}

type CounterModel = (props: CounterProviderProps) => CounterRenderProps

const Counter: CounterModel = ({
  initialCount,
  className
}) => {
  const [count, setCount] = useState(initialCount)

  return {
    count, setCount, className
  }
}

const { Provider, Consumer } = Model(Counter)

const Count = ({ count, className }: CounterRenderProps) =>
  <div data-testid="count" className={className}>{count}</div>

const WrappedCount = Consumer(Count)

it(
  'count should have value',
  async () => {
    render(
      <Provider initialCount={10}>
        <WrappedCount/>
      </Provider>
    )
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
  }
)

it(
  'count should have value and class',
  async () => {
    render(
      <Provider initialCount={10} className="wibble">
        <WrappedCount/>
      </Provider>
    )
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
    expect(count).toHaveClass('wibble')
  }
)
