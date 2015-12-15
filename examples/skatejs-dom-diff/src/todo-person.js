import render from 'skatejs-dom-diff/src/render';
import skate from 'skatejs';

export default skate('todo-person', {
	properties: {
		nick: skate.properties.string({
			attribute: true,
			set: skate.render
		}),
		content: {
			set: skate.render
		}
	},
	render: render(function (elem, React) {
		return (
			<a href={`http://twitter.com/${elem.nick}`}>
				{elem.content || elem.nick}
			</a>
		);
	})
});
