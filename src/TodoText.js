import styled from 'styled-components';

const List = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

const Item = styled.span`
  cursor: pointer;
  word-break: break-all;
`;

const DeleteBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

function TodoText({ id, todo, isChecked, deleteTodo, move }) {
  return (
    <List>
      <Item onClick={move(id)}>{todo}</Item>
      <DeleteBtn onClick={deleteTodo(id)}>❎</DeleteBtn>
    </List>
  );
}
export default TodoText;
