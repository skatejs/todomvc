(function (window, storage, skate) {
	'use strict';

	var KEYCODE_ENTER = 13;
	var slice = Array.prototype.slice;

	var TodoItem = skate('todo-item', {
		extends: 'li',
		created: function (elem) {
			elem.todoId = new Date().getTime();
		},
		attributes: {
			todoId: {
				value: undefined
			},
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
			hidden: {
				created: function (elem) {
					elem.classList.add('hidden');
				},
				removed: function (elem) {
					elem.classList.remove('hidden');
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
				elem.dispatchEvent(new CustomEvent('destroy', {
					bubbles: true
				}));
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
		prototype: {
			// this => element
			get data() {
				return {
					id: this.todoId,
					text: this.text,
					completed: !!this.completed
				}
			},
			set data(value) {
				if (!value) {
					return;
				}

				this.completed = value.completed || undefined;
				this.text = value.text;
				this.todoId = value.id;
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

	var TodoApp = skate('todo-app', {

		attributes: {
			filter: {
				value: undefined
			}
		},
		created: function (elem) {
			elem.store = storage.create('localStorage', 'todo-skate');
			console.log(elem.store.getAll());

			elem.store
				.getAll()
				.map(function (data) {
					var todoItem = new TodoItem();
					todoItem.data = data;
					return todoItem
				})
				.forEach(function (todo) {
					elem.list.appendChild(todo);
				})
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
				console.log(e.type);
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

				console.log('dispatching filter after toggle');
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
			elem.innerHTML = `
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input is="todo-input">
          </header>

          <!-- This section should be hidden by default and shown when there are todos -->
          <section class="main">
            <todo-toggle></todo-toggle>
            <ul is="todo-list" class="todo-list"></ul>
          </section>

          <!-- This footer should hidden by default and shown when there are todos -->
          <todo-footer></todo-footer>
        </section>
      `;
		}
	});

	var TodoInput = skate('todo-input', {
		extends: 'input',
		events: {
			keyup: function (elem, e) {
				if (e.keyCode === KEYCODE_ENTER) {
					var value = (elem.value || '').trim();

					if (!value) {
						return;
					}

					elem.dispatchEvent(new CustomEvent('create', {
						bubbles: true,
						detail: value
					}));

					elem.value = '';
				}
			}
		},
		created: function (elem) {
			elem.classList.add('new-todo');
			elem.setAttribute('placeholder', 'What needs to be done?');
			elem.setAttribute('autofocus', '');
		}
	});

	var TodoToggle = skate('todo-toggle', {
		attributes: {
			selected: function (elem, diff) {
				elem.querySelector('input[type="checkbox"]').checked = (diff.newValue === 'true' ? true : undefined);
			},
			hidden: {
				created: function (elem) {
					elem.classList.add('hidden');
				},
				removed: function (elem) {
					elem.classList.remove('hidden');
				}
			}
		},
		events: {
			'change input[type="checkbox"]': function (elem, e) {
				elem.dispatchEvent(new CustomEvent('toggle', {
					bubbles: true,
					detail: !!e.target.checked
				}));
			}
		},
		template: function (elem) {
			elem.innerHTML = `
        <input class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
      `;
		}
	});

	var TodoFooter = skate('todo-footer', {
		attributes: {
			count: function (elem, diff) {
				elem.querySelector('.todo-count strong').textContent = Number(diff.newValue || 0);
			},
			hidden: {
				created: function (elem) {
					elem.classList.add('hidden');
				},
				removed: function (elem) {
					elem.classList.remove('hidden');
				}
			}
		},
		events: {
			'click .filters a': function (elem, e, target) {
				var value = (target.hash || '').replace('#/', '');
				elem.dispatchEvent(new CustomEvent('filter', {
					bubbles: true,
					detail: value
				}));
				elem.selected = value;
			},
			'click .clear-completed': function (elem) {
				elem.dispatchEvent(new CustomEvent('clear', {
					bubbles: true
				}));
			}
		},
		prototype: {
			set selected (value) {
				slice.call(this.querySelectorAll('.filters a'))
					.map(function (anchor) {
						anchor.classList.remove('selected');
						return anchor;
					})
					.filter(function (anchor) {
						var type = anchor.hash.replace('#/', '');
						return type === value;
					})
					.forEach(function (anchor) {
						anchor.classList.add('selected');
					});
			}
		},
		template: function (element) {
			element.innerHTML = `
        <footer class="footer">
          <span class="todo-count"><strong>0</strong> item left</span>

          <ul class="filters">
            <li><a class="selected" href="#/">All</a></li>
            <li><a href="#/active">Active</a></li>
            <li><a href="#/completed">Completed</a></li>
          </ul>

          <button class="clear-completed">Clear completed</button>
        </footer>
      `;
		}
	});

	var TodoList = skate('todo-list', {
		// TODO: storage?
		extends: 'ul',
		events: {
			destroy: function (elem, e) {
				elem.removeChild(e.target);
			}
		},
		prototype: {
			// override original remove function

			get completed () {
				return this.items.filter(function (todo) {
					return todo.completed;
				});
			},
			get active () {
				return this.items.filter(function (todo) {
					return !todo.completed;
				});
			},
			get items () {
				return slice.call(this.children);
			},
			get length () {
				return this.children.length;
			}
		}
	});


})(window, window.storage, window.skate);
