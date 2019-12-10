import { Todo, TodoAppActions, Filters, TodosState, TodoId } from 'src/Todo/types';
import { combineReducers } from 'redux';
import { configureStore, PayloadAction, createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {} as Todo,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => action.payload,
    toggleTodo: (state, action: PayloadAction<number>) =>
      state.id === action.payload ? { ...state, completed: !state.completed } : state,
  },
});

const { reducer: todoReducer } = todoSlice;

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => [...state, todoReducer(undefined, action)],
      prepare: (text: string, id: number) => ({
        payload: {
          text,
          id,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action: PayloadAction<number>) => state.map(todo => todoReducer(todo, action)),
    removeTodo: (state, action: PayloadAction<TodoId>) => state.filter(todo => todo.id !== action.payload.id),
  },
});

export const { actions: todosActions } = todosSlice;

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'SHOW_ALL' as Filters,
  reducers: {
    setFilter: (state, action: PayloadAction<Filters>) => {
      return action.payload;
    },
  },
});

export const { actions: filterActions } = filterSlice;

const rootReducer = combineReducers<TodosState, TodoAppActions>({
  todos: todosSlice.reducer,
  filter: filterSlice.reducer,
});

// export const store = createStore(rootReducer);
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;
