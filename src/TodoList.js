import { useCallback, useEffect, useState, useRef } from 'react';
import AddForm from './AddForm';
import TodoText from './TodoText';
import styled from 'styled-components';

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
    background: transparent;
    width: 0;
  }
`;

const SectionCount = styled.p`
  font-size: 0.8rem;
  color: rgb(255, 182, 93);
  display: flex;
  justify-content: end;
`;

function TodoList() {
  const [todoCount, setTodoCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [todoId, setTodoId] = useState(Date);
  const isMount = useRef(true);

  useEffect(() => {
    if (!isMount.current) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
      localStorage.setItem('todoId', todoId);
      localStorage.setItem('todoCount', todoCount);
      localStorage.setItem('doneCount', doneCount);
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = localStorage.getItem('todoList');
    if (localTodoList) {
      setTodoList(JSON.parse(localTodoList));
    }
    const localTodoId = localStorage.getItem('todoId');
    if (localTodoId) {
      setTodoId(localTodoId);
    }
    const localTodoCount = localStorage.getItem('todoCount');
    if (localTodoCount) {
      setTodoCount(parseInt(localTodoCount));
    }
    const localDoneCount = localStorage.getItem('doneCount');
    if (localDoneCount) {
      setDoneCount(parseInt(localDoneCount));
    }

    isMount.current = false;
  }, []);

  const handleAddBtnClick = useCallback(
    (todo) => () => {
      if (todo.trim() === '') {
        alert('No items!');
      } else if (todo) {
        setTodoList((prevTodoList) => [
          ...prevTodoList,
          { id: todoId, todo: todo, isChecked: false },
        ]);
        setTodoId(Date.now());
        setTodoCount((previous) => previous + 1);
      }
    },
    [todoId]
  );

  const handleDeleteBtnClick = useCallback(
    (id) => () => {
      const index = todoList.findIndex((todoInfo) => todoInfo.id === id);
      const isDone = todoList[index].isChecked;

      const newTodoList = todoList.filter((todoInfo) => todoInfo.id !== id);
      setTodoList(newTodoList);

      if (isDone) {
        setDoneCount((previous) => previous - 1);
      } else {
        setTodoCount((previous) => previous - 1);
      }
    },
    [todoList]
  );

  const handleItemClick = useCallback(
    (id) => () => {
      const index = todoList.findIndex((todoInfo) => todoInfo.id === id);
      const isDone = todoList[index].isChecked;

      const newTodoList = [...todoList];
      newTodoList[index].isChecked = !newTodoList[index].isChecked;
      setTodoList(newTodoList);

      if (isDone) {
        setTodoCount((previous) => previous + 1);
        setDoneCount((previous) => previous - 1);
      } else {
        setTodoCount((previous) => previous - 1);
        setDoneCount((previous) => previous + 1);
      }
    },
    [todoList]
  );

  return (
    <All>
      <Container>
        <Title>Things to do</Title>
        <AddForm addTodo={handleAddBtnClick} />
        <SectionLine />
        <SectionName>
          <SubTitle>📒to do</SubTitle>
          <SectionCount>items: {todoCount}</SectionCount>
          <List>
            {todoList
              .filter((todo) => todo.isChecked == false)
              .map((todoInfo) => {
                return (
                  <TodoText
                    key={todoInfo.id}
                    id={todoInfo.id}
                    todo={todoInfo.todo}
                    isChecked={todoInfo.isChecked}
                    deleteTodo={handleDeleteBtnClick}
                    move={handleItemClick}
                  />
                );
              })}
          </List>
        </SectionName>
        <SectionLine />
        <SectionName>
          <SubTitle>📂done</SubTitle>
          <SectionCount>items: {doneCount}</SectionCount>
          <List>
            {todoList
              .filter((todo) => todo.isChecked == true)
              .map((doneInfo) => {
                return (
                  <TodoText
                    key={doneInfo.id}
                    id={doneInfo.id}
                    todo={doneInfo.todo}
                    isChecked={doneInfo.isChecked}
                    deleteTodo={handleDeleteBtnClick}
                    move={handleItemClick}
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
