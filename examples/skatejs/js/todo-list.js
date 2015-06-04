(function (window, skate, exports) {
	'use strict';
	var TodoList = skate('todo-list', {
		// TODO: storage?
		extends: 'ul',
		events: {
			destroy: function (elem, e) {
				elem.removeChild(e.target);
			}
		},
		prototype: {
			// override original remove function

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

	// exports
	exports.TodoList = TodoList;
})(window, window.skate, window.app);
