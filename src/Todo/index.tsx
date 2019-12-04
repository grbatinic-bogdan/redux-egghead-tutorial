import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { TodoApp } from 'src/Todo/TodoApp';
import { store } from 'src/Todo/store';

// get state and dispatch an action

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app'),
);
