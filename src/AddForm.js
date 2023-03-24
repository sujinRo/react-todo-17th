import React from 'react';
import './style.css';

function AddForm() {
  return (
    <form className="formInput">
      <input
        id="inputText"
        type="text"
        ref={input}
        value={value}
        placeholder="Enter your to do!"
      />
      <button id="addBtn" type="submit">
        +
      </button>
    </form>
  );
}

export default AddForm;
