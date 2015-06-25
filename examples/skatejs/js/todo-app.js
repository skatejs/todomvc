(function (exports, skate, todoItem) {
	'use strict';

	exports.TodoApp = skate('todo-app', {
		events: {
			'clear *': function () {
				var that = this;
				this.list.completed.forEach(function (item) {
					item.remove();
					that.store.remove(item.data);
				});
			},
			'create *': function (e) {
				var item = todoItem({
					text: e.detail
				});
				this.list.appendChild(item);
				this.store.save(item.data);
			},
			'destroy *': function (e) {
				this.store.remove(e.target.data);
			},
			'toggle *': function (e) {
				this.list.items.forEach(function (item) {
					item.completed = e.detail;
				});
			},
			'skate.property.completed li': function (e) {
				this.store.save(e.target.data);
			},
			'skate.property.items ul': function () {
				this.toggle.selected = !this.list.active.length;
				this.footer.count = this.list.active.length;
				this.footer.hidden = this.toggle.hidden = !this.list.items.length;
			}
		},
		properties: {
			filter: {
				attr: true,
				deps: ['items ul', 'filter todo-footer'],
				get: function () {
					return this.footer.filter;
				},
				set: function (value) {
					var list = this.list;
					var items = list.items;

					if (value && list[value]) {
						items.forEach(function (item) {
							item.hidden = true;
						});

						list[value].forEach(function (item) {
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
							that.list.appendChild(todoItem({
								data: data
							}));
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
