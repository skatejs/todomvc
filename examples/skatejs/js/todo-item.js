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
				skate.emit(this, 'edit', { detail: this });
			},
			'click .destroy': function () {
				skate.emit(this, 'destroy', { detail: this });
			},
			'dblclick label': function () {
				util.addClass(this, 'editing');
				this.querySelector('.edit').focus();
			},
			'blur .edit': function (e) {
				this.textContent = e.delegateTarget.value;
				util.removeClass(this, 'editing');
				skate.emit(this, 'edit', { detail: this });
			},
			'keyup .edit': function (e) {
				if (e.keyCode === KEYCODE_ENTER) {
					this.textContent = e.delegateTarget.value;
					util.removeClass(this, 'editing');
					return;
				}

				if (e.keyCode === KEYCODE_ESCAPE) {
					this.querySelector('.edit').blur();
				}
			}
		},

		properties: {
			completed: skate.property.boolean({
				set: function (elem, data) {
					elem.querySelector('.toggle').checked = data.newValue;
				}
			}),
			textContent: skate.property.string({
				attribute: false,
				default: 'New todo',
				set: function (elem, data) {
					elem.querySelector('label').textContent = data.newValue;
					elem.querySelector('.edit').value = data.newValue;
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

		// This component manages it's own render tree. However, it does not conflict
		// with the fact that <todo-app> renders uses a DOM differ to render its tree.
		// The manually managed state here is to demo how components with disparate
		// rendering lifecycles can be used with Skate as Skate has no opinions about
		// how you should be handling it. This means you can use any templating
		// language and render it any way you want for any given component, Skate
		// just gives you the tools to make it easy.
		render: function (state) {
			return `
				<div class="view">
					<input class="toggle" type="checkbox">
					<label></label>
					<button class="destroy"></button>
				</div>
				<input class="edit">
			`;
		}
	});
})(window, window.skate, window.util);
