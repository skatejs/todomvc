(function (exports, skate, todoItem) {
	'use strict';

	function filterItem (filter, item) {
		item.hidden = filter === 'completed' && !item.completed || filter === 'active' && item.completed;
	}

	exports.TodoApp = skate('todo-app', {
		events: {
			clear: function () {
				var that = this;
				this.footer.hidden = this.footer.count === 0;
				this.toggle.selected = false;
				this.list.completed.forEach(function (item) {
					item.remove();
					that.store.remove(item.data);
				});
			},
			completed: function (e) {
				if (e.detail.completed) {
					this.footer.count--;
				} else {
					this.footer.count++;
				}

				this.toggle.selected = this.list.items.length === this.list.completed.length;
				filterItem(this.footer.filter, e.detail);
				this.store.save(e.detail.data);
			},
			create: function (e) {
				var item = todoItem({
					text: e.detail
				});

				filterItem(this.footer.filter, item);
				this.footer.count++;
				this.footer.hidden = false;
				this.list.appendChild(item);
				this.store.save(item.data);
			},
			destroy: function (e) {
				if (!e.detail.completed) {
					this.footer.count--;
				}

				this.footer.hidden = this.footer.count === 0;
				this.store.remove(e.target.data);
			},
			filter: function () {
				this.list.items.forEach(filterItem.bind(null, this.footer.filter));
			},
			toggle: function (e) {
				this.list.items.forEach(function (item) {
					item.completed = e.detail;
				});
			}
		},
		properties: {
			storageId: {
				attr: true,
				set: function (value) {
					var that = this;
					this.store = document.getElementById(value);
					this.list.innerHTML = '';
					this.store.getAll().forEach(function (data) {
						var item = todoItem(data);

						that.list.appendChild(item);
						filterItem(that.footer.filter, item);

						if (!item.completed) {
							that.footer.count++;
						}
					});

					this.footer.hidden = this.list.items.length === 0;
					this.toggle.selected = this.list.items.length > 0 && this.list.items.length === this.list.completed.length;
				}
			}
		},
		prototype: {
			get footer () {
				return this.querySelector('todo-footer');
			},
			get list () {
				return this.querySelector('[is=todo-list]');
			},
			get toggle () {
				return this.querySelector('todo-toggle');
			}
		},
		template: todomvc.template(
			'<section class="todoapp">',
				'<header class="header">',
					'<h1>todos</h1>',
					'<input is="todo-input">',
				'</header>',
				'<section class="main">',
					'<todo-toggle></todo-toggle>',
					'<ul is="todo-list" class="todo-list"></ul>',
				'</section>',
				'<todo-footer></todo-footer>',
			'</section>'
		)
	});
})(window, window.skate, window.TodoItem);
