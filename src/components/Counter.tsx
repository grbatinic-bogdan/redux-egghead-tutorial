import React from 'react';

interface CounterProps {
  count: number;
}
export const Counter: React.FunctionComponent<CounterProps> = ({ count }) => <>{count}</>;
