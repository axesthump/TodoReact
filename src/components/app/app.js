import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css';

export default class App extends Component {
  maxId = 1;
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      return {
        todoData: [...before, ...after]
      }
    })
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      hide: false
    }
  }

  addItem = text => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);
    return [...before, newItem, ...after]
  }



  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  showAllTodos() {
    this.setState(({ todoData }) => {
      const newData = [...todoData]
      newData.forEach(el => {
        el.hide = false
      })
      return {
        todoData: newData
      }
    })
  }

  search(tern, todos) {
    return todos.filter(todo => {
      return todo.label.indexOf(tern) > -1
    })
  }

  onSearch = (text) => {
    this.setState({
      term: text
    })
  }

  onFilter = (e) => {
    if (e.target.textContent === 'All') {
      this.showAllTodos()
    } else if (e.target.textContent === 'Active') {
      this.showAllTodos()
      this.setState(({ todoData }) => {
        const newData = [...todoData]
        newData.forEach(el => {
          if (el.done === true) {
            el.hide = true
          }
        })
        return {
          todoData: newData
        }
      })
    } else {
      this.showAllTodos()
      this.setState(({ todoData }) => {
        const newData = [...todoData]
        newData.forEach(el => {
          if (el.done === false) {
            el.hide = true
          }
        })
        return {
          todoData: newData
        }
      })
    }

  }

  render() {
    const doneCount = this.state.todoData.filter(el => el.done).length;
    const undoneCount = this.state.todoData.length - doneCount;
    const vizabilityTodos = this.search(this.state.term, this.state.todoData)
    return (
      <div className="todo-app">
        <AppHeader toDo={undoneCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={text => this.onSearch(text)} term={this.state.term} />
          <ItemStatusFilter onFilter={filter => this.onFilter(filter)} />
        </div>
        <TodoList todos={vizabilityTodos}
          onDeleted={id => this.deleteItem(id)}
          onToggleImportant={id => this.onToggleImportant(id)}
          onToggleDone={id => this.onToggleDone(id)} />
        <AddItem onAdd={text => this.addItem(text)} />
      </div>
    );
  }
};
