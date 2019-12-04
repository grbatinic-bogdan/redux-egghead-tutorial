import React from 'react';
import './TodoApp.css';

interface TodoProps {
  text: string;
  completed: boolean;
  onClick: () => void;
}

export const TodoListItem: React.FunctionComponent<TodoProps> = ({ completed, text, onClick }) => (
  <li className={completed ? 'completed' : ''} onClick={onClick}>
    {text}
  </li>
);
