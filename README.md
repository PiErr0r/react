# Notes

## Components, elements, lifecycle
- React does not have to be the "main" thing powering up the app, it can rather be intertwined with vanilla JS or other js modules
- there is a root DOM for holding the React components/elements (React in future) but the app can easily have more virtual DOMs to hold React
    - element: basic HTML entity (`<div />`, `<span />`, ...)
    - component: more complex React entity made up from elements and/or other components
    - calling component or element in React JSX way is equivalent to `React.createElement(el, props, children)`
    - custom React components must be **C**apitalized when called as a JSX entity, otherwise interpreter will think it is a HTML element which causes undefined behaviour
- if you rerender a component only the changed part will rerender, otherwise nothing happens (e.g. if you call setTimeout to render a static element it will not rerender until the function called by setTimeout changes the component [source](https://reactjs.org/docs/rendering-elements.html))

React class component `Comp` lifecycle:
1. `<Comp />` is passed to `ReactDOM.render()`
2. React calls the contructor of `Comp`
3. `Comp`'s `render()` method is called and `Comp` is inserted in the DOM
4. once `Comp` is inserdted in the DOM `componentDidMount()` method is called
5. if any of the `Comp`'s props or state is changed React rerenders `Comp`
6. if `Comp` is ever removed from the DOM `componentWillUnmount()` method is called

state and props are asynchrous so:
```JSX
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
/*
 * setState accepts a function whose parameters are previous state and props at the time update is applied
 */
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

Another way to parse HTML:
```JSX
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
### Code-splitting
> TODO
> look a bit more into `React.lazy` loader to see the actua lbenefits and where can we make the user wait for that short time

### RefForwarding
useful for complicated relations between more components divided by more layers of elements and components:
- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

### HOC
used for enhancing the components which are often almost the same (same `handleAdd` or `handleChange` function)
```JSX
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```


## Accessibility (a11y)

- [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WUHCAG](https://www.wuhcag.com/wcag-checklist/)
- [WebAIM](https://webaim.org/standards/wcag/checklist)
- [A11Y](https://www.a11yproject.com/checklist/)
- [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/)
- [React a11y](https://reactjs.org/docs/accessibility.html)

## Material-UI

**Use lazy imports for smaller bundle sizes**
```diff
-import Button from '@material-ui/core/Button';
-import TextField from '@material-ui/core/TextField';
+import { Button, TextField } from '@material-ui/core';
```



