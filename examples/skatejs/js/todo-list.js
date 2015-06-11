(function (exports, skate) {
	'use strict';

	var nodeProto = window.Node.prototype;

	exports.TodoList = skate('todo-list', {
		extends: 'ul',
		events: {
			destroy: function (elem, e) {
				elem.removeChild(e.target);
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
				notify: true,
				type: Number,
				value: 0,
				get: function () {
					return this.children.length;
				}
			}
		},
		created: function (elem) {
			skate.watch(elem, function () {
				skate.notify(elem, 'length');
			});
		}
	});
})(window, window.skate);
