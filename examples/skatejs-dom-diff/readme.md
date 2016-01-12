# SkateJS • [TodoMVC](http://todomvc.com)

> Skate is a web component library that provides an API to bind behaviour to DOM elements. It's based on the W3C specification for Custom Elements.


## Resources

- [Website](https://github.com/skatejs/skatejs)
- [Documentation](https://github.com/skatejs/skatejs)


### Articles

- [Web Platform Podcast #66](https://www.youtube.com/watch?v=AbolmN4mp-g)


### Support

- [GitHub](https://github.com/skatejs/skatejs/issues?q=is%3Aopen+is%3Aissue+label%3Aquestion)
- [StackOverflow](http://stackoverflow.com/questions/tagged/skatejs)
- [Twitter](http://twitter.com/treshugart)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*


## Implementation

This implementation of TodoMVC uses [SkateJS](https://github.com/skatejs/skatejs) along with [SkateJS DOM Diff](https://github.com/skatejs/dom-diff) and [JSX](https://facebook.github.io/jsx/) to remove a lot of the boilerplate and state maintenance invoved with the [vanilla app](https://github.com/skatejs/todomvc/tree/skatejs/examples/skatejs). The result is a more functional set of components that is very similar to React. Though you will see a `React` variable used in the code, *React is not used here at all*. What you're seeing is actually just a JSX compatible object that has a `createElement()` method on it so when Babel compiles the JSX in to `React.createElement()` calls, SkateJS DOM Diff's `createElement()` function is called.

Since it utilises future JavaScript features and JSX, it requries a transpile in order to dev, but you are able to load load up the `index.html` and have a working example without running any build steps.


## Credit

Created by [Trey Shugart](http://twitter.com/treshugart) and [Chris Darroch](http://twitter.com/chrisdarroch).
