import render from 'skatejs-dom-diff/src/render';
import skate from 'skatejs';

export default skate('todo-person', {
	properties: {
		content: skate.properties.content({
			change: skate.render
		}),
		nick: skate.properties.string({
			attribute: true,
			set: skate.render
		})
	},
  // The React variable is actually a skatejs-dom-diff object that has a JSX-
  // compatible createElement() function on it. It's not React, that's just
  // what Babel compiles down to by default.
	render: render(function (elem, React) {
		return (
			<a href={`http://twitter.com/${elem.nick}`}>
				{elem.content.nodes || elem.nick}
			</a>
		);
	})
});
