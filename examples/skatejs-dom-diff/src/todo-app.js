import render from 'skatejs-dom-diff/src/render';
import skate from 'skatejs';
import TodoPerson from './todo-person';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

function filter (filter) {
	return function (item) {
		return filter === '' ||
			(item.completed && filter === 'completed') ||
			(!item.completed && filter === 'active');
	};
}

function getStore (app) {
	return document.getElementById(app.storeId);
}

export default skate('todo-app', {
	events: {
		create: function (e) {
			getStore(this).save(e.detail.data);
			this.items = getStore(this).getAll();
		},
		edit: function (e) {
			getStore(this).save(e.detail.data);
			this.items = getStore(this).getAll();
		},
		destroy: function (e) {
			getStore(this).remove(e.target.data);
			this.items = getStore(this).getAll();
		},
		'click .clear-completed': function () {
			this.items.forEach(function (item) {
				if (item.completed) {
					getStore(this).remove(item);
				}
			}.bind(this));
			this.items = [];
		},
		'click .filters a' (e) {
			this.filter = e.currentTarget.href.split('#/')[1];
		},
		'change .toggle-all': function (e) {
			this.selectAll = e.currentTarget.checked;
		},
		'keyup .new-todo' (e) {
			if (e.keyCode !== KEYCODE_ENTER) {
				return;
			}

			const input = e.currentTarget;
			const store = getStore(this);
			const value = (input.value || '').trim();

			if (!value) {
				return;
			}

			store.save({
				id: new Date().getTime(),
				content: value
			});

			this.items = store.getAll();
			input.value = '';
		}
	},
	properties: {
		editing: skate.properties.number({
			set (elem, data) {
				skate.render(elem);
				if (data.newValue) {
					const edit = document.getElementById(`todo-item-${data.newValue}`).querySelector('.edit');
					edit.focus();
					edit.select();
				} else if (data.oldValue) {
					document.getElementById(`todo-item-${data.oldValue}`).querySelector('.edit').blur();
				}
			}
		}),
		filter: skate.properties.string({
			default: function () {
				var filter = window.location.hash.split('#/');
				return filter.length === 2 ? filter[1] : '';
			},
			set: skate.render
		}),
		items: {
			default () { return []; },
			set: skate.render
		},
		storeId: skate.properties.string({
			attribute: true,
			set: skate.render
		})
	},
	prototype: {
		get active () {
			return this.items.filter(item => !item.completed);
		},
		get completed () {
			return this.items.filter(item => item.completed);
		}
	},
	created (elem) {
		elem.items = getStore(elem).getAll();
	},
  // The React variable is actually a skatejs-dom-diff object that has a JSX-
  // compatible createElement() function on it. It's not React, that's just
  // what Babel compiles down to by default.
	render: render(function (elem, React) {
		const store = getStore(elem);
		return (
			<div>
				<section class="todoapp">
					<header class="header">
						<h1>todos</h1>
						<input autofocus class="new-todo" placeholder="What needs to be done?" />
					</header>
					<section class="main">
						{elem.items.length ? (
							<input class="toggle-all" type="checkbox" checked={elem.completed.length === elem.items.length} onchange={function (e) {
								elem.items.forEach(function (item) {
									store.save({
										completed: e.target.checked,
										content: item.content,
										id: item.id
									});
								});
								elem.items = store.getAll();
							}} />
						) : ''}
						<label for="toggle-all">Mark all as complete</label>
						<ul class="todo-list">
							{elem.items
								.filter(filter(elem.filter))
								.map(function (item) {
									return (
										<li id={`todo-item-${item.id}`} class={elem.editing === item.id ? 'editing' : ''} ondblclick={() => elem.editing = item.id}>
											<div class="view">
												<input class="toggle" type="checkbox" checked={item.completed} onchange={function (e) {
													store.save({
														completed: e.target.checked,
														content: item.content,
														id: item.id
													});
													elem.items = store.getAll();
												}} />
												<label>{item.content}</label>
												<button class="destroy" onclick={function () {
													store.remove(item);
													elem.items = store.getAll();
												}} />
											</div>
											<input class="edit" value={item.content} onblur={() => elem.editing = false} onkeyup={function (e) {
												if (e.keyCode === KEYCODE_ENTER) {
													elem.editing = false;
													elem.items = store.getAll();
												} else if (e.keyCode === KEYCODE_ESCAPE) {
													e.target.value = item.content;
													elem.editing = false;
												}
											}} onchange={function (e) {
												store.save({
													completed: item.completed,
													content: e.target.value,
													id: item.id
												});
												elem.items = store.getAll();
											}} />
										</li>
									);
								})}
						</ul>
					</section>
					{elem.items.length ? (
						<footer class="footer">
							<span class="todo-count">
								<strong>{elem.active.length.toString()}</strong>
								&nbsp;
								<span>item{elem.active.length === 1 ? '' : 's'} left</span>
							</span>
							<ul class="filters">
								<li><a href="#/" class={elem.filter === '' ? 'selected' : ''}>All</a></li>
								<li><a href="#/active" class={elem.filter === 'active' ? 'selected' : ''}>Active</a></li>
								<li><a href="#/completed" class={elem.filter === 'completed' ? 'selected' : ''}>Completed</a></li>
							</ul>
							<button class="clear-completed">Clear completed</button>
						</footer>
					) : ''}
				</section>
				<footer class="info">
					<p>Double-click to edit a todo</p>
					<p>Created by <TodoPerson nick="chrisdarroch">Chris Darroch</TodoPerson> and <TodoPerson nick="treshugart">Trey Shugart</TodoPerson>.</p>
					<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
				</footer>
			</div>
		);
	})
});
