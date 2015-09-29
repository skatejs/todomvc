// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, util) {
	'use strict';

	exports.TodoToggle = skate('todo-toggle', {
		events: {
			'change input': function (e) {
				skate.emit(this, 'toggle', {
					detail: !!e.delegateTarget.checked
				});
			}
		},
		properties: {
			selected: skate.property.boolean({
				set: function (elem, data) {
					elem.querySelector('input[type="checkbox"]').checked = data.newValue;
				}
			}),
			hidden: skate.property.boolean({
				set: function (elem, data) {
					util.toggleClass(elem, 'hidden', data.newValue);
				}
			})
		},
		render: function () {
			return `
				<input class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
			`;
		}
	});
})(window, window.skate, window.util);
