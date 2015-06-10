(function (exports, skate) {
	'use strict';

	exports.TodoToggle = skate('todo-toggle', {
		events: {
			'change input[type="checkbox"]': function (elem, e) {
				elem.dispatchEvent(new CustomEvent('toggle', {
					bubbles: true,
					detail: !!e.target.checked
				}));
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
					this.classList[value ? 'add' : 'remove']('hidden');
				}
			}
		},
		template: function (elem) {
			elem.innerHTML = `
        <input class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
      `;
		}
	});
})(window, window.skate);
