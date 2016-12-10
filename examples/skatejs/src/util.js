import { classes } from './style';
import { SHOW_ACTIVE, SHOW_COMPLETED } from './const';

export function filterTodos (todos, filter) {
  return todos.filter(todo => {
    const { isCompleted } = todo;
    if (filter === SHOW_ACTIVE && !isCompleted) {
      return true;
    }
    if (filter === SHOW_COMPLETED && isCompleted) {
      return true;
    }
    if (!filter) {
      return true;
    }
  });
}

export function getCompleted (todos) {
  return todos.filter(todo => todo.isCompleted);
}

export function getPlural (count) {
  return count === 1 ? '' : 's';
}

export function getTodoMode (todo) {
  if (todo.isEditing) {
    return classes.editing;
  }

  if (todo.isCompleted) {
    return classes.completed;
  }

  return '';
}

export function parseIndex (target) {
  return parseFloat(target.getAttribute('data-todo-index'));
}
