(function (exports) {
	'use strict';

	var slice = Array.prototype.slice;

	exports.todomvc = {
		template: function () {
			var template = slice.call(arguments).join('');
			return function () {
				this.innerHTML = template;
			};
		}
	};
}(window));
