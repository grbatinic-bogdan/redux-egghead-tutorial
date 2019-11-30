import React from 'react';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
export const Counter: React.FunctionComponent<CounterProps> = ({ count, onIncrement, onDecrement }) => (
  <>
    <p>{count}</p>
    <button onClick={onIncrement}>Increment</button>
    <button onClick={onDecrement}>Decrement</button>
  </>
);
