import React from 'react';
import styled from 'styled-components';

const List = styled.li`
  margin-bottom: 0.3vw;
`;

const DeleteBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1vw;
  cursor: pointer;
`;

function TodoText({ id, todo, isChecked, deleteTodo, move, moveList }) {
  const clickMove = () => {
    move(id);
    if (!isChecked) {
      moveList(id);
    }
  };

  return (
    <List>
      <span onClick={clickMove}>{todo}</span>
      <DeleteBtn onClick={deleteTodo(id)}>❎</DeleteBtn>
    </List>
  );
}
export default TodoText;
