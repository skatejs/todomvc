// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, util) {
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
				update: function (elem, data) {
					elem.querySelector('input[type="checkbox"]').checked = data.newValue;
				}
			},
			hidden: {
				attr: true,
				type: Boolean,
				update: function (elem, data) {
					util.toggleClass(elem, 'hidden', data.newValue);
				}
			}
		},
		render: util.template(
      '<input class="toggle-all" type="checkbox">',
      '<label for="toggle-all">Mark all as complete</label>'
		)
	});
})(window, window.skate, window.util);
