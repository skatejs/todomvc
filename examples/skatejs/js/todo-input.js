// import skate from 'skatejs';

(function (exports, skate) {
	'use strict';

	var KEYCODE_ENTER = 13;

	exports.TodoInput = skate('todo-input', {
		extends: 'input',
		events: {
			keyup: function (e) {
				if (e.keyCode === KEYCODE_ENTER) {
					var value = (this.value || '').trim();

					if (!value) {
						return;
					}

					skate.emit(this, 'create', {
						detail: value
					});

					this.value = '';
				}
			}
		},
		created: function (elem) {
			elem.className = 'new-todo';
			elem.setAttribute('placeholder', 'What needs to be done?');
			elem.setAttribute('autofocus', '');
		}
	});
})(window, window.skate);
