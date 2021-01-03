# Notes

## Components, elements, lifecycle
- React does not have to be the "main" thing powering up the app, it can rather be intertwined with vanilla JS or other js modules
- there is a root DOM for holding the React components/elements (React in future) but the app can easily have more virtual DOMs to hold React
    - element: basic HTML entity (`<div />`, `<span />`, ...)
    - component: more complex React entity made up from elements and/or other components
    - calling component or element in React JSX way is equivalent to `React.createElement(el, props, children)`
    - custom React components must be **C**apitalized when called as a JSX entity, otherwise interpreter will think it is a HTML element which causes undefined behaviour
- if you rerender a component only the changed part will rerender, otherwise nothing happens (e.g. if you call setTimeout to render a static element it will not rerender until the function called by setTimeout changes the component [source](https://reactjs.org/docs/rendering-elements.html))

React class component `Comp` [lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/):
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


### RefForwarding
useful for complicated relations between more components divided by more layers of elements and components:
- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

it is possible to pass a callback ref function which makes more clear where is ref pointing to
```JSX
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}      />
    );
  }
}
```

If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the ref callback as a bound method on the class, but note that it shouldn’t matter in most cases.

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

### Portals
- render a child component in some other DOM (useful for abusing the z-index property)
- [here](https://reactjs.org/docs/portals.html) is a good example of portals with _bubbling_

### Hooks
```JSX
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```
#### Note
If you use this optimization, make sure the array includes all values from the component scope (such as props and state) that change over time and that are used by the effect. Otherwise, your code will reference stale values from previous renders. Learn more about how to deal with functions and what to do when the array values change too often.

If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.

If you pass an empty array ([]), the props and state inside the effect will always have their initial values. While passing [] as the second argument is closer to the familiar componentDidMount and componentWillUnmount mental model, there are usually better solutions to avoid re-running effects too often. Also, don’t forget that React defers running useEffect until after the browser has painted, so doing extra work is less of a problem.

We recommend using the exhaustive-deps rule as part of our eslint-plugin-react-hooks package. It warns when dependencies are specified incorrectly and suggests a fix.


### Useful functions
##### Component
- `shouldComponentUpdate()` - you can inset some conditions to prevent the component from updating (doesn't propagate to children)
- `getDerivedStateFromProps()` - if current state is conditional to new prop this might improve performance
##### ReactDOM
- `unmountComponentAtNode()` - remove component from the DOM and clean its state and props
- [`createPortal()`](#portals)

## Testing
- [Utils](https://reactjs.org/docs/test-utils.html)
- [Renders](https://reactjs.org/docs/test-renderer.html)

## Optimization
### Code-splitting
> TODO
> look a bit more into [`React.lazy`](https://reactjs.org/docs/code-splitting.html) loader to see the actual benefits and where can we make the user wait for that short time
> [useful](https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d)

### Profiler
> TODO
> [profiler](https://reactjs.org/docs/profiler.html)

### React.memo
- HOC => rerender only on prop change (state and context too)
- accepts custom function which return true/false whether we want to rerender the component or not

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



