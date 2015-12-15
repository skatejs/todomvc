// import skate from 'skatejs';

(function (exports, skate) {
	'use strict';

	function getInput (toggle) {
		return toggle.querySelector('input');
	}

	exports.TodoToggle = skate('todo-toggle', {
		events: {
			'change input': function (e) {
				skate.emit(this, 'toggle', {
					detail: e.currentTarget.checked
				});
			}
		},
		properties: {
			selected: skate.properties.boolean({
				set: function (elem, data) {
					getInput(elem).checked = !!data.newValue;
				}
			})
		},
		render: skate.render.html(function () {
			return `
				<input class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
			`;
		})
	});
})(window, window.skate);
