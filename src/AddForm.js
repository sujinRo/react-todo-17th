import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const FormInput = styled.form`
  display: flex;
  height: 8vh;
  align-items: center; /*교차축 정렬*/
  justify-content: center; /*주축 정렬*/
  gap: 5px;
`;

const InputText = styled.input`
  border-radius: 20px;
  border: none;
  width: 250px;
  height: 8px;
  background-color: rgb(255, 225, 170);
  font-size: 0.9rem;
  outline: none;
  padding: 10px;
  &::placeholder {
    color: rgb(255, 236, 200);
  }
`;

const AddBtn = styled.button`
  border-radius: 100%;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 225, 170);
  font-size: 1rem;
  color: rgb(255, 182, 93);
  cursor: pointer;
`;

function AddForm({ addTodo }) {
  const [value, setValue] = useState('');
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
    setValue('');
  }, [addTodo]);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormInput>
      <InputText
        type="text"
        ref={input}
        value={value}
        placeholder="Enter your to do!"
        onChange={onChangeInput}
      />
      <AddBtn type="submit" onClick={addTodo(value)}>
        +
      </AddBtn>
    </FormInput>
  );
}

export default AddForm;
