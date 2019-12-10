import { ReducerPayloadAction } from 'src/store';

// actions names
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_FILTER = 'SET_FILTER';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoId = Pick<Todo, 'id'>;

// actions
export type AddTodo = ReducerPayloadAction<typeof ADD_TODO, Todo>;
export type RemoveTodo = ReducerPayloadAction<typeof REMOVE_TODO, TodoId>;
export type ToggleTodo = ReducerPayloadAction<typeof TOGGLE_TODO, TodoId>;

export type TodoActions = AddTodo | RemoveTodo | ToggleTodo;

export type Filters = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type SetFilter = ReducerPayloadAction<typeof SET_FILTER, Filters>;
export type FilterActions = SetFilter;

export type TodoAppActions = TodoActions | FilterActions;

// state
export type TodoState = Todo[];

export type FilterState = Filters;

export interface TodosState {
  todos: Todo[];
  filter: FilterState;
}
