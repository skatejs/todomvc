(function (window, skate, exports) {
	'use strict';
	var TodoFooter = skate('todo-footer', {
		attached: function (elem) {
			// Set default filter state
			var filter = window.location.hash.replace('#/', '');
			elem.selected = filter;

			// invalid hash
			if (!elem.selected) {
				console.log('invalid selected hash');
				window.location.hash = '/';
				filter = '';
				elem.selected = filter;
			}

			elem.dispatchEvent(new CustomEvent('filter', {
				bubbles: true,
				detail: filter
			}));
		},
		attributes: {
			count: function (elem, diff) {
				elem.querySelector('.todo-count strong').textContent = Number(diff.newValue || 0);
			},
			hidden: {
				created: function (elem) {
					elem.classList.add('hidden');
				},
				removed: function (elem) {
					elem.classList.remove('hidden');
				}
			}
		},
		events: {
			'click .filters a': function (elem, e, target) {
				var value = (target.hash || '').replace('#/', '');
				elem.dispatchEvent(new CustomEvent('filter', {
					bubbles: true,
					detail: value
				}));
				elem.selected = value;
			},
			'click .clear-completed': function (elem) {
				elem.dispatchEvent(new CustomEvent('clear', {
					bubbles: true
				}));
			}
		},
		prototype: {
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

	// exports
	exports.TodoFooter = TodoFooter;
})(window, window.skate, window.app);
