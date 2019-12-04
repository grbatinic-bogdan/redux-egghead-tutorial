import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { Todo } from 'src/Todo/types';

const toggleTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    completed: !todo.completed,
  };
};

const testToggleTodo = () => {
  const todoBefore: Todo = {
    id: 1,
    text: 'Learn Redux',
    completed: false,
  };
  const todoAfter: Todo = {
    id: 1,
    text: 'Learn Redux',
    completed: true,
  };

  deepFreeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests have passed!');
