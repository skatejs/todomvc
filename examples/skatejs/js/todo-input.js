(function (exports, skate) {
	'use strict';

	var KEYCODE_ENTER = 13;

	exports.TodoInput = skate('todo-input', {
		extends: 'input',
		events: {
			keyup: function (elem, e) {
				if (e.keyCode === KEYCODE_ENTER) {
					var value = (elem.value || '').trim();

					if (!value) {
						return;
					}

					elem.dispatchEvent(new CustomEvent('create', {
						bubbles: true,
						detail: value
					}));

					elem.value = '';
				}
			}
		},
		created: function (elem) {
			elem.classList.add('new-todo');
			elem.setAttribute('placeholder', 'What needs to be done?');
			elem.setAttribute('autofocus', '');
		}
	});
})(window, window.skate);
