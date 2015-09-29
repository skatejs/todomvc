// import skate from 'skatejs';
// import util from './util';

(function () {
	'use strict';

	skate('todo-footer', {
		events: {
			'click a': function (e) {
				skate.emit(this, 'filter', {
					detail: e.delegateTarget.href.split('#/')[1]
				});
			}
		},
		properties: {
			count: skate.property.number({ emit: true }),
			filter: skate.property.string({ emit: true })
		},
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
