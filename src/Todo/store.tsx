import {
  Todo,
  TodoActions,
  TodoAppActions,
  TodoState,
  Filters,
  FilterState,
  TodosState,
  AddTodo,
  ToggleTodo,
} from 'src/Todo/types';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

export const todoReducer = (state: Todo, action: TodoActions) => {
  switch (action.type) {
    case 'ADD_TODO':
      return action.payload;
    case 'TOGGLE_TODO':
      return state.id === action.payload.id ? { ...state, completed: !state.completed } : state;
    default:
      return state;
  }
};

export const todosReducer = (state: Todo[] = [], action: TodoAppActions): TodoState => {
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

export const filterReducer = (state: Filters = 'SHOW_ALL', action: TodoAppActions): FilterState => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
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

const rootReducer = combineReducers<TodosState, TodoAppActions>({
  todos: todosReducer,
  filter: filterReducer,
});

// export const store = createStore(rootReducer);
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;

export const addTodo = (text: string, id: number): AddTodo => {
  return {
    type: 'ADD_TODO',
    payload: {
      text,
      id,
      completed: false,
    },
  };
};

export const toggleTodo = (id: number): ToggleTodo => {
  return {
    type: 'TOGGLE_TODO',
    payload: {
      id,
    },
  };
};
