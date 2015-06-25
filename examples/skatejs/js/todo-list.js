(function (exports, skate) {
	'use strict';

	exports.TodoList = skate('todo-list', {
		extends: 'ul',
		events: {
			'destroy > li': function (e) {
				this.removeChild(e.target);
			}
		},
		properties: {
			active: {
				deps: ['items'],
				get: function () {
					return this.items.filter(function (todo) {
						return !todo.completed;
					});
				}
			},
			completed: {
				deps: ['items'],
				get: function () {
					return this.items.filter(function (todo) {
						return todo.completed;
					});
				}
			},
			items: {
				deps: ['completed li'],
				get: function () {
					return Array.prototype.slice.call(this.children);
				}
			}
		},
		created: skate.watch(skate.notify('items'))
	});
})(window, window.skate);
