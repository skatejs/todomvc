// import skate from 'skatejs';

(function () {
	'use strict';

	skate('todo-footer', {
		events: {
			'click a': function (e) {
				skate.emit(this, 'filter', {
					detail: e.delegateTarget.href.split('#/')[1]
				});
			},
			'click button': function () {
				skate.emit(this, 'clear');
			}
		},

		// These properties are set from the <todo-app> component via attributes.
		properties: {
			count: skate.property.number(),
			filter: skate.property.string()
		},

		// The render lifecycle is controlled by <todo-app>.
		render: function (state) {
			return `
				<footer class="footer">
					<span class="todo-count">
						<strong>${state.count}</strong>
						item${state.count !== 1 ? 's' : ''} left
					</span>
					<ul class="filters">
						<li><a href="#/" class="${state.filter === '' ? 'selected' : ''}">All</a></li>
						<li><a href="#/active" class="${state.filter === 'active' ? 'selected' : ''}">Active</a></li>
						<li><a href="#/completed" class="${state.filter === 'completed' ? 'selected' : ''}">Completed</a></li>
					</ul>
					<button class="clear-completed">Clear completed</button>
				</footer>
			`;
		}
	});
}());
