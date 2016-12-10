/** @jsx h */

import 'skatejs-web-components';
import { Component, h, link, prop } from 'skatejs';
import css, { classes } from './style';

const { customElements } = window;

function getCompleted (todos) {
  return todos.filter(todo => todo.isCompleted);
}

function getPlural (count) {
  return count === 1 ? '' : 's';
}

function getTodoMode (todo) {
  if (todo.isEditing) {
    return classes.editing;
  }

  if (todo.isCompleted) {
    return classes.completed;
  }

  return '';
}

function parseIndex (target) {
  return parseFloat(target.getAttribute('data-todo-index'));
}

class TodoApp extends Component {
  static props = {
    currentValue: prop.string(),
    editingValue: prop.string(),
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
  handleStartEditing = (e) => {
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
    e.preventDefault();
    this.todos = this.todos.map((todo, currentTodoIndex) => {
      if (currentTodoIndex === todoIndex) {
        todo.description = this.editingValue;
        todo.isEditing = false;
      }
      return todo;
    });
    this.editingValue = '';
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
    editingValue,
    handleChange,
    handleClear,
    handleRemove,
    handleToggle,
    handleStartEditing,
    handleStopEditing,
    handleSubmit,
    todos
  }) {
    const { length: todosLength } = todos;
    const { length: todosCompletedLength } = getCompleted(todos);
    const incompleteTodosLength = todosLength - todosCompletedLength;

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
              {todos.map((todo, todoIndex) => (
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
                  <form
                    data-todo-index={todoIndex}
                    onSubmit={handleStopEditing}
                  >
                    <input
                      class={classes.edit}
                      name="editingValue"
                      onChange={link(this)}
                      value={editingValue || todo.description}
                    />
                  </form>
                </li>
              ))}
            </ul>
          </section>
        ) : ''}

        {todosLength ? (
          <footer class={classes.footer}>
            <span class={classes.todoCount}>
              <strong>{incompleteTodosLength}</strong>
              {` item${getPlural(incompleteTodosLength)} left`}
            </span>

            {/*
              Remove this if you don't implement routing
              TODO should we anyways?
              <ul class={classes.filters}>
                <li>
                  <a class={classes.selected} href='#/'>All</a>
                </li>
                <li>
                  <a href='#/active'>Active</a>
                </li>
                <li>
                  <a href='#/completed'>Completed</a>
                </li>
              </ul>
            */}

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
