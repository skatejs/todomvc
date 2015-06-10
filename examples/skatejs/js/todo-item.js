(function (exports, skate) {
	'use strict';

	var KEYCODE_ENTER = 13;
	var KEYCODE_ESCAPE = 27;

	exports.TodoItem = skate('todo-item', {
		extends: 'li',
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
				var edit = elem.querySelector('.edit');
				edit.value = elem.text;
				elem.classList.add('editing');
				edit.focus();
			},
			'blur .edit': function (elem, e, target) {
				elem.text = target.value;
				elem.classList.remove('editing');
			},
			'keyup .edit': function (elem, e, target) {
				if (e.keyCode === KEYCODE_ENTER) {
					elem.text = target.value;
					elem.classList.remove('editing');
					return;
				}

				if (e.keyCode === KEYCODE_ESCAPE) {
					elem.querySelector('.edit').blur();
				}
			}
		},
		properties: {
			todoId: {
				value: function () {
					return new Date().getTime();
				}
			},
			completed: {
				attr: true,
				type: Boolean,
				set: function (value) {
					this.classList[value ? 'add' : 'remove']('completed');
					this.querySelector('input[type="checkbox"]').checked = value;
					this.dispatchEvent(new CustomEvent('completed', {
						bubbles: true,
						detail: value
					}));
				}
			},
			editing: {
				attr: true,
				type: Boolean,
				set: function (value) {
					this.classList[value ? 'add' : 'remove']('editing');
				}
			},
			hidden: {
				attr: true,
				type: Boolean,
				set: function (value) {
					this.classList[value ? 'add' : 'remove']('hidden');
				}
			},
			text: {
				type: String,
				set: function (value) {
					this.querySelector('label').textContent = value.trim();
				}
			}
		},
		prototype: {
			get data() {
				return {
					id: this.todoId,
					text: this.text,
					completed: !!this.completed
				};
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
			elem.innerHTML =
				'<div class="view">' +
				'  <input class="toggle" type="checkbox">' +
				'  <label>Taste JavaScript</label>' +
				'  <button class="destroy"></button>' +
				'</div>' +
				'<input class="edit" value="Create a TodoMVC template">';
		}
	});
})(window, window.skate);
