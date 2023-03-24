import React from 'react';
import './style.css';

function TodoText() {
  return (
    <li type="none" id="todoList">
      <span onClick={clickMove}>{todo}</span>
      <button className="deleteBtn" onClick={deleteTodo(id)}>
        ❎
      </button>
    </li>
  );
}
export default TodoText;
