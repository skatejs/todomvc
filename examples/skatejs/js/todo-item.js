// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, util) {
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
				util.addClass(this, 'editing');
				edit.focus();
			},
			'blur .edit': function (e) {
				this.text = e.delegateTarget.value;
				util.removeClass(this, 'editing');
			},
			'keyup .edit': function (e) {
				if (e.keyCode === KEYCODE_ENTER) {
					this.text = e.delegateTarget.value;
					util.removeClass(this, 'editing');
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
					util.toggleClass(this, 'completed', value);
					this.querySelector('input[type="checkbox"]').checked = value;
				}
			},
			editing: {
				attr: true,
				type: Boolean,
				init: false,
				set: function (value) {
					util.toggleClass(this, 'editing', value);
				}
			},
			hidden: {
				attr: true,
				type: Boolean,
				init: false,
				set: function (value) {
					util.toggleClass(this, 'hidden', value);
				}
			},
			text: {
				type: String,
				init: 'New todo',
				set: function (value) {
					value = value.trim();
					this.querySelector('label').textContent = value;
					this.querySelector('.edit').value = value;
					skate.emit(this, 'edited', {
						detail: this
					});
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
		template: util.template(
			'<div class="view">',
				'<input class="toggle" type="checkbox">',
				'<label>Taste JavaScript</label>',
				'<button class="destroy"></button>',
			'</div>',
			'<input class="edit" value="Create a TodoMVC template">'
		)
	});
})(window, window.skate, window.util);
