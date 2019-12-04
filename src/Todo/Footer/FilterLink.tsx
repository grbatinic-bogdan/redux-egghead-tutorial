import React from 'react';
import { TodosState, Filters, SetFilter } from 'src/Todo/types';
import { connect } from 'react-redux';
import { Link, LinkStateProps, LinkDispatchProps } from 'src/Todo/Footer/Link';

interface FilterLinkProps {
  filter: Filters;
  children: React.ReactNode;
}

export const FilterLink = connect<LinkStateProps, LinkDispatchProps, FilterLinkProps, TodosState>(
  (state, ownProps) => ({
    active: state.filter === ownProps.filter,
  }),
  (dispatch, ownProps) => ({
    onClick: () => dispatch<SetFilter>({ type: 'SET_FILTER', payload: ownProps.filter }),
  }),
)(Link);
