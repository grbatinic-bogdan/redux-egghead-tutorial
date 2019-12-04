import React from 'react';
import { FilterLink } from 'src/Todo/Footer/FilterLink';

export const Footer: React.FunctionComponent = () => {
  return (
    <div>
      <p>Show:</p>
      <FilterLink filter="SHOW_ACTIVE">Show active</FilterLink>
      <FilterLink filter="SHOW_ALL">Show all</FilterLink>
      <FilterLink filter="SHOW_COMPLETED">Show completed</FilterLink>
    </div>
  );
};
