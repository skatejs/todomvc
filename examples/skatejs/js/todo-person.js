// import skate from 'skatejs';

(function (exports, skate) {
	'use strict';

	function getAnchor (person) {
		return person.querySelector('a');
	}

	function getContent (person) {
		return person.querySelector('span');
	}

	exports.TodoPerson = skate('todo-person', {
		properties: {
			nick: skate.properties.string({
				set: function (elem, data) {
					var anchor = getAnchor(elem);
					anchor.href = 'http://twitter.com/' + data.newValue;
					anchor.textContent = this.textContent || data.newValue;
				}
			}),
			textContent: skate.properties.string({
				set: function (elem, data) {
					var anchor = getAnchor(elem);
					var content = getContent(elem);
					anchor.textContent = data.newValue || elem.nick;
					content.textContent = data.newValue;
				}
			})
		},
		render: skate.render.html(function () {
			return `
				<a></a>
				<span></span>
			`;
		})
	});
}(window, window.skate));
