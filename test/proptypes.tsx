/* eslint-disable react-refresh/only-export-components */
import Model from '@/lib/Model'
import { useState } from 'react'
import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SetState } from '../lib'

interface ProviderProps {
  initialCount: number,
  active?: boolean
}

interface ConsumerProps {
  count: number,
  setCount: SetState<number>
  className: string
}

const Counter: (props: ProviderProps) => ConsumerProps = ({
  initialCount,
  active
}) => {
  const [count, setCount] = useState(initialCount)
  const className = active
    ? 'item-is-active'
    : 'item-not-active'

  return {
    count, setCount,
    className,
  }
}

const { Provider, Consumer } = Model(Counter)

const Count = Consumer(
  ({ count, className }) =>
    <div data-testid="count" className={className}>{count}</div>
)

const Count2 = ({
  count,
  className
}: ConsumerProps) =>
  <div data-testid="count" className={className}>{count}</div>

const Count2Wrapped = Consumer(Count2)

it(
  'count should have value',
  async () => {
    render(
      <Provider initialCount={10}>
        <Count/>
      </Provider>
    )
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
    expect(count).toHaveClass('item-not-active')
  }
)

it(
  'count should have value and class',
  async () => {
    render(
      <Provider initialCount={10} active={true}>
        <Count/>
      </Provider>
    )
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
    expect(count).toHaveClass('item-is-active')
  }
)

it(
  'wrapped count',
  async () => {
    render(
      <Provider initialCount={10} active={true}>
        <Count2Wrapped/>
      </Provider>
    )
    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('10')
    expect(count).toHaveClass('item-is-active')
  }
)
