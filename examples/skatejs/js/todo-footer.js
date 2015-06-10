(function (exports, skate) {
	'use strict';

	function parseHref (elem) {
		return (elem.hash || '').replace('#/', '');
	}

	exports.TodoFooter = skate('todo-footer', {
		/**
		 * Super basic routing on initialisation.
		 * 	- This is a very simple example that just calls the 'filter' event based on the windows hash
		 * 	- Skate has no opinions about what type of routing solution to use.
		 */
		attached: function (elem) {
			// Set default filter state
			var filter = window.location.hash.replace('#/', '');
			elem.selected = filter;

			// invalid hash
			if (!elem.selected) {
				window.location.hash = '/';
				filter = '';
				elem.selected = filter;
			}

			elem.dispatchEvent(new CustomEvent('filter', {
				bubbles: true,
				detail: filter
			}));
		},
		events: {
			'click .filters a': function (elem, e, target) {
				elem.selected = parseHref(target);
				elem.dispatchEvent(new CustomEvent('filter', {
					bubbles: true
				}));
			},
			'click .clear-completed': function (elem) {
				elem.dispatchEvent(new CustomEvent('clear', {
					bubbles: true
				}));
			}
		},
		properties: {
			count: {
				attr: true,
				type: Number,
				set: function (value) {
					this.querySelector('.todo-count strong').textContent = value || 0;
				}
			},
			hidden: {
				attr: true,
				type: Boolean,
				set: function (value) {
					this.classList[value ? 'add' : 'remove']('hidden');
				}
			}
		},
		prototype: {
			get filter () {
				return parseHref(this.selected);
			},
			get selected () {
				return this.querySelector('.filters a.selected');
			},
			set selected (value) {
				Array.prototype.slice
					.call(this.querySelectorAll('.filters a'))
					.map(function (anchor) {
						anchor.classList.remove('selected');
						return anchor;
					})
					.filter(function (anchor) {
						var type = anchor.hash.replace('#/', '');
						return type === value;
					})
					.forEach(function (anchor) {
						anchor.classList.add('selected');
					});
			}
		},
		template: function (element) {
			element.innerHTML = '' +
				'<footer class="footer">' +
				'  <span class="todo-count"><strong>0</strong> item left</span>' +
				'  <ul class="filters">' +
				'    <li><a class="selected" href="#/">All</a></li>' +
				'    <li><a href="#/active">Active</a></li>' +
				'    <li><a href="#/completed">Completed</a></li>' +
				'  </ul>' +
				'  <button class="clear-completed">Clear completed</button>' +
				'</footer>';
		}
	});
})(window, window.skate);
