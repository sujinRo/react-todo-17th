import React, { useCallback, useEffect, useState, useRef } from 'react';
import AddForm from './AddForm';
import TodoText from './TodoText';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const All = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex; /*수직으로 쌓임*/
  flex-direction: column;
  width: 23vw;
  height: 43vw;
  border-radius: 2vw;
  box-shadow: 0.4vw 0.4vw 0.4vw 0.4vw rgb(193, 193, 193);
  min-width: 100px;
  min-height: 200px;
`;

const Title = styled.h1`
  color: rgb(255, 182, 93);
  font-size: 1.8vw;
  font-weight: bold;
  margin-left: 1vw;
  margin-top: 1.5vw;
  margin-bottom: 0;
`;

const SectionLine = styled.hr`
  width: 100%;
  border: thin solid rgb(230, 230, 230);
`;

const SubTitle = styled.p`
  color: rgb(255, 182, 93);
  font-size: 1.5vw;
  margin-left: 1vw;
  margin-bottom: 0;
  margin-top: 0;
`;

const SectionName = styled.div`
  height: 35vh;
  overflow: auto;
  &::-webkit-scrollbar {
    background: transparent;
    width: 0;
  }
`;

const List = styled.ul`
  font-size: 1vw;
  cursor: pointer;
`;

const SectionCount = styled.p`
  font-size: 1vw;
  color: rgb(255, 182, 93);
  display: flex;
  justify-content: end;
  margin-right: 1vw;
`;

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
    <All>
      <Container>
        <Title>Things to do</Title>
        <AddForm addTodo={addTodo} />
        <SectionLine />
        <SectionName>
          <SubTitle>📒to do</SubTitle>
          <SectionCount>items: {todoId}</SectionCount>
          <List type="none">
            {todoList.map((todoInfo) => {
              return (
                <TodoText
                  key={uuidv4()}
                  id={todoInfo.id}
                  todo={todoInfo.todo}
                  isChecked={todoInfo.isChecked}
                  deleteTodo={deleteTodo}
                  move={moveToDone}
                  moveList={moveDoneList}
                />
              );
            })}
          </List>
        </SectionName>
        <SectionLine />
        <SectionName>
          <SubTitle>📂done</SubTitle>
          <SectionCount>items: {doneId}</SectionCount>
          <List type="none">
            {doneList.map((doneInfo) => {
              return (
                <TodoText
                  key={uuidv4()}
                  id={doneInfo.id}
                  todo={doneInfo.todo}
                  isChecked={doneInfo.isChecked}
                  deleteTodo={deleteDone}
                  move={moveToTodo}
                  moveList={moveTodoList}
                />
              );
            })}
          </List>
        </SectionName>
      </Container>
    </All>
  );
}

export default TodoList;
