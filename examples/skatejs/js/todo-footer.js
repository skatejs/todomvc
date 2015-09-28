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
			count: skate.property.number({
				set: function (elem, data) {
					elem.querySelector('.todo-count strong').textContent = data.newValue;
				}
			}),
			hidden: skate.property.boolean({
				set: function (elem, data) {
					util.toggleClass(elem, 'hidden', data.newValue);
				}
			}),
			filter: skate.property.string({
				set: function (elem, data) {
					skate.emit(elem, 'filter', {
						detail: data.newValue
					});
					Array.prototype.slice
						.call(elem.querySelectorAll('.filters a'))
						.map(function (anchor) {
							anchor.className = '';
							return anchor;
						})
						.filter(function (anchor) {
							var type = anchor.hash.split('#/')[1];
							return type === data.newValue;
						})
						.forEach(function (anchor) {
							anchor.className = 'selected';
						});
				}
			})
		},
		render: util.template(
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
		attached: function (elem) {
			// Super basic routing on initialisation. Skate has no opinions about what
			// type of routing solution to use.
			elem.filter = window.location.hash.split('#/')[1];
		}
	});
})(window, window.skate, window.util);
