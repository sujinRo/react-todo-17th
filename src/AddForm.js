import React, { useEffect, useState, useRef } from 'react';
import './style.css';

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
    <form className="formInput">
      <input
        id="inputText"
        type="text"
        ref={input}
        value={value}
        placeholder="Enter your to do!"
        onChange={onChangeInput}
      />
      <button id="addBtn" type="submit" onClick={addTodo(value)}>
        +
      </button>
    </form>
  );
}

export default AddForm;
