(function (window, skate) {
	'use strict';

	var KEYCODE_ENTER = 13;
	var slice = Array.prototype.slice;

	skate('todo-list', {
		events: {
			'keyup .new-todo': function (elem, e, target) {
				if (e.keyCode === KEYCODE_ENTER) {
					var todoItem = new TodoItem();
					todoItem.text = target.value;
					elem.todoList.appendChild(todoItem);
					target.value = '';
					elem.querySelector('.todo-count strong').textContent = elem.todosIncomplete.length;
				}
			},
			destroy: function (elem, e) {
				elem.todoList.removeChild(e.target);
				elem.querySelector('.todo-count strong').textContent = elem.todosIncomplete.length;
				elem.querySelector('.clear-completed').classList[elem.todosCompleted.length ? 'remove' : 'add']('hidden');
			},
			completed: function (elem, e) {
				elem.querySelector('.todo-count strong').textContent = elem.todosIncomplete.length;
				elem.querySelector('.clear-completed').classList[elem.todosCompleted.length ? 'remove' : 'add']('hidden');
			}
		},
		prototype: {
			get todos () {
				return slice.call(this.todoList.children);
			},

			get todosCompleted () {
				return this.todos.filter(function (todo) {
					return todo.completed;
				});
			},

			get todosIncomplete () {
				return this.todos.filter(function (todo) {
					return !todo.completed;
				});
			},

			get todoList () {
				return this.querySelector('.todo-list');
			}
		},
		template: function (elem) {
			elem.innerHTML = `
				<section class="todoapp">
					<header class="header">
						<h1>todos</h1>
						<input class="new-todo" placeholder="What needs to be done?" autofocus>
					</header>

					<!-- This section should be hidden by default and shown when there are todos -->
					<section class="main">
						<input class="toggle-all" type="checkbox">
						<label for="toggle-all">Mark all as complete</label>

						<!-- <li is="todo-item"> go here. -->
						<ul class="todo-list"></ul>
					</section>

					<!-- This footer should hidden by default and shown when there are todos -->
					<footer class="footer">
						<!-- This should be "0 items left" by default -->
						<span class="todo-count"><strong>0</strong> item left</span>

						<!-- Remove this if you don't implement routing -->
						<ul class="filters">
							<li>
								<a class="selected" href="#/">All</a>
							</li>
							<li>
								<a href="#/active">Active</a>
							</li>
							<li>
								<a href="#/completed">Completed</a>
							</li>
						</ul>

						<!-- Hidden if no completed items are left ↓ -->
						<button class="clear-completed">Clear completed</button>
					</footer>
				</section>
			`;
		}
	});

	var TodoItem = skate('todo-item', {
		extends: 'li',
		attributes: {
			completed: {
				created: function (elem) {
					elem.classList.add('completed');
					elem.querySelector('input[type="checkbox"]').checked = true;
					elem.dispatchEvent(new CustomEvent('completed', {
						bubbles: true,
						detail: true
					}));
				},
				removed: function (elem) {
					elem.classList.remove('completed');
					elem.querySelector('input[type="checkbox"]').checked = false;
					elem.dispatchEvent(new CustomEvent('completed', {
						bubbles: true,
						detail: false
					}));
				}
			},
			editing: {
				created: function (elem) {
					elem.classList.add('editing');
				},
				removed: function (elem) {
					elem.classList.remove('editing');
				}
			},
			text: function (elem, diff) {
				elem.querySelector('label').textContent = diff.newValue.trim();
			}
		},
		events: {
			'change .toggle': function (elem, e, target) {
				elem.completed = target.checked ? true : undefined;
			},
			'click .destroy': function (elem) {
				elem.dispatchEvent(new CustomEvent('destroy', { bubbles: true }));
			},
			'dblclick label': function (elem) {
				elem.querySelector('.edit').value = elem.text;
				elem.classList.add('editing');
			},
			'blur .edit': function (elem, e, target) {
				elem.text = target.value;
				elem.classList.remove('editing');
			},
			'keyup .edit': function (elem, e, target) {
				if (e.keyCode === KEYCODE_ENTER) {
					elem.text = target.value;
					elem.classList.remove('editing');
				}
			}
		},
		template: function (elem) {
			elem.innerHTML = `
				<div class="view">
					<input class="toggle" type="checkbox">
					<label>Taste JavaScript</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" value="Create a TodoMVC template">
			`;
		}
	});

})(window, window.skate);
