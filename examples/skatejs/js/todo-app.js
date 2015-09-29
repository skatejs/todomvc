// import './todo-footer';
// import './todo-list';
// import skate from 'skatejs';
// import skateDomDiff from 'skatejs-dom-diff';
// import todoFooter from './todo-footer';
// import todoItem from './todo-item';
// import util from './util';

(function (exports, skate, skateDomDiff, todoItem, util) {
	'use strict';

	function filter (filter) {
		return function (item) {
			return (filter === 'completed' && item.completed) || (filter === 'active' && !item.completed) || true;
		};
	}

	exports.TodoApp = skate('todo-app', {
		events: {
			clear: function () {
				var elem = this;
				this.items.forEach(function (item) {
					if (item.completed) {
						elem.store.remove(item);
					}
				});
				this.filter = this.filter;
			},
			create: function (e) {
				var item = {
					id: new Date().getTime(),
					textContent: e.detail
				};
				this.store.save(item);
				this.filter = this.filter;
			},
			edit: function (e) {
				this.store.save(e.detail.data);
				this.filter = this.filter;
			},
			destroy: function (e) {
				this.store.remove(e.target.data);
				this.filter = this.filter;
			},
			filter: function (e) {
				this.filter = e.detail;
			},
			toggle: function (e) {
				var store = this.store;
				this.items.forEach(function (item) {
					item.completed = !!e.detail;
					store.save(item);
				});
				this.filter = this.filter;
			}
		},
		properties: {
			filter: skate.property.string({
				emit: true,
				default: function () {
					return window.location.hash.split('#/')[1];
				}
			}),
			storeId: skate.property.string()
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
				return this.store.getAll();
			},
			get store () {
				return document.getElementById(this.storeId);
			}
		},
		render: function (elem) {
			return `
				<section class="todoapp">
					<header class="header">
						<h1>todos</h1>
						<input is="todo-input">
					</header>
					<section class="main">
						<todo-toggle ${elem.items.length && elem.items.length === elem.completed.length ? 'selected' : ''}></todo-toggle>
						<ul is="todo-list" class="todo-list">
							${elem.filtered.map(function (item) {
								return `<li is="todo-item" id="${item.id}" ${item.completed ? 'completed' : ''} data-skate-ignore-diff>${item.textContent}</li>`;
							}).join('')}
						</ul>
					</section>
					${elem.items.length ? `
						<todo-footer count="${elem.active.length}" filter="${elem.filter}"></todo-footer>
					` : ''}
				</section>
			`;
		},
		renderer: util.domDiff
	});
})(window, window.skate, window.skateDomDiff, window.TodoItem, window.util);
