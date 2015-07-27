(function (exports, skate) {
	'use strict';

	exports.TodoList = skate('todo-list', {
		extends: 'ul',
		events: {
			destroy: function (e) {
				this.removeChild(e.target);
			}
		},
		prototype: {
			get active () {
				return this.items.filter(function (item) {
					return !item.completed;
				});
			},
			get completed () {
				return this.items.filter(function (item) {
					return item.completed;
				});
			},
			get items () {
				return Array.prototype.slice.call(this.querySelectorAll('[is=todo-item]'));
			}
		}
	});
})(window, window.skate);
