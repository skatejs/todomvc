(function (exports, skate) {
	'use strict';

	var KEYCODE_ENTER = 13;
	var KEYCODE_ESCAPE = 27;

	exports.TodoItem = skate('todo-item', {
		extends: 'li',
		events: {
			'change .toggle': function (e) {
				this.completed = e.delegateTarget.checked;
			},
			'click .destroy': function () {
				skate.emit(this, 'destroy', { detail: this });
			},
			'dblclick label': function () {
				var edit = this.querySelector('.edit');
				this.value = this.text;
				this.classList.add('editing');
				edit.focus();
			},
			'blur .edit': function (e) {
				this.text = e.delegateTarget.value;
				this.classList.remove('editing');
			},
			'keyup .edit': function (e) {
				if (e.keyCode === KEYCODE_ENTER) {
					this.text = e.delegateTarget.value;
					this.classList.remove('editing');
					return;
				}

				if (e.keyCode === KEYCODE_ESCAPE) {
					this.querySelector('.edit').blur();
				}
			}
		},
		properties: {
			id: {
				attr: true,
				init: function () {
					return new Date().getTime();
				}
			},
			completed: {
				attr: true,
				type: Boolean,
				init: false,
				set: function (value) {
					skate.emit(this, 'completed', { detail: this });
					this.classList[value ? 'add' : 'remove']('completed');
					this.querySelector('input[type="checkbox"]').checked = value;
				}
			},
			editing: {
				attr: true,
				type: Boolean,
				init: false,
				set: function (value) {
					this.classList[value ? 'add' : 'remove']('editing');
				}
			},
			hidden: {
				attr: true,
				type: Boolean,
				init: false,
				set: function (value) {
					this.classList[value ? 'add' : 'remove']('hidden');
				}
			},
			text: {
				type: String,
				init: 'New todo',
				set: function (value) {
					this.querySelector('label').textContent = value.trim();
				}
			}
		},
		prototype: {
			get data () {
				return {
					id: this.id,
					text: this.text,
					completed: !!this.completed
				};
			},
			set data (value) {
				if (!value) {
					return;
				}

				this.completed = value.completed || undefined;
				this.text = value.text;
				this.id = value.id;
			}
		},
		template: todomvc.template(
			'<div class="view">',
				'<input class="toggle" type="checkbox">',
				'<label>Taste JavaScript</label>',
				'<button class="destroy"></button>',
			'</div>',
			'<input class="edit" value="Create a TodoMVC template">'
		)
	});
})(window, window.skate);
