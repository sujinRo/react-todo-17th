import React, { useCallback, useEffect, useState, useRef } from 'react';
import AddForm from './AddForm';
import TodoText from './TodoText';
import './style.css';

function TodoList() {
  return (
    <div className="container">
      <h1 className="title">Things to do</h1>
      <AddForm />
      <hr />
      <div className="todo">
        <p className="subTitle">📒to do</p>
        <p className="todoCount">items: {todoId}</p>
        <ul type="none" id="todoList">
          <TodoText />
        </ul>
      </div>
      <hr />
      <div className="done">
        <p className="subTitle">📂done</p>
        <p className="doneCount">items: {doneId}</p>
        <ul type="none" id="doneList">
          <TodoText
            key={doneInfo.id}
            id={doneInfo.id}
            todo={doneInfo.todo}
            isChecked={doneInfo.isChecked}
            deleteTodo={deleteDone}
            move={moveToTodo}
            moveList={moveTodoList}
          />
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
