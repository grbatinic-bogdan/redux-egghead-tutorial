import { TodosState, Todo, Filters } from 'src/Todo/types';
import { connect } from 'react-redux';
import { TodoList } from 'src/Todo/List/TodoList';
import { toggleTodo } from 'src/Todo/store';

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

const mapDispatchToProps = {
  onTodoClick: (id: number) => toggleTodo(id),
};

export const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
