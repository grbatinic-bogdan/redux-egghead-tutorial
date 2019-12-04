import React from 'react';

export type LinkProps = LinkStateProps & LinkDispatchProps;

export interface LinkStateProps {
  active: boolean;
}

export interface LinkDispatchProps {
  onClick: () => void;
}

export const Link: React.FunctionComponent<LinkStateProps & LinkDispatchProps> = ({ active, onClick, children }) => {
  if (active) {
    return <div>{children}</div>;
  }
  return (
    <div>
      <a
        href="#"
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          onClick();
        }}
      >
        {children}
      </a>
    </div>
  );
};
