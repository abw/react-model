const i=`// Property 'initialCount' is missing...
<Provider className="my-class">
  // ...
</Provider>

// Type 'string' is not assignable to type 'number'...
<Provider initialCount="eleven">
  // ...
</Provider>

// Type 'boolean' is not assignable to type 'string'.
<Provider initialCount={10} className={true}>
  // ...
</Provider>

// Property 'initialCont' does not exist on type ...
<Provider initialCont={10} className={true}>
  // ...
</Provider>
`;export{i as default};
