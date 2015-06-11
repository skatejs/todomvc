(function (exports, skate) {
	'use strict';

	function parseHref (elem) {
		return (elem.hash || '').replace('#/', '');
	}

	exports.TodoFooter = skate('todo-footer', {
		events: {
			'click .filters a': function (elem, e, target) {
				elem.filter = parseHref(target);
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
			},
			filter: {
				attr: true,
				notify: true,
				set: function (value) {
					Array.prototype.slice
						.call(this.querySelectorAll('.filters a'))
						.map(function (anchor) {
							anchor.classList.remove('selected');
							return anchor;
						})
						.filter(function (anchor) {
							var type = anchor.hash.split('#/')[1];
							return type === value;
						})
						.forEach(function (anchor) {
							anchor.classList.add('selected');
						});
				}
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
		},
		attached: function (elem) {
			/**
			 * Super basic routing on initialisation.
			 * 	- This is a very simple example that just calls the 'filter' event based on the windows hash
			 * 	- Skate has no opinions about what type of routing solution to use.
			 */
			skate.ready(function () {
				var filter = window.location.hash.split('#/')[1];
				elem.filter = filter;
			});
		}
	});
})(window, window.skate);
