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
				elem.__hasDiffer = true;
				skateDomDiff.merge({
					source: elem,
					destination: skate.fragment(render()),
					descend: function (src) {
						// Ingore elements that don't want to be diffed. This allows for seamless
						// integration between components that need to be responsible for their
						// own render tree. You can remove this check and have the top component
						// responsible for diffing and building the entire tree but that means
						// that all of your components should follow the same rendering method.
						return src.hasAttribute && !src.hasAttribute('data-skate-ignore-diff');
					}
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
