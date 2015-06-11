(function (exports, skate, TodoItem) {
	'use strict';

	exports.TodoApp = skate('todo-app', {
		events: {
			'skate-property-count': function (elem) {
				var listLength = elem.list.length;
				elem.footer.count = elem.list.active.length;
				elem.footer.hidden = !listLength;
				elem.toggle.hidden = !listLength;
			},
			'skate-property-completed': function (elem) {
				elem.toggle.selected = elem.list.length === elem.list.completed.length;
			},
			'skate-property-filter': function (elem) {
				var type = elem.footer.filter;
				var list = elem.list;
				var items = list.items;

				if (type && list[type]) {
					items.forEach(function (item) {
						item.hidden = true;
					});

					list[type].forEach(function (item) {
						item.hidden = false;
					});

					return;
				}

				items.forEach(function (item) {
					item.hidden = false;
				});
			},
			clear: function (elem) {
				elem.list.completed.forEach(function (item) {
					item.remove();
					elem.store.remove(item.data);
				});
			},
			create: function (elem, e) {
				var item = new TodoItem();
				item.text = e.detail;
				elem.list.appendChild(item);
				elem.store.save(item.data);
			},
			completed: function (elem, e) {
				elem.toggle.selected = !elem.list.active.length;
				elem.footer.count = elem.list.active.length;
				elem.store.save(e.target.data);
			},
			destroy: function (elem, e) {
				elem.store.remove(e.target.data);
			},
			toggle: function (elem, e) {
				elem.list.items.forEach(function (item) {
					item.completed = e.detail;
				});
			}
		},
		properties: {
			count: {
				deps: [
					'completed li[is="todo-item"]',
					'length ul[is="todo-list"]'
				],
				notify: true,
				get: function () {
					return this.list.active.length;
				}
			},
			filter: {
				deps: ['count']
			},
			storageId: {
				attr: true,
				set: function (value) {
					var that = this;
					skate.ready(function () {
						that.store = document.getElementById(value);
						that.store.getAll().forEach(function (data) {
							var todoItem = new TodoItem();
							todoItem.data = data;
							that.list.appendChild(todoItem);
						});
					});
				}
			}
		},
		prototype: {
			get footer () {
				return this.querySelector('todo-footer');
			},
			get list () {
				return this.querySelector('[is="todo-list"]');
			},
			get toggle () {
				return this.querySelector('todo-toggle');
			}
		},
		template: function (elem) {
			elem.innerHTML = '' +
				'<section class="todoapp">' +
				'  <header class="header">' +
				'    <h1>todos</h1>' +
				'    <input is="todo-input">' +
				'  </header>' +
				'  <!-- This section should be hidden by default and shown when there are todos -->' +
				'  <section class="main">' +
				'    <todo-toggle></todo-toggle>' +
				'    <ul is="todo-list" class="todo-list"></ul>' +
				'  </section>' +
				'  <!-- This footer should hidden by default and shown when there are todos -->' +
				'  <todo-footer></todo-footer>' +
				'</section>';
		}
	});
})(window, window.skate, window.TodoItem);
