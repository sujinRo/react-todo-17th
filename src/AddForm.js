import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const FormInput = styled.form`
  display: flex;
  height: 8vh;
  align-items: center; /*교차축 정렬*/
  justify-content: center; /*주축 정렬*/
`;

const InputText = styled.input`
  border-radius: 0.8vw;
  border: none;
  width: 75%;
  height: 2vw;
  background-color: rgb(255, 225, 170);
  font-size: 1vw;
  outline: none;
  &::placeholder {
    color: rgb(255, 236, 200);
  }
`;

const AddBtn = styled.button`
  border-radius: 100%;
  border: none;
  width: 2vw;
  height: 2vw;
  background-color: rgb(255, 225, 170);
  font-size: 1vw;
  color: rgb(255, 182, 93);
  cursor: pointer;
  margin-left: 0.5vw;
`;

function AddForm({ addTodo }) {
  const [value, setValue] = useState('');
  const input = useRef(null);

  useEffect(() => {
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
