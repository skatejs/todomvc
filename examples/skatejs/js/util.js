// import skateDomDiff from 'skatejs-dom-diff';

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

		// The DOM differ is used for the main app component as it is the most
		// complex component in this app, but isn't used for the others to show how
		// to use separate rendering methods.
		domDiff: function (elem, render) {
			function doRender () {
				skateDomDiff.merge({
					source: elem,
					destination: skate.fragment(render())
				});
				return doRender;
			}
			elem.addEventListener('skate.property', doRender());
		},

		// Though this method isn't recommended, it's here to show how Skate allows
		// you to integrate complex component trees with completely different ways
		// of rendering.
		slamInnerHtml: function (elem, render) {
			function doRender () {
				elem.innerHTML = render();
				return doRender;
			}
			elem.addEventListener('skate.property', doRender());
		}
	};
}(window));
