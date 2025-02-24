import { Provider, Children } from './Counter'

const CounterApp = () =>
  <Provider initialCount={10}>
    <Children>
      {
        ({ count }) =>
          <div className="larger">{count}</div>
      }
      <p>
        Click the buttons!
      </p>
      {
        ({ inc, dec }) =>
          <div className="flex gap-2 mar-t-2 orange">
            <button onClick={() => dec()}>
              Dec
            </button>
            <button onClick={() => inc()}>
              Inc
            </button>
          </div>
      }
    </Children>
  </Provider>

export default CounterApp
