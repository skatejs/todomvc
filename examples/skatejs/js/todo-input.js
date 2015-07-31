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
		created: function () {
			this.className = 'new-todo';
			this.setAttribute('placeholder', 'What needs to be done?');
			this.setAttribute('autofocus', '');
		}
	});
})(window, window.skate);
