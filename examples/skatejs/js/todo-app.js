(function (exports, skate, TodoItem) {
	'use strict';

	exports.TodoApp = skate('todo-app', {
		events: {
			clear: function () {
				var that = this;
				this.list.completed.forEach(function (item) {
					item.remove();
					that.store.remove(item.data);
				});
			},
			create: function (e) {
				var item = new TodoItem();
				item.text = e.detail;
				this.list.appendChild(item);
				this.store.save(item.data);
			},
			completed: function (e) {
				this.toggle.selected = !this.list.active.length;
				this.footer.count = this.list.active.length;
				this.store.save(e.target.data);
			},
			destroy: function (e) {
				this.store.remove(e.target.data);
			},
			toggle: function (e) {
				this.list.items.forEach(function (item) {
					item.completed = e.detail;
				});
			}
		},
		properties: {
			completed: {
				set: function () {
					this.toggle.selected = this.list.length === this.list.completed.length;
				}
			},
			count: {
				deps: [
					'list.completed',
					'list.length'
				],
				get: function () {
					return this.list.active.length;
				},
				set: function () {
					this.footer.count = this.count;
					this.footer.hidden = this.toggle.hidden = !this.list.length;
				}
			},
			filter: {
				deps: [
					'count',
					'footer.filter'
				],
				set: function () {
					var type = this.footer.filter;
					var list = this.list;
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
				}
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
		template: function () {
			this.innerHTML = '' +
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
