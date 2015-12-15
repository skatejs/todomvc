(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'skatejs-dom-diff/src/render', 'skatejs', './todo-person'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('skatejs-dom-diff/src/render'), require('skatejs'), require('./todo-person'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.render, global.skate, global.TodoPerson);
		global.todoApp = mod.exports;
	}
})(this, function (exports, module, _skatejsDomDiffSrcRender, _skatejs, _todoPerson) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _render = _interopRequireDefault(_skatejsDomDiffSrcRender);

	var _skate = _interopRequireDefault(_skatejs);

	var _TodoPerson = _interopRequireDefault(_todoPerson);

	var KEYCODE_ENTER = 13;
	var KEYCODE_ESCAPE = 27;

	function filter(filter) {
		return function (item) {
			return filter === '' || item.completed && filter === 'completed' || !item.completed && filter === 'active';
		};
	}

	function getStore(app) {
		return document.getElementById(app.storeId);
	}

	module.exports = (0, _skate['default'])('todo-app', {
		events: {
			create: function create(e) {
				getStore(this).save(e.detail.data);
				this.items = getStore(this).getAll();
			},
			edit: function edit(e) {
				getStore(this).save(e.detail.data);
				this.items = getStore(this).getAll();
			},
			destroy: function destroy(e) {
				getStore(this).remove(e.target.data);
				this.items = getStore(this).getAll();
			},
			'click .clear-completed': function clickClearCompleted() {
				this.items.forEach((function (item) {
					if (item.completed) {
						getStore(this).remove(item);
					}
				}).bind(this));
				this.items = [];
			},
			'click .filters a': function clickFiltersA(e) {
				this.filter = e.currentTarget.href.split('#/')[1];
			},
			'change .toggle-all': function changeToggleAll(e) {
				this.selectAll = e.currentTarget.checked;
			},
			'keyup .new-todo': function keyupNewTodo(e) {
				if (e.keyCode !== KEYCODE_ENTER) {
					return;
				}

				var input = e.currentTarget;
				var store = getStore(this);
				var value = (input.value || '').trim();

				if (!value) {
					return;
				}

				store.save({
					id: new Date().getTime(),
					content: value
				});

				this.items = store.getAll();
				input.value = '';
			}
		},
		properties: {
			editing: _skate['default'].properties.number({
				set: function set(elem, data) {
					_skate['default'].render(elem);
					if (data.newValue) {
						var edit = document.getElementById('todo-item-' + data.newValue).querySelector('.edit');
						edit.focus();
						edit.select();
					} else if (data.oldValue) {
						document.getElementById('todo-item-' + data.oldValue).querySelector('.edit').blur();
					}
				}
			}),
			filter: _skate['default'].properties.string({
				'default': function _default() {
					var filter = window.location.hash.split('#/');
					return filter.length === 2 ? filter[1] : '';
				},
				set: _skate['default'].render
			}),
			items: {
				'default': function _default() {
					return [];
				},
				set: _skate['default'].render
			},
			storeId: _skate['default'].properties.string({
				attribute: true,
				set: _skate['default'].render
			})
		},
		prototype: Object.defineProperties({}, {
			active: {
				get: function get() {
					return this.items.filter(function (item) {
						return !item.completed;
					});
				},
				configurable: true,
				enumerable: true
			},
			completed: {
				get: function get() {
					return this.items.filter(function (item) {
						return item.completed;
					});
				},
				configurable: true,
				enumerable: true
			}
		}),
		created: function created(elem) {
			elem.items = getStore(elem).getAll();
		},
		render: (0, _render['default'])(function (elem, React) {
			var store = getStore(elem);
			return React.createElement(
				'div',
				null,
				React.createElement(
					'section',
					{ 'class': 'todoapp' },
					React.createElement(
						'header',
						{ 'class': 'header' },
						React.createElement(
							'h1',
							null,
							'todos'
						),
						React.createElement('input', { autofocus: true, 'class': 'new-todo', placeholder: 'What needs to be done?' })
					),
					React.createElement(
						'section',
						{ 'class': 'main' },
						elem.items.length ? React.createElement('input', { 'class': 'toggle-all', type: 'checkbox', checked: elem.completed.length === elem.items.length, onchange: function (e) {
								elem.items.forEach(function (item) {
									store.save({
										completed: e.target.checked,
										content: item.content,
										id: item.id
									});
								});
								elem.items = store.getAll();
							} }) : '',
						React.createElement(
							'label',
							{ 'for': 'toggle-all' },
							'Mark all as complete'
						),
						React.createElement(
							'ul',
							{ 'class': 'todo-list' },
							elem.items.filter(filter(elem.filter)).map(function (item) {
								return React.createElement(
									'li',
									{ id: 'todo-item-' + item.id, 'class': elem.editing === item.id ? 'editing' : '', ondblclick: function () {
											return elem.editing = item.id;
										} },
									React.createElement(
										'div',
										{ 'class': 'view' },
										React.createElement('input', { 'class': 'toggle', type: 'checkbox', checked: item.completed, onchange: function (e) {
												store.save({
													completed: e.target.checked,
													content: item.content,
													id: item.id
												});
												elem.items = store.getAll();
											} }),
										React.createElement(
											'label',
											null,
											item.content
										),
										React.createElement('button', { 'class': 'destroy', onclick: function () {
												store.remove(item);
												elem.items = store.getAll();
											} })
									),
									React.createElement('input', { 'class': 'edit', value: item.content, onblur: function () {
											return elem.editing = false;
										}, onkeyup: function (e) {
											if (e.keyCode === KEYCODE_ENTER) {
												elem.editing = false;
												elem.items = store.getAll();
											} else if (e.keyCode === KEYCODE_ESCAPE) {
												e.target.value = item.content;
												elem.editing = false;
											}
										}, onchange: function (e) {
											store.save({
												completed: item.completed,
												content: e.target.value,
												id: item.id
											});
											elem.items = store.getAll();
										} })
								);
							})
						)
					),
					elem.items.length ? React.createElement(
						'footer',
						{ 'class': 'footer' },
						React.createElement(
							'span',
							{ 'class': 'todo-count' },
							React.createElement(
								'strong',
								null,
								elem.active.length.toString()
							),
							' ',
							React.createElement(
								'span',
								null,
								'item',
								elem.active.length === 1 ? '' : 's',
								' left'
							)
						),
						React.createElement(
							'ul',
							{ 'class': 'filters' },
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: '#/', 'class': elem.filter === '' ? 'selected' : '' },
									'All'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: '#/active', 'class': elem.filter === 'active' ? 'selected' : '' },
									'Active'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: '#/completed', 'class': elem.filter === 'completed' ? 'selected' : '' },
									'Completed'
								)
							)
						),
						React.createElement(
							'button',
							{ 'class': 'clear-completed' },
							'Clear completed'
						)
					) : ''
				),
				React.createElement(
					'footer',
					{ 'class': 'info' },
					React.createElement(
						'p',
						null,
						'Double-click to edit a todo'
					),
					React.createElement(
						'p',
						null,
						'Created by ',
						React.createElement(
							_TodoPerson['default'],
							{ nick: 'chrisdarroch' },
							'Chris Darroch'
						),
						' and ',
						React.createElement(
							_TodoPerson['default'],
							{ nick: 'treshugart' },
							'Trey Shugart'
						),
						'.'
					),
					React.createElement(
						'p',
						null,
						'Part of ',
						React.createElement(
							'a',
							{ href: 'http://todomvc.com' },
							'TodoMVC'
						)
					)
				)
			);
		})
	});
});