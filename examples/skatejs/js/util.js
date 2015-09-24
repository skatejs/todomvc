(function (exports) {
	'use strict';

	var slice = Array.prototype.slice;

	function getClassNames (elem) {
		return (elem.className || '').split(' ');
	}

	function setClassNames (elem, names) {
		elem.className = names.join(' ');
	}

	exports.util = {
		addClass: function (elem, name) {
			var names = getClassNames(elem);
			if (names.indexOf(name) === -1) {
				names.push(name);
			}
			setClassNames(elem, names);
		},
		removeClass: function (elem, name) {
			var names = getClassNames(elem);
			var index = names.indexOf(name);
			if (index > -1) {
				names.splice(index, 1);
			}
			setClassNames(elem, names);
		},
		toggleClass: function (elem, name, flag) {
			this[flag ? 'addClass' : 'removeClass'](elem, name);
		},
		template: function () {
			var template = slice.call(arguments).join('');
			return function () {
				return template;
			};
		}
	};
}(window));
