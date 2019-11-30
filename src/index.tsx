import React from 'react';
import { render } from 'react-dom';
import { createStore, ReducerAction } from 'src/store';
import { Counter } from 'src/components/Counter';

// import { createStore } from 'redux';

const app = document.getElementById('app');

if (!app) {
  throw new Error('element not found');
}

// type Actions = 'INCREMENT' | 'DECREMENT';
type Actions = ReducerAction<'INCREMENT'> | ReducerAction<'DECREMENT'>;

const counterReducer = (state = 0, action: Actions): number => {
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
  render(
    <Counter
      count={counterStore.getState()}
      onIncrement={() => {
        counterStore.dispatch({ type: 'INCREMENT' });
      }}
      onDecrement={() => {
        counterStore.dispatch({ type: 'DECREMENT' });
      }}
    />,
    app,
  );
};

counterStore.subscribe(updateDomSubscriber);
updateDomSubscriber();
