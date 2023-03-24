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

  const deleteTodo = useCallback(
    (id) => () => {
      const newTodoList = todoList.filter((todoInfo) => todoInfo.id !== id);
      setTodoList(newTodoList);
      setTodoId((newTodoId) => newTodoId - 1);
    },
    [todoList]
  );

  const deleteDone = useCallback(
    (id) => () => {
      const newDoneList = doneList.filter((doneInfo) => doneInfo.id !== id);
      setDoneList(newDoneList);
      setDoneId((newDoneId) => newDoneId - 1);
    },
    [doneList]
  );

  const moveToDone = useCallback(
    (id) => () => {
      const index = todoList.findIndex((todoInfo) => todoInfo.id === id);
      const newTodoList = [...todoList];
      newTodoList[index].isChecked = newTodoList[index].isChecked
        ? false
        : true;
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const moveToTodo = useCallback(
    (id) => () => {
      const index = doneList.findIndex((doneInfo) => doneInfo.id === id);
      const newDoneList = [...doneList];
      newDoneList[index].isChecked = newDoneList[index].isChecked
        ? false
        : true;
      setDoneList(newDoneList);
    },
    [doneList]
  );

  const moveDoneList = useCallback(
    (id) => {
      const index = todoList.findIndex((todoInfo) => todoInfo.id === id);
      const newDoneList = [...doneList];
      newDoneList.push(todoList[index]);
      setDoneList(newDoneList);
      setDoneId((newDoneId) => newDoneId + 1);

      const newTodoList = todoList.filter((todoInfo) => todoInfo.id !== id);
      setTodoList(newTodoList);
      setTodoId((newTodoId) => newTodoId - 1);
    },
    [doneList, todoList]
  );

  const moveTodoList = useCallback(
    (id) => {
      const index = doneList.findIndex((doneInfo) => doneInfo.id === id);
      const newTodoList = [...todoList];
      newTodoList.push(doneList[index]);
      setTodoList(newTodoList);
      setTodoId((newTodoId) => newTodoId + 1);

      const newDoneList = doneList.filter((doneInfo) => doneInfo.id !== id);
      setDoneList(newDoneList);
      setDoneId((newDoneId) => newDoneId - 1);
    },
    [todoList, doneList]
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
          {todoList.map((todoInfo) => {
            return (
              <TodoText
                key={todoInfo.id}
                id={todoInfo.id}
                todo={todoInfo.todo}
                isChecked={todoInfo.isChecked}
                deleteTodo={deleteTodo}
                move={moveToDone}
                moveList={moveDoneList}
              />
            );
          })}
        </ul>
      </div>
      <hr />
      <div className="done">
        <p className="subTitle">📂done</p>
        <p className="doneCount">items: {doneId}</p>
        <ul type="none" id="doneList">
          {doneList.map((doneInfo) => {
            return (
              <TodoText
                key={doneInfo.id}
                id={doneInfo.id}
                todo={doneInfo.todo}
                isChecked={doneInfo.isChecked}
                deleteTodo={deleteDone}
                move={moveToTodo}
                moveList={moveTodoList}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
