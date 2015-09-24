// import './todo-footer';
// import './todo-list';
// import skate from 'skatejs';
// import todoItem from './todo-item';
// import util from './util';

(function (exports, skate, todoItem, util) {
	'use strict';

	function filterItem (filter, item) {
		item.hidden = filter === 'completed' && !item.completed || filter === 'active' && item.completed;
	}

	exports.TodoApp = skate('todo-app', {
		events: {
			clear: function () {
				this.footer.hidden = this.footer.count === 0;
				this.toggle.selected = false;
				this.list.completed.forEach(function (item) {
					item.remove();
					this.store.remove(item.data);
				}.bind(this));
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
			edited: function (e) {
				this.store.save(e.detail.data);
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
				update: function (elem, data) {
					elem.store = document.getElementById(data.newValue);
					elem.list.innerHTML = '';
					elem.store.getAll().forEach(function (data) {
						var item = todoItem(data);

						elem.list.appendChild(item);
						filterItem(that.footer.filter, item);

						if (!item.completed) {
							elem.footer.count++;
						}
					});

					elem.footer.hidden = elem.list.items.length === 0;
					elem.toggle.selected = elem.list.items.length > 0 && elem.list.items.length === elem.list.completed.length;
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
		render: util.template(
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
})(window, window.skate, window.TodoItem, window.util);
