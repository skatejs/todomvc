(function (exports) {
	'use strict';

	var slice = Array.prototype.slice;

	function classNames (elem) {
		return (elem.className || '').split(' ');
	}

	exports.util = {
		addClass: function (elem, name) {
			var names = classNames(elem);
			if (names.indexOf(name) === -1) {
				names.push(name);
			}
		},
		removeClass: function (elem, name) {
			var names = classNames(elem);
			var index = names.indexOf(name);
			if (index > -1) {
				names.splict(index, 1);
			}
		},
		toggleClass: function (elem, name, flag) {
			this[flag ? 'addClass' : 'removeClass'](elem, name);
		},
		template: function () {
			var template = slice.call(arguments).join('');
			return function () {
				this.innerHTML = template;
			};
		}
	};
}(window));
