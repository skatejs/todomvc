(function () {
	'use strict';

	var storage = {
		create: function (type, prefix) {
			if (!type) {
				type = 'localStorage';
			}

			// basic error check
			var store = window[type];
			if (!store || !store.getItem) {
				throw new Error('storage not supported: ' + type);
			}

			var self = Object.create(this);
			self.store = store;
			self.prefix = prefix || '';
			return self;
		},
		find: function (query) {
			// 1. get all
			// 2. filter by query
			this.getAll()
				.filter(function (item) {
					Object.keys(query)
						.every(function (key) {
							return item[key] && item[key] === query[key]
						});
				});
		},
		getKey: function (id) {
			return this.prefix + '-' + id;
		},
		getItem: function (id) {
			this.store.getItem(this.getKey(id));
		},
		getAll: function () {
			return Object.keys(this.store)
				// only get keys that belong to this app
				.filter(function (key) {
					return key.indexOf(this.prefix) === 0;
				}.bind(this))
				.map(function (key) {
					return this.store.getItem(key);
				}.bind(this));
		},
		save: function (data) {
			this.store.setItem(this.getKey(data.id), JSON.stringify(data));
		},
		remove: function (data) {
			this.store.removeItem(this.getKey(data.id));
		},
		removeAll: function () {
			this.store.clear();
		}
	}
})();
