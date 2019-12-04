import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { Todo } from 'src/Todo/types';
import { todosReducer } from 'src/Todo';

const testAddTodo = () => {
  const beforeTodos: Todo[] = [
    {
      id: 1,
      text: 'Learn redux',
      completed: false,
    },
  ];
  const addTodo: Todo = {
    id: 2,
    text: 'Learn typescript',
    completed: false,
  };
  const afterTodos: Todo[] = [...beforeTodos, addTodo];

  deepFreeze(beforeTodos);

  expect(todosReducer(beforeTodos, { type: 'ADD_TODO', payload: addTodo })).toEqual(afterTodos);
};

const testRemoveTodo = () => {
  const beforeTodos: Todo[] = [
    {
      id: 1,
      text: 'Learn redux',
      completed: false,
    },
    {
      id: 2,
      text: 'Learn typescript',
      completed: false,
    },
  ];

  const afterTodos: Todo[] = [
    {
      id: 1,
      text: 'Learn redux',
      completed: false,
    },
  ];

  deepFreeze(beforeTodos);

  expect(
    todosReducer(beforeTodos, {
      type: 'REMOVE_TODO',
      payload: {
        id: 2,
      },
    }),
  ).toEqual(afterTodos);
};

const testToggleTodo = () => {
  const beforeTodos: Todo[] = [
    {
      id: 1,
      text: 'Learn redux',
      completed: false,
    },
    {
      id: 2,
      text: 'Learn typescript',
      completed: false,
    },
  ];

  const afterTodos: Todo[] = [
    {
      id: 1,
      text: 'Learn redux',
      completed: false,
    },
    {
      id: 2,
      text: 'Learn typescript',
      completed: true,
    },
  ];

  deepFreeze(beforeTodos);

  expect(
    todosReducer(beforeTodos, {
      type: 'TOGGLE_TODO',
      payload: {
        id: 2,
      },
    }),
  ).toEqual(afterTodos);
};

testAddTodo();
testRemoveTodo();
testToggleTodo();

console.log('All tests have passed!');
