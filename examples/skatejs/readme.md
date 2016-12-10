# SkateJS • [TodoMVC](http://todomvc.com)

> SkateJS is a web component library designed to give you an augmentation of the web component specs focusing on a functional rendering pipeline, clean property / attribute semantics and a small footprint.


## Resources

- [Website](https://github.com/skatejs/skatejs)
- [Documentation](https://github.com/skatejs/skatejs)

### Support

- [Issues](https://github.com/skatejs/skatejs/issues)
- [Twitter](http://twitter.com/skate_js)


## Implementation

Even though there are shared stateless components used, this app was created in a single web component. There were a few reasons for this:

- Simplicity
- Components aren't reused anywhere
- Base / app CSS files aren't set up for use with Shadow DOM, so we had to duplicate them in the head and in the main todo component. The alternative here would be to break up the base / app styles into separate files that are loaded only where necessary, which makes maintainability with staying up to date with them harder.

### Routing

SkateJS doesn't implement a router. However, it was simple to filter items based on their status so we decided to implement this functionality. The only catch here is that we don't handle a URL update, only the clicks on the buttons.


## Credit

Created by the [SkateJS Team](https://github.com/skatejs/skatejs)
