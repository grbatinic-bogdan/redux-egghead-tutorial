import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';
import { Todo, TodosState, TodoState, Filters, FilterState, TodoAppActions, TodoActions } from 'src/todoReducer/types';

const todoReducer = (state: Todo, action: TodoActions) => {
  switch (action.type) {
    case 'ADD_TODO':
      return action.payload;
    case 'TOGGLE_TODO':
      return state.id === action.payload.id ? { ...state, completed: !state.completed } : state;
    default:
      return state;
  }
};

const todosReducer = (state: Todo[] = [], action: TodoAppActions): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todoReducer((undefined as unknown) as Todo, action)];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    case 'TOGGLE_TODO':
      return state.map(todoData => todoReducer(todoData, action));
    default:
      return state;
  }
};

const filterReducer = (state: Filters = 'SHOW_ALL', action: TodoAppActions): FilterState => {
  switch (action.type) {
    case 'SHOW_ALL':
    case 'SHOW_COMPLETED':
    case 'SHOW_ACTIVE':
      return action.type;
    default:
      return state;
  }
};

// custom root reducer function
// const todoApp = (state: State = ({} as unknown) as State, action: TodoActions | VisibilityActions): State => {
//   return {
//     todos: todosReducer(state.todos, action as TodoActions),
//     filter: filterReducer(state.filter, action as VisibilityActions),
//   };
// };

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

console.log('Initial state');

const rootReducer = combineReducers<TodosState, TodoAppActions>({
  todos: todosReducer,
  filter: filterReducer,
});

const todosStore = createStore(rootReducer);

export type AppDispatch = typeof todosStore.dispatch;

console.log(todosStore.getState());

todosStore.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 1,
    text: 'Learn faster',
    completed: false,
  },
});

console.log('Added a todo');
console.log(todosStore.getState());

console.log('Toggled a todo');
todosStore.dispatch({ type: 'TOGGLE_TODO', payload: { id: 1 } });
console.log(todosStore.getState());

console.log('Removed a todo');
todosStore.dispatch({ type: 'REMOVE_TODO', payload: { id: 1 } });
console.log(todosStore.getState());

console.log('set show all');
todosStore.dispatch({
  type: 'SHOW_COMPLETED',
});
console.log(todosStore.getState());
