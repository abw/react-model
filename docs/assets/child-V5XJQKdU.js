const n=`const Counter = ({
  initialCount=0,
}) => {
  const [count, setCount] = useState(initialCount)
  return {
    count, setCount
  }
}

const { Provider, Children } = Model(Counter)

const App = () =>
  <Provider initialCount={10}>
    <Children>
      <div>Counter Example</div>
      {
        ({ count }) => <div>{count}</div>
      }
      <div>You can embed other content in here</div>
      {
        ({ setCount }) =>
          <button onClick={() => setCount( count => count + 1)}>
            One Louder
          </button>
      }
    </Children>
  </Provider>
`;export{n as default};
