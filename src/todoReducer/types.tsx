import { ReducerAction, ReducerPayloadAction } from 'src/store';

// actions names
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

const SHOW_ALL = 'SHOW_ALL';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SHOW_ACTIVE = 'SHOW_ACTIVE';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// actions
export type AddTodo = ReducerPayloadAction<typeof ADD_TODO, Todo>;
export type RemoveTodo = ReducerPayloadAction<typeof REMOVE_TODO, Pick<Todo, 'id'>>;
export type ToggleTodo = ReducerPayloadAction<typeof TOGGLE_TODO, Pick<Todo, 'id'>>;

export type TodoActions = AddTodo | RemoveTodo | ToggleTodo;

export type Filters = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type FilterActions =
  | ReducerAction<typeof SHOW_ALL>
  | ReducerAction<typeof SHOW_COMPLETED>
  | ReducerAction<typeof SHOW_ACTIVE>;

export type TodoAppActions = TodoActions | FilterActions;

// state
export type TodoState = Todo[];

export type FilterState = Filters;

export interface TodosState {
  todos: Todo[];
  filter: FilterState;
}
