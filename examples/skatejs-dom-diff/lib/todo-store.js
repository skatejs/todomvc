(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'skatejs'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('skatejs'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.skate);
		global.todoStore = mod.exports;
	}
})(this, function (exports, module, _skatejs) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _skate = _interopRequireDefault(_skatejs);

	var store = window.localStorage;

	module.exports = (0, _skate['default'])('todo-store', {
		properties: {
			keyPrefix: _skate['default'].properties.string({
				attribute: true,
				'default': 'todo-skatejs'
			})
		},
		prototype: {
			getKey: function getKey(id) {
				return this.keyPrefix + '-' + id;
			},
			getItemFromKey: function getItemFromKey(key) {
				return JSON.parse(store.getItem(key));
			},
			getItem: function getItem(id) {
				return this.getItemFromKey(this.getKey(id));
			},
			getAll: function getAll() {
				return Object.keys(store)
				// only get keys that belong to this app
				.filter((function (key) {
					return key.indexOf(this.keyPrefix) === 0;
				}).bind(this)).map((function (key) {
					return this.getItemFromKey(key);
				}).bind(this));
			},
			save: function save(data) {
				store.setItem(this.getKey(data.id), JSON.stringify(data));
			},
			remove: function remove(data) {
				store.removeItem(this.getKey(data.id));
			}
		}
	});
});