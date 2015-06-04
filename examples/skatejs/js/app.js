(function (window, skate) {
  'use strict';

  var KEYCODE_ENTER = 13;
  var slice = Array.prototype.slice;

  var TodoApp = skate('todo-app', {
    events: {
      clear: function (elem) {
        elem.list.completed.forEach(function (item) { item.remove(); });
        elem.footer.count = elem.list.length;
      },
      create: function (elem, e) {
        var item = new TodoItem();
        item.text = e.detail;
        elem.list.appendChild(item);
        ++elem.footer.count;
      },
      destroy: function (elem) {
        --elem.footer.count;
      },
      filter: function (elem, e) {
        var type = e.detail;
        var list = elem.list;
        var items = list.items;

        if (type && list[type]) {
          items.forEach(function (item) {
            item.hide();
          });

          list[type].forEach(function (item) {
            item.show();
          });

          return;
        }

        items.forEach(function (item) {
          item.show();
        });
      },
      toggle: function (elem, e) {
        elem.list.items.forEach(function (item) {
          item.completed = e.detail ? true : undefined;
        });
      }
    },
    prototype: {
      get footer () {
        return this.querySelector('todo-footer');
      },
      get list () {
        return this.querySelector('[is="todo-list"]');
      }
    },
    template: function (elem) {
      elem.innerHTML = `
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input is="todo-input">
          </header>

          <!-- This section should be hidden by default and shown when there are todos -->
          <section class="main">
            <todo-toggle></todo-toggle>
            <ul is="todo-list" class="todo-list"></ul>
          </section>

          <!-- This footer should hidden by default and shown when there are todos -->
          <todo-footer></todo-footer>
        </section>
      `;
    }
  });

  var TodoInput = skate('todo-input', {
    extends: 'input',
    events: {
      keyup: function (elem, e) {
        if (e.keyCode === KEYCODE_ENTER) {
          var value = (elem.value || '').trim();

          if (!value) {
            return;
          }

          elem.dispatchEvent(new CustomEvent('create', {
            bubbles: true,
            detail: value
          }));

          elem.value = '';
        }
      }
    },
    created: function (elem) {
      elem.classList.add('new-todo');
      elem.setAttribute('placeholder', 'What needs to be done?');
      elem.setAttribute('autofocus', '');
    }
  });

  var TodoToggle = skate('todo-toggle', {
    events: {
      'change input[type="checkbox"]': function (elem, e) {
        elem.dispatchEvent(new CustomEvent('toggle', {
          bubbles: true,
          detail: !!e.target.checked
        }));
      }
    },
    prototype: {
      set checked (value) {
        
      }
    }
    template: function (elem) {
      elem.innerHTML = `
        <input class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
      `;
    }
  });

  var TodoFooter = skate('todo-footer', {
    attributes: {
      count: function (elem, diff) {
        elem.querySelector('.todo-count strong').textContent = Number(diff.newValue || 0);
      }
    },
    events: {
      'click .filters a': function (elem, e, target) {
        var value = (target.href || '').split('#/')[1];
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
      set selected (value) {
        slice.call(this.querySelectorAll('.filters a'))
          .map(function (anchor) {
            anchor.classList.remove('selected');
            return anchor;
          })
          .filter(function(anchor){
            return anchor.href.indexOf(value) > -1;
          })
          .forEach(function(anchor){
            anchor.classList.add('selected');
          });
      }
    },
    template: function (element) {
      element.innerHTML = `
        <footer class="footer">
          <span class="todo-count"><strong>0</strong> item left</span>

          <ul class="filters">
            <li><a class="selected" href="#/">All</a></li>
            <li><a href="#/active">Active</a></li>
            <li><a href="#/completed">Completed</a></li>
          </ul>

          <button class="clear-completed">Clear completed</button>
        </footer>
      `;
    }
  });

  var TodoList = skate('todo-list', {
    extends: 'ul',
    events: {
      destroy: function (elem, e) {
        elem.removeChild(e.target);
      }
    },
    prototype: {
      get completed () {
        return this.items.filter(function (todo) {
          return todo.completed;
        });
      },
      get active () {
        return this.items.filter(function (todo) {
          return !todo.completed;
        });
      },
      get items () {
        return slice.call(this.children);
      },
      get length () {
        return this.children.length;
      }
    }
  });

  var TodoItem = skate('todo-item', {
    extends: 'li',
    attributes: {
      completed: {
        created: function (elem) {
          elem.classList.add('completed');
          elem.querySelector('input[type="checkbox"]').checked = true;
          elem.dispatchEvent(new CustomEvent('completed', {
            bubbles: true,
            detail: true
          }));
        },
        removed: function (elem) {
          elem.classList.remove('completed');
          elem.querySelector('input[type="checkbox"]').checked = false;
          elem.dispatchEvent(new CustomEvent('completed', {
            bubbles: true,
            detail: false
          }));
        }
      },
      editing: {
        created: function (elem) {
          elem.classList.add('editing');
        },
        removed: function (elem) {
          elem.classList.remove('editing');
        }
      },
      text: function (elem, diff) {
        elem.querySelector('label').textContent = diff.newValue.trim();
      }
    },
    events: {
      'change .toggle': function (elem, e, target) {
        elem.completed = target.checked ? true : undefined;
      },
      'click .destroy': function (elem) {
        elem.dispatchEvent(new CustomEvent('destroy', {
          bubbles: true
        }));
      },
      'dblclick label': function (elem) {
        elem.querySelector('.edit').value = elem.text;
        elem.classList.add('editing');
      },
      'blur .edit': function (elem, e, target) {
        elem.text = target.value;
        elem.classList.remove('editing');
      },
      'keyup .edit': function (elem, e, target) {
        if (e.keyCode === KEYCODE_ENTER) {
          elem.text = target.value;
          elem.classList.remove('editing');
        }
      }
    },
    prototype: {
      hide: function () {
        this.classList.add('hidden');
        return this;
      },
      show: function () {
        this.classList.remove('hidden');
        return this;
      }
    },
    template: function (elem) {
      elem.innerHTML = `
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>Taste JavaScript</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      `;
    }
  });

})(window, window.skate);
