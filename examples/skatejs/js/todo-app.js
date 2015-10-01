// import './todo-footer';
// import './todo-item';
// import './todo-person';
// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, todoItem, util) {
	'use strict';

	function filter (filter) {
		return function (item) {
			return (filter === 'completed' && item.completed) || (filter === 'active' && !item.completed) || true;
		};
	}

	exports.TodoApp = skate('todo-app', {
		// Events are used to communicate from descendant to parent to decouple them
		// from each other. That way, descendants do not impose a particular DOM
		// structure and can be used anywhere if need be because it's up to the
		// parent to respond to events any way they see fit.
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
					var filter = window.location.hash.split('#/');
					return filter.length === 2 ? filter[1] : '';
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

		// This component is the top-level component. It renders the entire app tree.
		// It uses a DOM differ to diff and patch the tree based on its state. Though
		// a good pattern to use when rendering a large DOM that will change often,
		// it's not the only way you can manage the DOM tree using Skate. You can
		// use anything you want to render your component. You could also have just
		// used your property setters to mutate state as some of the other components
		// do. Though this can be more problematic due to side effects and managing
		// mutable state, Skate isn't going to stop you.
		render: function (elem) {
			return `
				<section class="todoapp">
					<header class="header">
						<h1>todos</h1>
						<input is="todo-input">
					</header>
					<section class="main">
						${elem.items.length ? `
							<todo-toggle ${elem.items.length && elem.items.length === elem.completed.length ? 'selected' : ''} data-skate-ignore-diff></todo-toggle>
						` : ''}
						<ul class="todo-list">
							${elem.filtered.map(function (item) {
								return `<li is="todo-item" id="${item.id}" ${item.completed ? 'completed' : ''} data-skate-ignore-diff>${item.textContent}</li>`;
							}).join('')}
						</ul>
					</section>
					${elem.items.length ? `
						<todo-footer count="${elem.active.length}" filter="${elem.filter}"></todo-footer>
					` : ''}
				</section>
				<footer class="info">
					<p>Double-click to edit a todo</p>
					<p>Created by <todo-person nick="alexandereardon">Alex Reardon</todo-person> and <todo-person nick="treshugart">Trey Shugart</todo-person></p>
					<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
				</footer>
			`;
		},

		// Diff and patch instead of hitting innerHTML with allthethings.
		renderer: util.domDiff
	});
})(window, window.skate, window.TodoItem, window.util);
