## React hook

#### Overview about hooks in React

- A hook in React is only called at the top level of a component or in an user's own hook. Hooks can not be called inside loops or conditions.

#### useCallback

- Call `useCallback` at the top level of your component to cache a function definition between re-renders
- `useCallback` has two parameters
  - `fn`: The function value that you want to cache. It can take any arguments and return ant values. React will return your function back to you during the initial render. If the `dependencies` have not changed since the last render, react will return the same function again. Noting that react only return the function, not call it. The decision of when and whether to call it absolutely belong to you.
  - `dependencies`: The list of all `reactive values` referenced inside of the `fn` code. Rect will compare each dependency with its previous value using the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm.

#### useEffect

`setup`: The function with your Effect's logic and maybe also optionally return a cleanup function. When the component is added to the DOM, react will run your setup function. After every re-render with changed dependencies, react will first run the cleanup function with the old value, and then run your setup function with the new values. After your component is removed from the DOM, react will run your cleanup function.

#### Optimize re-render component by using useCallback and useMemo and memo

- If you don't want child components re-render when their parents re-render, you can use `memo` and declare all child component props as `useCallback` and `useMemo`.
