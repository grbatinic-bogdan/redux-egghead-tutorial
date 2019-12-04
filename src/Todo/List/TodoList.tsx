import React from 'react';
import { Todo } from 'src/Todo/types';
import { TodoListItem } from 'src/Todo/List/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  onTodoClick: (id: number) => void;
}

export const TodoList: React.FunctionComponent<TodoListProps> = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <TodoListItem key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);
