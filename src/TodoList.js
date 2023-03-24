import React, { useCallback, useEffect, useState, useRef } from 'react';
import AddForm from './AddForm';
import TodoText from './TodoText';
import './style.css';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todoId, setTodoId] = useState(0);
  const [doneList, setDoneList] = useState([]);
  const [doneId, setDoneId] = useState(0);
  const isMount = useRef(true);

  useEffect(() => {
    if (!isMount.current) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
      localStorage.setItem('todoId', todoId);
      console.log('todo');

      localStorage.setItem('doneList', JSON.stringify(doneList));
      localStorage.setItem('doneId', doneId);
      console.log('done');
    }
  }, [todoList, todoId, doneList, doneId]);

  useEffect(() => {
    const localTodoList = localStorage.getItem('todoList');
    if (localTodoList) {
      setTodoList(JSON.parse(localTodoList));
    }
    const localTodoId = localStorage.getItem('todoId');
    if (localTodoId) {
      setTodoId(parseInt(localTodoId));
    }

    const localDoneList = localStorage.getItem('doneList');
    if (localDoneList) {
      setDoneList(JSON.parse(localDoneList));
    }
    const localDoneId = localStorage.getItem('doneId');
    if (localDoneId) {
      setDoneId(parseInt(localDoneId));
    }

    isMount.current = false;
  }, []);

  const addTodo = useCallback(
    (todo) => () => {
      if (todo.trim() === '') {
        alert('No items!');
      } else if (todo) {
        setTodoList((prevTodoList) => [
          ...prevTodoList,
          { id: todoId, todo: todo, isChecked: false },
        ]);
        setTodoId((prevId) => prevId + 1);
      }
    },
    [todoId]
  );

  return (
    <div className="container">
      <h1 className="title">Things to do</h1>
      <AddForm addTodo={addTodo} />
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
          <TodoText />
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
