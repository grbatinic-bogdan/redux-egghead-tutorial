import React from 'react';
import { TodoForm } from 'src/Todo/Form';
import { VisibleTodoList } from 'src/Todo/List';
import { Footer } from 'src/Todo/Footer/Footer';

export const TodoApp: React.FunctionComponent = () => {
  return (
    <div>
      <TodoForm />
      <VisibleTodoList />
      <Footer />
    </div>
  );
};
