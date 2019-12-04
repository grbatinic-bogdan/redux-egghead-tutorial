import React from 'react';
import { TodosState, Todo, ToggleTodo, Filters } from 'src/Todo/types';
import { AppDispatch } from 'src/Todo';
import { connect } from 'react-redux';
import { TodoList } from 'src/Todo/List/TodoList';

const getVisibleTodos = (todos: Todo[], filter: Filters) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
  }
};

const mapStateToProps = (state: TodosState) => {
  return {
    todos: getVisibleTodos(state.todos, state.filter),
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onTodoClick: (id: number) => {
      dispatch<ToggleTodo>({
        type: 'TOGGLE_TODO',
        payload: {
          id,
        },
      });
    },
  };
};

export const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
