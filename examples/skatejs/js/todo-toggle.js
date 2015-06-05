(function (exports, skate) {
	'use strict';

	exports.TodoToggle = skate('todo-toggle', {
		attributes: {
			selected: function (elem, diff) {
				elem.querySelector('input[type="checkbox"]').checked = (diff.newValue === 'true' ? true : undefined);
			},
			hidden: {
				created: function (elem) {
					elem.classList.add('hidden');
				},
				removed: function (elem) {
					elem.classList.remove('hidden');
				}
			}
		},
		events: {
			'change input[type="checkbox"]': function (elem, e) {
				elem.dispatchEvent(new CustomEvent('toggle', {
					bubbles: true,
					detail: !!e.target.checked
				}));
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
