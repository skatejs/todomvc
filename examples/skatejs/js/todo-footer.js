// import skate from 'skatejs';
// import util from './util';

(function (exports, skate, util) {
	'use strict';

	function getCountNumber (footer) {
		return footer.querySelector('.todo-count strong');
	}

	function getCountWords (footer) {
		return footer.querySelector('.todo-count span');
	}

	function getFilterAnchor (footer, type) {
		return footer.querySelector('[data-type="' + type + '"]');
	}

	function getFilterAnchors (footer) {
		return [].slice.call(footer.querySelectorAll('.filters a'));
	}

	exports.TodoFooter = skate('todo-footer', {
		events: {
			'click a': function (e) {
				var filter = e.currentTarget.getAttribute('data-type');
				skate.emit(this, 'filter', { detail: filter });
			},
			'click button': function () {
				skate.emit(this, 'clear');
			}
		},
		properties: {
			count: skate.properties.number({
				set: function (elem, data) {
					getCountNumber(elem).textContent = data.newValue;
					getCountWords(elem).textContent = data.newValue === 1 ? '' : 's';
				}
			}),
			filter: skate.properties.string({
				set: function (elem, data) {
					var anchor = getFilterAnchor(elem, data.newValue);

					getFilterAnchors(elem).forEach(function (anchor) {
						anchor.className = '';
					});

					if (anchor) {
						anchor.className = 'selected';
					}
				}
			})
		},
		render: skate.render.html(function () {
			return `
				<footer class="footer">
					<span class="todo-count">
						<strong></strong>
						item<span></span> left
					</span>
					<ul class="filters">
						<li><a href="#/" data-type="all">All</a></li>
						<li><a href="#/active" data-type="active">Active</a></li>
						<li><a href="#/completed" data-type="completed">Completed</a></li>
					</ul>
					<button class="clear-completed">Clear completed</button>
				</footer>
			`;
		})
	});
}(window, window.skate, window.util));
