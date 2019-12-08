import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from 'src/Todo/store';

interface AddTodoDispatchProps {
  addTodo: typeof addTodo;
}

const TodoFormImpl: React.FunctionComponent<{} & AddTodoDispatchProps> = ({ addTodo }) => {
  const [id, setId] = useState(0);
  const [inputValue, setInputValue] = useState('');
  return (
    <form
      onSubmit={(event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        const nextId = id + 1;
        addTodo(inputValue, nextId);
        setId(nextId);
        setInputValue('');
      }}
    >
      <input
        name="todoText"
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
        }}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export const TodoForm = connect(null, { addTodo })(TodoFormImpl);
