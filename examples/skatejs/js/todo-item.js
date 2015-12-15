// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, util) {
	'use strict';

	var KEYCODE_ENTER = 13;
	var KEYCODE_ESCAPE = 27;

	function getEdit (item) {
		return item.querySelector('.edit');
	}

	function getLabel (item) {
		return item.querySelector('label');
	}

	function getToggle (item) {
		return item.querySelector('.toggle');
	}

	exports.TodoItem = skate('todo-item', {
		extends: 'li',
		events: {
			'change .toggle': function (e) {
				this.completed = e.currentTarget.checked;
				skate.emit(this, 'edit', { detail: this });
			},
			'click .destroy': function () {
				skate.emit(this, 'destroy', { detail: this });
			},
			'dblclick label': function () {
				util.addClass(this, 'editing');
				getEdit(this).focus();
			},
			'blur .edit': function (e) {
				this.textContent = e.currentTarget.value;
				util.removeClass(this, 'editing');
				skate.emit(this, 'edit', { detail: this });
			},
			'keyup .edit': function (e) {
				if (e.keyCode === KEYCODE_ENTER) {
					this.textContent = e.currentTarget.value;
					util.removeClass(this, 'editing');
					return;
				}

				if (e.keyCode === KEYCODE_ESCAPE) {
					getEdit(this).blur();
				}
			}
		},
		properties: {
			completed: skate.properties.boolean({
				set: function (elem, data) {
					getToggle(elem).checked = data.newValue;
				}
			}),
			textContent: skate.properties.string({
				attribute: false,
				default: 'New todo',
				set: function (elem, data) {
					getLabel(elem).textContent = data.newValue;
					getEdit(elem).value = data.newValue;
				}
			})
		},
		prototype: {
			get data () {
				return {
					completed: this.completed,
					id: this.id,
					textContent: this.textContent
				};
			}
		},
		render: skate.render.html(function () {
			return `
				<div class="view">
					<input class="toggle" type="checkbox">
					<label></label>
					<button class="destroy"></button>
				</div>
				<input class="edit">
			`;
		})
	});
})(window, window.skate, window.util);
