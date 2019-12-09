import { Todo, TodoAppActions, Filters, TodosState, TOGGLE_TODO, ADD_TODO, REMOVE_TODO } from 'src/Todo/types';
import { combineReducers } from 'redux';
import { configureStore, createAction, createReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';

// action creators
export const addTodo = createAction(ADD_TODO, (text: string, id: number) => {
  return {
    payload: {
      text,
      id,
      completed: false,
    },
  };
});

export const toggleTodo = createAction(TOGGLE_TODO, (id: number) => ({
  payload: {
    id,
  },
}));

export const removeTodo = createAction(REMOVE_TODO, (id: number) => ({
  payload: {
    id,
  },
}));

export const todoReducer = createReducer({} as Todo, {
  [addTodo.type]: (_state, action: PayloadAction<Todo>) => action.payload,
  [toggleTodo.type]: (state: Todo, action: PayloadAction<Todo>) =>
    state.id === action.payload.id ? { ...state, completed: !state.completed } : state,
});

export const todosReducer = createReducer([] as Todo[], {
  [addTodo.type]: (state: Todo[], action: PayloadAction<Todo>) => [...state, todoReducer(undefined, action)],
  [toggleTodo.type]: (state, action) => state.map(todo => todoReducer(todo, action)),
  [removeTodo.type]: (state, action) => state.filter(todo => todo.id !== action.payload.id),
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: 'SHOW_ALL' as Filters,
  reducers: {
    setFilter: (state, action: PayloadAction<Filters>) => {
      return action.payload;
    },
  },
});

const rootReducer = combineReducers<TodosState, TodoAppActions>({
  todos: todosReducer,
  filter: filterSlice.reducer,
});

// export const store = createStore(rootReducer);
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;
