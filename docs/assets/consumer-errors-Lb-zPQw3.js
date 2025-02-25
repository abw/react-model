const n=`const MyComponent = Consumer(
  ({
    counts,     // Property 'counts' does not exist on type
    oops,       // Property 'oops' does not exist on type
    setCount,
    className,
  }) => {
    // Argument of type 'string' is not assignable to parameter of type 'SetStateAction<number>'.
    const eleven = () => setCount('eleven')

    // 'className' is possibly 'undefined'.
    const lcClass = className.toLowerCase()
  }
)

`;export{n as default};
