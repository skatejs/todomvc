(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'skatejs-dom-diff/src/render', 'skatejs'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('skatejs-dom-diff/src/render'), require('skatejs'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.render, global.skate);
		global.todoItem = mod.exports;
	}
})(this, function (exports, module, _skatejsDomDiffSrcRender, _skatejs) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _render = _interopRequireDefault(_skatejsDomDiffSrcRender);

	var _skate = _interopRequireDefault(_skatejs);

	var KEYCODE_ENTER = 13;
	var KEYCODE_ESCAPE = 27;

	module.exports = (0, _skate['default'])('todo-item', {
		events: {
			'change .toggle': function changeToggle(e) {
				this.completed = e.currentTarget.checked;
				_skate['default'].emit(this, 'edit', { detail: this });
			},
			'click .destroy': function clickDestroy() {
				_skate['default'].emit(this, 'destroy', { detail: this });
			},
			'dblclick label': function dblclickLabel() {
				this.editing = true;
			},
			'blur .edit': function blurEdit(e) {
				this.content = e.currentTarget.value;
				this.editing = false;
				_skate['default'].emit(this, 'edit', { detail: this });
			},
			'keyup .edit': function keyupEdit(e) {
				if (e.keyCode === KEYCODE_ENTER) {
					this.content = e.currentTarget.value;
					this.editing = false;
				} else if (e.keyCode === KEYCODE_ESCAPE) {
					this.editing = false;
				}
			}
		},
		properties: {
			completed: _skate['default'].properties.boolean({
				set: _skate['default'].render
			}),
			content: {
				'default': 'New todo',
				set: _skate['default'].render
			},
			editing: _skate['default'].properties.boolean({
				set: function set(elem, data) {
					_skate['default'].render(elem);
					if (data.newValue) {
						elem.querySelector('.edit').focus();
					}
				}
			})
		},
		prototype: Object.defineProperties({}, {
			data: {
				get: function get() {
					return {
						completed: this.completed,
						content: this.textContent,
						id: this.id
					};
				},
				configurable: true,
				enumerable: true
			}
		}),
		render: (0, _render['default'])(function (elem, React) {
			return React.createElement(
				'div',
				{ 'class': elem.editing ? 'editing' : '' },
				React.createElement(
					'div',
					{ 'class': 'view' },
					React.createElement('input', { 'class': 'toggle', type: 'checkbox', checked: elem.completed }),
					React.createElement(
						'label',
						null,
						elem.content
					),
					React.createElement('button', { 'class': 'destroy' })
				),
				elem.editing ? React.createElement('input', { 'class': 'edit', value: elem.textContent }) : ''
			);
		})
	});
});