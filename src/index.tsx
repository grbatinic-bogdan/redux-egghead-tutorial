import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'src/store';
import { Counter } from 'src/components/Counter';

// import { createStore } from 'redux';

const app = document.getElementById('app');

if (!app) {
  throw new Error('element not found');
}

type Actions = 'INCREMENT' | 'DECREMENT';

interface ReducerAction<T> {
  type: T;
}

const counterReducer = (state = 0, action: ReducerAction<Actions>): number => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const counterStore = createStore(counterReducer);

const updateDomSubscriber = (): void => {
  render(<Counter count={counterStore.getState()} />, app);
};

counterStore.subscribe(updateDomSubscriber);
updateDomSubscriber();

app.addEventListener('click', () => {
  counterStore.dispatch({ type: 'INCREMENT' });
});
