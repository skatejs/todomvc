(function (exports, skate) {
	'use strict';

	exports.TodoList = skate('todo-list', {
		extends: 'ul',
		events: {
			completed: function () {
				this.length = this.length;
			},
			destroy: function (e) {
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
				deps: ['length'],
				get: function () {
					return Array.prototype.slice.call(this.children);
				}
			},
			length: {
				type: Number,
				value: 0,
				get: function () {
					return this.children.length;
				}
			}
		},
		created: function () {
			var that = this;
			skate.watch(this, function () {
				that.length = that.length;
			});
		}
	});
})(window, window.skate);
