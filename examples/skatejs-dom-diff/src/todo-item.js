import render from 'skatejs-dom-diff/src/render';
import skate from 'skatejs';

var KEYCODE_ENTER = 13;
var KEYCODE_ESCAPE = 27;

export default skate('todo-item', {
	events: {
		'change .toggle': function (e) {
			this.completed = e.currentTarget.checked;
			skate.emit(this, 'edit', { detail: this });
		},
		'click .destroy': function () {
			skate.emit(this, 'destroy', { detail: this });
		},
		'dblclick label': function () {
			this.editing = true;
		},
		'blur .edit': function (e) {
			this.content = e.currentTarget.value;
			this.editing = false;
			skate.emit(this, 'edit', { detail: this });
		},
		'keyup .edit': function (e) {
			if (e.keyCode === KEYCODE_ENTER) {
				this.content = e.currentTarget.value;
				this.editing = false;
			} else if (e.keyCode === KEYCODE_ESCAPE) {
				this.editing = false;
			}
		}
	},
	properties: {
		completed: skate.properties.boolean({
			set: skate.render
		}),
		content: {
			default: 'New todo',
			set: skate.render
		},
		editing: skate.properties.boolean({
			set: function (elem, data) {
				skate.render(elem);
				if (data.newValue) {
					elem.querySelector('.edit').focus();
				}
			}
		})
	},
	prototype: {
		get data () {
			return {
				completed: this.completed,
				content: this.textContent,
				id: this.id
			};
		}
	},
	render: render(function (elem, React) {
		return (
			<div class={elem.editing ? 'editing' : ''}>
				<div class="view">
					<input class="toggle" type="checkbox" checked={elem.completed} />
					<label>{elem.content}</label>
					<button class="destroy" />
				</div>
				{elem.editing ? <input class="edit" value={elem.textContent} /> : ''}
			</div>
		);
	})
});
