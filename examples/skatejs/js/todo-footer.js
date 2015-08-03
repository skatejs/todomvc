// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, util) {
	'use strict';

	exports.TodoFooter = skate('todo-footer', {
		events: {
			'click .filters a': function (e) {
				this.filter = (e.delegateTarget.hash || '').replace('#/', '');
			},
			'click .clear-completed': function () {
				skate.emit(this, 'clear');
			}
		},
		properties: {
			count: {
				init: 0,
				type: Number,
				set: function (value) {
					this.querySelector('.todo-count strong').textContent = value;
				}
			},
			hidden: {
				attr: true,
				init: true,
				type: Boolean,
				set: function (value) {
					util.toggleClass(this, 'hidden', value);
				}
			},
			filter: {
				set: function (value) {
					skate.emit(this, 'filter', {
						detail: value
					});
					Array.prototype.slice
						.call(this.querySelectorAll('.filters a'))
						.map(function (anchor) {
							anchor.className = '';
							return anchor;
						})
						.filter(function (anchor) {
							var type = anchor.hash.split('#/')[1];
							return type === value;
						})
						.forEach(function (anchor) {
							anchor.className = 'selected';
						});
				}
			}
		},
		template: util.template(
			'<footer class="footer">',
				'<span class="todo-count"><strong>0</strong> item left</span>',
				'<ul class="filters">',
					'<li><a class="selected" href="#/">All</a></li>',
					'<li><a href="#/active">Active</a></li>',
					'<li><a href="#/completed">Completed</a></li>',
				'</ul>',
				'<button class="clear-completed">Clear completed</button>',
			'</footer>'
		),
		attached: function () {
			// Super basic routing on initialisation. Skate has no opinions about what
			// type of routing solution to use.
			this.filter = window.location.hash.split('#/')[1];
		}
	});
})(window, window.skate, window.util);
