// import todoFooter from './todo-footer';
// import todoItem from './todo-item';
// import todoPerson from './todo-person';
// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, todoItem, util) {
	'use strict';

	function getFooter (app) {
		return app.querySelector('todo-footer');
	}

	function getItem (data) {
		return document.getElementById(data.id);
	}

	function getList (app) {
		return app.querySelector('.todo-list');
	}

	function getStore (app) {
		return document.getElementById(app.storeId);
	}

	function setFilter (app, filter) {
		app.filter = filter || app.filter;
	}

	exports.TodoApp = skate('todo-app', {
		events: {
			clear: function () {
				var elem = this;
				this.items.forEach(function (item) {
					if (item.completed) {
						getStore(elem).remove(item);
						getItem(item).remove();
					}
				});
			},
			create: function (e) {
				var item = {
					id: new Date().getTime(),
					textContent: e.detail
				};
				getStore(this).save(item);
				getList(this).appendChild(todoItem(item));
				setFilter(this);
			},
			edit: function (e) {
				getStore(this).save(e.detail.data);
			},
			destroy: function (e) {
				getStore(this).remove(e.target.data);
				getList(this).removeChild(e.target);
			},
			filter: function (e) {
				setFilter(e.detail);
			},
			toggle: function (e) {
				this.items.forEach(function (item) {
					item.completed = !!e.detail;
					getStore(e.delegateTarget).save(item);
					getItem(item).completed = true;
				});
				setFilter(this);
			}
		},
		properties: {
			filter: skate.properties.string({
				default: function () {
					var filter = window.location.hash.split('#/');
					return filter.length === 2 ? filter[1] : '';
				},
				set: function (elem, data) {
					var footer = getFooter(elem);
					footer.count = elem.filtered.length;
					footer.filter = data.newValue;
				}
			}),
			storeId: skate.properties.string({
				attribute: true
			})
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
			get filtered () {
				var filter = this.filter;
				return this.items.filter(function (item) {
					return (filter === 'completed' && item.completed) || (filter === 'active' && !item.completed) || filter === '';
				});
			},
			get items () {
				var store = getStore(this);
				return store ? store.getAll() : [];
			}
		},
		render: skate.render.html(function (elem) {
			return `
				<section class="todoapp">
					<header class="header">
						<h1>todos</h1>
						<input is="todo-input">
					</header>
					<section class="main">
						<todo-toggle></todo-toggle>
						<ul class="todo-list"></ul>
					</section>
					<todo-footer></todo-footer>
				</section>
				<footer class="info">
					<p>Double-click to edit a todo</p>
					<p>Created by <todo-person nick="alexandereardon">Alex Reardon</todo-person> and <todo-person nick="treshugart">Trey Shugart</todo-person></p>
					<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
				</footer>
			`;
		})
	});
})(window, window.skate, window.TodoItem, window.util);
