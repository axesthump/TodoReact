import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    let classN = 'list-group-item'
    if (itemProps.hide) {
      classN += ' hide'
    }

    return (
      <li key={id} className={classN}>
        <TodoListItem {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)} />
      </li>
    );
  });

  //Показываем надпись, если список пуст
  if (elements.filter(el => {
    return !el.props.children.props.hide
  }).length === 0) {
    return (
      <ul className="list-group todo-list">
        <b className="empty-text">Список пуст !</b>
      </ul>
    );
  } else {
    return (
      <ul className="list-group todo-list">
        {elements}
      </ul>
    );
  }
};

export default TodoList;
