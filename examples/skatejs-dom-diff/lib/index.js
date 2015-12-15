(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'todomvc-common/base', './todo-app', './todo-store'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('todomvc-common/base'), require('./todo-app'), require('./todo-store'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.base, global.TodoApp, global.TodoStore);
		global.index = mod.exports;
	}
})(this, function (exports, module, _todomvcCommonBase, _todoApp, _todoStore) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _TodoApp = _interopRequireDefault(_todoApp);

	var _TodoStore = _interopRequireDefault(_todoStore);

	module.exports = {
		TodoApp: _TodoApp['default'],
		TodoStore: _TodoStore['default']
	};
});