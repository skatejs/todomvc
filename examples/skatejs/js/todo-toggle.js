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
			selected: skate.property.boolean()
		},

		// Similar to the <todo-app> component, this component renders its entire
		// tree. However, this component slams innerHTML, meaning it doesn't do any
		// diffing and patching. This isn't recommended, but like the <todo-item>
		// component managing it's own state, this exists to demonstrate that you
		// can use any template / rendering method you want.
		render: function (state) {
			return `
				<input class="toggle-all" type="checkbox" ${state.selected ? 'checked' : ''}>
				<label for="toggle-all">Mark all as complete</label>
			`;
		},

		// Hulk smash!
		renderer: util.slamInnerHTML
	});
})(window, window.skate, window.util);
