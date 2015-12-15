(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'skatejs-dom-diff/src/render', 'skatejs'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('skatejs-dom-diff/src/render'), require('skatejs'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.render, global.skate);
		global.todoPerson = mod.exports;
	}
})(this, function (exports, module, _skatejsDomDiffSrcRender, _skatejs) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _render = _interopRequireDefault(_skatejsDomDiffSrcRender);

	var _skate = _interopRequireDefault(_skatejs);

	module.exports = (0, _skate['default'])('todo-person', {
		properties: {
			nick: _skate['default'].properties.string({
				attribute: true,
				set: _skate['default'].render
			}),
			content: {
				set: _skate['default'].render
			}
		},
		render: (0, _render['default'])(function (elem, React) {
			return React.createElement(
				'a',
				{ href: 'http://twitter.com/' + elem.nick },
				elem.content || elem.nick
			);
		})
	});
});