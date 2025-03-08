import React, { useCallback, useEffect, useState, useRef } from 'react';
import AddForm from './AddForm';
import TodoText from './TodoText';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const All = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  height: 100%;
  margin: 50px 0 0 0;
  padding: 0;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex; /*수직으로 쌓임*/
  flex-direction: column;
  width: 350px;
  height: 550px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px rgb(193, 193, 193);
`;

const Title = styled.h1`
  color: rgb(255, 182, 93);
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0 0 10px;
`;

const SectionLine = styled.hr`
  width: 100%;
  height: 2px;
  background-color: rgb(230, 230, 230);
  border: none;
`;

const SubTitle = styled.p`
  color: rgb(255, 182, 93);
  font-size: 1.3rem;
  margin-bottom: 0;
  margin-top: 0;
  }
`;

const SectionName = styled.div`
  height: 200px;
  margin: 0 7px;
`;

const List = styled.ul`
  padding: 0 13px;
  height: 130px;
  font-size: 0.8rem;
  overflow: auto;
  &::-webkit-scrollbar {
    background: light-gray;
    width: 2px;
    height: 100%;
  }
`;

const SectionCount = styled.p`
  font-size: 0.8rem;
  color: rgb(255, 182, 93);
  display: flex;
  justify-content: end;
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
  }, [todoList, doneList]);

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
          <List>
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
          <List>
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
