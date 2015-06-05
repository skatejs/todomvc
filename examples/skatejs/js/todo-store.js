(function (exports, skate) {
	'use strict';

	var store = window.localStorage;

	exports.TodoStore = skate('todo-store', {
		attributes: {
			keyPrefix: {
				value: 'todo-skatejs'
			}
		},
		prototype: {
			find: function (query) {
				// 1. get all
				// 2. filter by query
				this.getAll()
					.filter(function (item) {
						Object.keys(query)
							.every(function (key) {
								return item[key] && item[key] === query[key];
							});
					});
			},
			getKey: function (id) {
				return this.keyPrefix + '-' + id;
			},
			getItemFromKey: function(key) {
				return JSON.parse(store.getItem(key));
			},
			getItem: function (id) {
				return this.getItemFromKey(this.getKey(id));
			},
			getAll: function () {
				return Object.keys(store)
					// only get keys that belong to this app
					.filter(function (key) {
						return key.indexOf(this.keyPrefix) === 0;
					}.bind(this))
					.map(function (key) {
						return this.getItemFromKey(key);
					}.bind(this));
			},
			save: function (data) {
				store.setItem(this.getKey(data.id), JSON.stringify(data));
			},
			remove: function (data) {
				store.removeItem(this.getKey(data.id));
			},
			removeAll: function () {
				store.clear();
			}
		}
	});
})(window, window.skate);
