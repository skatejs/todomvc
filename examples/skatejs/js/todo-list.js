(function (exports, skate) {
	'use strict';

	exports.TodoList = skate('todo-list', {
		extends: 'ul',
		events: {
			destroy: function (elem, e) {
				elem.removeChild(e.target);
			}
		},
		prototype: {
			get completed () {
				return this.items.filter(function (todo) {
					return todo.completed;
				});
			},
			get active () {
				return this.items.filter(function (todo) {
					return !todo.completed;
				});
			},
			get items () {
				return Array.prototype.slice.call(this.children);
			},
			get length () {
				return this.children.length;
			}
		}
	});
})(window, window.skate);
