// import skate from 'skatejs';
// import todoMvc from './util';

(function (exports, skate, todoMvc) {
	'use strict';

	exports.TodoToggle = skate('todo-toggle', {
		events: {
			'change input[type="checkbox"]': function (e) {
				skate.emit(this, 'toggle', {
					detail: !!e.target.checked
				});
			}
		},
		properties: {
			selected: {
				attr: true,
				type: Boolean,
				set: function (value) {
					this.querySelector('input[type="checkbox"]').checked = value;
				}
			},
			hidden: {
				attr: true,
				type: Boolean,
				set: function (value) {
					util.toggleClass(this, 'hidden', value);
				}
			}
		},
		template: todoMvc.template(
      '<input class="toggle-all" type="checkbox">',
      '<label for="toggle-all">Mark all as complete</label>'
		)
	});
})(window, window.skate, window.todoMvc);
