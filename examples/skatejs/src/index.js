/** @jsx h */

import 'skatejs-web-components';
import { Component, h, link, prop } from 'skatejs';
import { filterTodos, getCompleted, getPlural, getTodoMode, parseIndex } from './util';
import { KEY_ENTER, SHOW_ACTIVE, SHOW_COMPLETED } from './const';
import css, { classes } from './style';
import FilterButton from './FilterButton';

const { customElements } = window;

class TodoApp extends Component {
  static props = {
    currentValue: prop.string(),
    filter: prop.string(),
    todos: prop.array()
  }
  handleChange = (e) => {
    const { todos } = this;
    const { target, target: { checked }} = e;
    const todoIndex = parseIndex(target);
    this.todos = todos.map((todo, currentTodoIndex) => {
      if (currentTodoIndex === todoIndex) {
        todo.isCompleted = checked;
      }
      return todo;
    });
  }
  handleClear = () => {
    this.todos = this.todos.filter(todo => !todo.isCompleted);
  }
  handleFilter = (e) => {
    this.filter = e.target.href.split('#/')[1];
  }
  handleStartEditing = (e) => {
    const { _input } = this;
    const todoIndex = parseIndex(e.target);
    this.todos = this.todos.map((todo, currentTodoIndex) => {
      if (currentTodoIndex === todoIndex) {
        todo.isEditing = true;
      }
      return todo;
    });
  }
  handleStopEditing = (e) => {
    const { target } = e;
    const todoIndex = parseIndex(target);

    // If a key was pressed that isn't "enter" do the normal thing.
    if (e.keyCode && e.keyCode !== KEY_ENTER) {
      return;
    }

    this.todos = this.todos.map((todo, currentTodoIndex) => {
      if (currentTodoIndex === todoIndex) {
        todo.description = target.value;
        todo.isEditing = false;
      }

      return todo;
    });
  }
  handleRemove = (e) => {
    const todoIndex = parseIndex(e.target);
    e.preventDefault();
    this.todos = this.todos.filter((todo, currentTodoIndex) => currentTodoIndex !== todoIndex);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.todos = this.todos.concat({
      isCompleted: false,
      isEditing: false,
      description: this.currentValue
    });
    this.currentValue = '';
  }
  handleToggle = (e) => {
    const { target: { checked } } = e;
    this.todos = this.todos.map(todo => {
      todo.isCompleted = checked;
      return todo;
    });
  }
  renderCallback ({
    currentValue,
    filter,
    handleChange,
    handleClear,
    handleFilter,
    handleRemove,
    handleToggle,
    handleStartEditing,
    handleStopEditing,
    handleSubmit,
    todos
  }) {
    const todosFiltered = filterTodos(todos, this.filter);
    const { length: todosLength } = todos;
    const { length: todosFilteredLength } = todosFiltered;
    const { length: todosCompletedLength } = filterTodos(todos, SHOW_COMPLETED);
    const todosIncompletedLength = todosLength - todosCompletedLength;

    return [
      <style>{css}</style>,
      <section class={classes.todoapp}>
        <header class={classes.header}>
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input
              autofocus
              class={classes.newTodo}
              name="currentValue"
              onKeyup={link(this)}
              placeholder='What needs to be done?'
              value={currentValue}
            />
          </form>
        </header>

        {todosLength ? (
          <section class={classes.main}>
            <input
              class={classes.toggleAll}
              onChange={handleToggle}
              type='checkbox'
            />
            <label for='toggle-all'>Mark all as complete</label>
            <ul class={classes.todoList}>
              {todosFiltered.map((todo, todoIndex) => (
                <li class={getTodoMode(todo)}>
                  <div class={classes.view}>
                    <input
                      class={classes.toggle}
                      checked={todo.isCompleted}
                      data-todo-index={todoIndex}
                      onChange={handleChange}
                      type='checkbox'
                    />
                    <label
                      data-todo-index={todoIndex}
                      onDblclick={handleStartEditing}
                    >{todo.description}</label>
                    <button
                      class={classes.destroy}
                      data-todo-index={todoIndex}
                      onClick={handleRemove}
                    />
                  </div>
                  <input
                    class={classes.edit}
                    data-todo-index={todoIndex}
                    onBlur={handleStopEditing}
                    onKeyup={handleStopEditing}
                    ref={e => todo.isEditing && e.select()}
                    value={todo.description}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : ''}

        {todosLength ? (
          <footer class={classes.footer}>
            <span class={classes.todoCount}>
              <strong>{todosIncompletedLength}</strong>
              {` item${getPlural(todosIncompletedLength)} left`}
            </span>
            <ul class={classes.filters}>
              <li><FilterButton {...{ filter, handleFilter, shouldFilter: '' }}>All</FilterButton></li>
              <li><FilterButton {...{ filter, handleFilter, shouldFilter: SHOW_ACTIVE }}>Active</FilterButton></li>
              <li><FilterButton {...{ filter, handleFilter, shouldFilter: SHOW_COMPLETED }}>Completed</FilterButton></li>
            </ul>
            {todosCompletedLength ? (
              <button
                class={classes.clearCompleted}
                onClick={handleClear}
              >Clear completed</button>
            ) : ''}
          </footer>
        ) : ''}
      </section>,
      <footer class={classes.info}>
        <p>Double-click to edit a todo</p>
        <p>Created by the <a href='https://github.com/skatejs/skatejs'>SkateJS Team</a></p>
        <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>
      </footer>
    ];
  }
}

customElements.define('todo-app', TodoApp);
