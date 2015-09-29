// import skate from 'skatejs';

(function (skate) {
	window.TodoPerson = skate('todo-person', {
		properties: {
			nick: skate.property.string(),
			textContent: skate.property.string()
		},

		// The render lifecycle is controlled by <todo-app>.
		render: function (state) {
			return state.nick ?
				`<a href="http://twitter.com/${state.nick}">${state.textContent || state.nick}</a>` :
				`<span>${state.textContent}</span>`;
		}
	});
}(window.skate));
