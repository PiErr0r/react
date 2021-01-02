# Notes

- React does not have to be the "main" thing powering up the app, it can rather be intertwined with vanilla JS or other js modules
    - there is a root DOM for holding the React components/elements (React in future) but the app can easily have more virtual DOMs to hold React
        - element: basic HTML entity (`<div />`, `<span />`, ...)
        - component: more complex React entity made up from elements and/or other components
        - calling component or element in React JSX way is equivalent to `React.createElement(el, props, children)`
        - custom React components must be **C**apitalized when called as a JSX entity
    - if you rerender a component only the changed part will rerender, otherwise nothing happens (e.g. if you call setTimeout to render a static element it will not rerender until the function called by setTimeout changes the component [source](https://reactjs.org/docs/rendering-elements.html))


Another way to parse HTML:
```JSX
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```


