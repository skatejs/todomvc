(function (exports, skate, TodoItem) {
	'use strict';

	exports.TodoApp = skate('todo-app', {
		attributes: {
			filter: {
				value: undefined
			},
			storageId: {
				value: undefined
			}
		},
		created: function (elem) {
			elem.store = document.getElementById(elem.storageId);
			elem.store
				.getAll()
				.forEach(function (data) {
					var todoItem = new TodoItem();
					todoItem.data = data;
					elem.list.appendChild(todoItem);
				});
		},
		events: {
			// TODO: storage
			clear: function (elem) {
				elem.list.completed.forEach(function (item) {
					item.remove();
					elem.store.remove(item.data);
				});
				elem.footer.count = elem.list.length;

				if (elem.list.items.length) {
					return;
				}

				elem.footer.hidden = true;
				elem.toggle.hidden = true;
			},
			create: function (elem, e) {
				if (!elem.list.items.length) {
					elem.footer.hidden = undefined;
					elem.toggle.hidden = undefined;
				}

				var item = new TodoItem();
				item.text = e.detail;
				elem.list.appendChild(item);
				++elem.footer.count;

				elem.store.save(item.data);

			},
			completed: function (elem, e) {
				// toggle should be selected if every item is marked as completed
				// 		toggle should be unselected if any item is active
				elem.toggle.selected = !elem.list.active.length;
				elem.footer.count = elem.list.active.length;

				elem.store.save(e.target.data);
			},
			destroy: function (elem, e) {
				--elem.footer.count;
				elem.store.remove(e.target.data);

				if (elem.list.items.length) {
					return;
				}

				elem.footer.hidden = true;
				elem.toggle.hidden = true;

			},
			filter: function (elem, e) {
				var type = e.detail;
				var list = elem.list;
				var items = list.items;

				if (type && list[type]) {
					items.forEach(function (item) {
						item.hidden = true;
					});

					list[type].forEach(function (item) {
						item.hidden = false
					});

					elem.filter = type;
					return;
				}

				// cannot find match or using 'all'
				elem.filter = undefined;
				items.forEach(function (item) {
					item.hidden = false;
				});
			},
			// TODO: reinitialize filter
			// we don't know what the current filter is!
			// options:
			// 1. add the filter as an attribute to this element
			toggle: function (elem, e) {
				elem.list.items.forEach(function (item) {
					item.completed = e.detail ? true : undefined;
				});

				elem.dispatchEvent(new CustomEvent('filter', {
					bubbles: true,
					detail: elem.filter
				}));
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
