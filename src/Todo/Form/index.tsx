import React, { useState } from 'react';
import { AppDispatch } from 'src/Todo';
import { connect } from 'react-redux';
import { AddTodo } from 'src/Todo/types';

interface AddTodoProps {
  dispatch: AppDispatch;
}

const TodoFormImpl: React.FunctionComponent<AddTodoProps> = ({ dispatch }) => {
  const [id, setId] = useState(0);
  const [inputValue, setInputValue] = useState('');
  return (
    <form
      onSubmit={(event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        const nextId = id + 1;
        dispatch<AddTodo>({
          type: 'ADD_TODO',
          payload: {
            id: nextId,
            text: inputValue,
            completed: false,
          },
        });
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

export const TodoForm = connect()(TodoFormImpl);
